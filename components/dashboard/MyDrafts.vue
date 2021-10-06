<template>
  <DashboardSection title="My Drafts" class="my-drafts">
    <div v-if="!hasDrafts" class="my-challenges__empty">
      <p>
        Unpublished drafts of your challenges will appear here.
      </p>
    </div>
    <div v-else class="my-challenges__table-container">
      <v-app>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          show-select
          class="elevation-2"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <DashboardButton type="edit" @click="item.edit" />
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <DashboardButton type="delete" @click="item.delete" />
          </template>
        </v-data-table>
      </v-app>
      <DeleteSelectedButton :disabled="!selected.length" />
    </div>
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
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
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
        edit: () => this.editDraft(draft),
        delete: () => this.deleteDraft(draft)
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
          await this.$store.dispatch("updateUser");
          this.addNotification(
            `Successfully deleted draft: <strong>${draft.name || "(Unnamed)"}
            (${draft.type.toLowerCase()})</strong>.`
          );
          this.loading = false;
        }
      );
    },
    deleteSelected() {
      if (!this.selected.length) return;
      const draftsText =
        this.selected.length > 1
          ? `these ${this.selected.length} drafts`
          : "this draft";
      this.setConfirmModal(
        `Are you sure you want to delete ${draftsText}? This action is irreversible.`,
        async () => {
          this.loading = true;
          const requests = this.selected.map(draft =>
            this.$axios.$post("/xapi", { deleteDraft: draft.id })
          );
          await Promise.all(requests);
          await this.$store.dispatch("updateUser");
          this.addNotification(
            `Successfully deleted <strong>${requests.length} drafts</strong>.`
          );
          this.loading = false;
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
