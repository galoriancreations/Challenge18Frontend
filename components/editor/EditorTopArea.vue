<template>
  <section class="editor__top">
    <ChallengeNameField v-model.trim="data.name" />
    <ChallengeLanguageField v-model="data.language" />
    <ChallengeImageField v-model="data.image" />
    <LaunchDateField v-if="!templateOnlyMode" v-model="data.date" />
    <TemplateAvailabilityField v-if="isAdmin" v-model="data.isTemplatePublic" />
    <AllowCopiesField
      v-if="isAdmin && data.isTemplatePublic"
      v-model="data.allowTemplateCopies"
    />
    <SectionSeperator />
  </section>
</template>

<script>
export default {
  inject: ["data", "templateOnlyMode"],
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  }
};
</script>
