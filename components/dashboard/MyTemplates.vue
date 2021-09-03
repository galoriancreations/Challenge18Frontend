<template>
  <DashboardSection title="My Templates" class="my-templates">
    <div v-if="!hasTemplates" class="my-challenges__empty">
      <p>Private templates you created will appear here.</p>
      <p>Click the button below to create a new template.</p>
    </div>
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
      return dataArrayFromObject(this.user.templates);
    },
    hasTemplates() {
      return this.user.templates && this.templates.length > 0;
    }
  }
};
</script>
