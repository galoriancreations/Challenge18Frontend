<template>
  <DashboardSection title="My Drafts" class="my-drafts">
    <div v-if="!hasDrafts" class="my-challenges__empty">
      <p>
        Unpublished drafts of your challenges will appear here.
      </p>
    </div>
    <div v-else class="my-challenges__table-container">
      <v-card :elevation="1">
        <v-data-table :headers="headers" :items="items">
          <template v-slot:[`item.edit`]="{ item }">
            <DashboardButton type="edit" @click="item.edit" />
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <DashboardButton type="delete" @click="item.delete" />
          </template>
        </v-data-table>
      </v-card>
    </div>
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject } from "../../assets/util/functions";

export default {
  inject: ["setConfirmModal"],
  data() {
    return {
      headers: [
        { text: "ID", value: "id", sortable: false },
        { text: "Name", value: "name" },
        { text: "Language", value: "language" },
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ],
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    drafts() {
      return dataArrayFromObject(this.user.drafts);
    },
    hasDrafts() {
      return this.user?.drafts && this.drafts.length > 0;
    },
    items() {
      return this.drafts.map(draft => ({
        id: draft.id,
        name: draft.name,
        language: draft.language,
        edit: () => this.editDraft(draft),
        delete: () => this.deleteDraft(draft.id)
      }));
    }
  },
  methods: {
    editDraft(draft) {
      this.$cookies.set("draftId", draft.id);
      if (draft.challengeId) {
        this.$cookies.set("challengeId");
      } else {
        this.$cookies.remove("challengeId");
      }
      this.$cookies.remove("selectedTemplate");
      const redirect = { path: "/challenge-editor" };
      if (draft.templateOnly) {
        redirect.query = { templateOnly: true };
      }
      this.$router.push(redirect);
    },
    deleteDraft(draftId) {
      this.setConfirmModal(
        "Are you sure you want to delete this draft? This action is irreversible.",
        async () => {
          this.loading = true;
          await this.$axios.$post("/xapi", {
            deleteDraft: draftId
          });
          await this.$store.dispatch("updateUser");
          this.loading = false;
        }
      );
    }
  }
};
</script>
