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
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    hasDrafts() {
      return this.user?.drafts?.length > 0;
    }
  }
};
</script>
