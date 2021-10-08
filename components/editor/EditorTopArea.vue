<template>
  <section class="challenge-editor__top">
    <ChallengeNameField v-model.trim="data.name" />
    <ChallengeLanguageField v-model="data.language" />
    <ChallengeImageField v-model="data.image" />
    <LaunchDateField v-if="!templateOnlyMode" v-model="data.date" />
    <TemplateAvailabilityField v-if="isAdmin" v-model="data.isTemplatePublic" />
    <AllowCopiesField
      v-if="isAdmin && data.isTemplatePublic"
      v-model="data.allowTemplateCopies"
    />
  </section>
</template>

<script>
export default {
  inject: ["data", "templateOnlyMode"],
  computed: {
    isAdmin() {
      return this.$store.getters.user?.accountType === "admin";
    }
  }
};
</script>
