<template>
  <FloatingNote class="editor-mode-note">
    <p v-if="templateOnlyMode">
      You're on a <strong>template-only</strong> mode: you're not creating a
      challenge, but only building a template for later use.
    </p>
    <p v-else-if="editedChallengeId">
      You're editing an
      <strong>exisitng challenge</strong> that is already published (challenge
      ID: <strong>{{ editedChallengeId }}</strong
      >).
    </p>
    <p v-else>You're currently building a <strong>new challenge</strong>.</p>
  </FloatingNote>
</template>

<script>
export default {
  inject: ["templateOnlyMode", "editedChallengeId"]
};
</script>

<style lang="scss">
.editor-mode-note {
  @include respond(mobile) {
    // display: none;
    max-width: 60%;
  }
}
</style>
