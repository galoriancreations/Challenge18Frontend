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
      // it converts object to array and adds type key to each draft
      let test = dataArrayFromObject(this.user.drafts)
        .filter(draft => !draft.templateOnly) // oposite of undefined is TRUE
        .map(draft => ({
          ...draft,
          type: draft.challengeId ? "Update challenge" : "New challenge"
        }));
      return test;
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
      this.$cookies.set("draftId", draft._id);
      if (draft.challengeId) {
        this.$cookies.set("challengeId", draft.challengeId);
      } else {
        this.$cookies.remove("challengeId");
      }
      this.$cookies.remove("selectedTemplate");

      const redirect = { path: "/editor" };
      // that condition is wrong? draft havent templateOnly property
      // if (draft.templateOnly) {
      //   redirect.query = { templateOnly: true };
      // }
      // i did this instead of what was upper:
      redirect.query = { templateOnly: true };
      this.$router.push(redirect);
    },
    deleteDraft(draft) {
      this.setConfirmModal(
        "Are you sure you want to delete this draft? This action is irreversible.",
        async () => {
          this.loading = true;
          // delete draft (delets in server and updates DB):
          await this.$axios.$post("/xapi", {
            deleteDraft: draft._id
          });

          // update store:
          this.$store.commit(
            "setDrafts",
            this.drafts.filter(item => item._id !== draft._id)
          );

          this.addNotification(
            `Successfully deleted draft: <strong>${draft.name || "(Unnamed)"}
            (${draft.type.toLowerCase()})</strong>.`
          );
          this.loading = false;
          this.selected = this.selected.filter(
            selection => selection._id !== draft._id
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
          
          // delete drafts (delets in server and updates DB):
          // new version:
          for (let draft of selections) {
            await this.$axios.$post("/xapi", { deleteDraft: draft._id });
          }

          // old version (server didnt handle the reqests good):
          // const requests = selections.map(draft => {
          //   console.log(`draft_id: ${draft._id}`);

          //   this.$axios.$post("/xapi", { deleteDraft: draft._id });
          // });

          // await Promise.all(requests);

          // update store:
          const updatedDrafts = this.drafts.filter(
            item =>
              !selections.map(selection => selection._id).includes(item._id)
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
