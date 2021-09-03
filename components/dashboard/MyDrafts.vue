<template>
  <DashboardSection title="My Drafts" class="my-drafts">
    <div v-if="!hasDrafts" class="my-challenges__empty">
      <p>
        Unpublished drafts of your challenges will appear here.
      </p>
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
    drafts() {
      return dataArrayFromObject(this.user.drafts);
    },
    hasDrafts() {
      return this.user?.drafts && this.drafts?.length > 0;
    }
  }
};
</script>
