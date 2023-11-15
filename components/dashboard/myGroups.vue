<template>
    <DashboardSection title="My Groups" class="my-drafts">
      <groupTable
        v-model="selected"
        :headers="headers"
        :items="items"
      />
    </DashboardSection>
  </template>
  
  <script>
  import { dataArrayFromObject } from "~/assets/util/functions";
  
  export default {
    inject: ["setConfirmModal", "addNotification"],
    data() {
      return {
        headers: [
        //   { text: "Draft Type", value: "type" },
          { text: "Name", value: "name" },

          { text: "enter group", value: "edit", sortable: false }
        ],
        selected: [],
        loading: false
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      items() {
        return this.user.groups.map(group => ({
          ...group,
          name: group.name || "(Unnamed)",
          join: () => this.enterGroup(group)
        }));
      }
    },
    methods: {
        enterGroup(group) {
        this.$cookies.set("groupId", group);
        const redirect = { path: "/group-page" };
        this.$router.push(redirect);
      },
      deleteDraft(draft) {
        this.setConfirmModal(
          "Are you sure you want to delete this draft? This action is irreversible.",
          async () => {
            this.loading = true;
            await this.$axios.$post("/xapi", {
              deleteDraft: draft._id
            });
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
            const requests = selections.map(draft =>
              this.$axios.$post("/xapi", { deleteDraft: draft._id })
            );
            await Promise.all(requests);
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
  