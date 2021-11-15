<template>
  <DashboardSection title="My Drafts" class="my-drafts">
    <div v-if="!hasDrafts" class="my-challenges__empty">
      <p>
        Unpublished drafts of your challenges will appear here.
      </p>
    </div>
    <DashboardTable
      v-else
      v-model="selected"
      :headers="headers"
      :items="items"
    />
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject } from "~/assets/util/functions";

export default {
  inject: ["setConfirmModal", "addNotification"],
  data() {
    return {
      headers: [
        { text: "Draft Type", value: "type" },
        { text: "Name", value: "name" },
        { text: "Language", value: "language" },
        { text: "Edit", value: "edit", sortable: false }
      ],
      selected: [],
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    hasDrafts() {
      return this.user?.drafts && this.drafts.length > 0;
    },
    drafts() {
      return dataArrayFromObject(this.user.drafts)
        .filter(draft => !draft.templateOnly)
        .map(draft => ({
          ...draft,
          type: draft.challengeId ? "Update challenge" : "New challenge"
        }));
    },
    items() {
      return this.drafts.map(draft => ({
        ...draft,
        name: draft.name || "(Unnamed)",
        edit: () => this.editDraft(draft)
      }));
    }
  },
  methods: {
    editDraft(draft) {
      this.$cookies.set("draftId", draft.id);
      if (draft.challengeId) {
        this.$cookies.set("challengeId", draft.challengeId);
      } else {
        this.$cookies.remove("challengeId");
      }
      this.$cookies.remove("selectedTemplate");
      const redirect = { path: "/editor" };
      if (draft.templateOnly) {
        redirect.query = { templateOnly: true };
      }
      this.$router.push(redirect);
    },
    deleteDraft(draft) {
      this.setConfirmModal(
        "Are you sure you want to delete this draft? This action is irreversible.",
        async () => {
          this.loading = true;
          await this.$axios.$post("/xapi", {
            deleteDraft: draft.id
          });
          this.$store.commit(
            "setDrafts",
            this.drafts.filter(item => item.id !== draft.id)
          );
          this.addNotification(
            `Successfully deleted draft: <strong>${draft.name || "(Unnamed)"}
            (${draft.type.toLowerCase()})</strong>.`
          );
          this.loading = false;
          this.selected = this.selected.filter(
            selection => selection.id !== draft.id
          );
        }
      );
    },
    deleteSelected() {
      const selections = [...this.selected];
      if (selections.length === 1) {
        return this.deleteDraft(selections[0]);
      }
      this.setConfirmModal(
        `Are you sure you want to delete these ${selections.length} drafts? This action is irreversible.`,
        async () => {
          this.loading = true;
          const requests = selections.map(draft =>
            this.$axios.$post("/xapi", { deleteDraft: draft.id })
          );
          await Promise.all(requests);
          const updatedDrafts = this.drafts.filter(
            item => !selections.map(selection => selection.id).includes(item.id)
          );
          this.$store.commit("setDrafts", updatedDrafts);
          this.addNotification(
            `Successfully deleted <strong>${selections.length} drafts</strong>.`
          );
          this.loading = false;
          this.selected = [];
        }
      );
    }
  },
  provide() {
    return {
      deleteSelected: this.deleteSelected
    };
  }
};
</script>

<style lang="scss"></style>
