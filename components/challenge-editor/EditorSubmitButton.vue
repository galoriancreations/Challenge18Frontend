<template>
  <div class="challenge-editor__submit-wrapper">
    <BaseButton variant="blue" @click="submitHandler">
      {{ text }}
    </BaseButton>
  </div>
</template>

<script>
export default {
  inject: ["templateOnlyMode", "editedChallengeId", "submitHandler"],
  computed: {
    text() {
      return this.templateOnlyMode
        ? "Finish editing"
        : this.editedChallengeId
        ? "Update challenge"
        : "Publish challenge";
    }
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__submit-wrapper {
    margin-top: 9rem;

    @include respond(mobile) {
      margin-top: 6rem;
    }

    .button {
      font-weight: 600;
      width: 100%;
      max-width: 35rem;
    }
  }
}
</style>
