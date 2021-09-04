<template>
  <DashboardSection title="My Templates" class="my-templates">
    <div v-if="!hasTemplates" class="my-challenges__empty">
      <p>Private templates you created will appear here.</p>
      <p>Click the button below to create a new template.</p>
    </div>
    <template slot="button">
      <ActionButton type="add" color="blue" @click="selectTemplate" />
    </template>
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject } from "../../assets/util/functions";

export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    templates() {
      return dataArrayFromObject(this.user?.templates);
    },
    hasTemplates() {
      return this.user?.templates && this.templates.length > 0;
    }
  },
  methods: {
    selectTemplate(templateId) {
      if (templateId) {
        this.$cookies.set("templateId", templateId);
      } else {
        this.$cookies.remove("templateId");
      }
      this.$cookies.remove("challengeId");
      this.$cookies.remove("draftId");
      this.$router.push({
        path: "/challenge-editor",
        query: { templateOnly: true }
      });
    }
  }
};
</script>
