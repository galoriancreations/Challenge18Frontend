<template>
  <Notification class="editor-mode-note" v-on="$listeners">
    <p v-if="templateOnlyMode">
      You're on a <strong>template only</strong> mode: you're not creating a
      challenge, but only building a template for later use.
    </p>
    <p v-else-if="editedChallengeId">
      You're currently editing an
      <strong>existing challenge</strong> (challenge ID:
      <strong>{{ editedChallengeId }}</strong
      >).
    </p>
    <p v-else>You're currently building a <strong>new challenge</strong>.</p>
  </Notification>
</template>

<script>
export default {
  inject: ["templateOnlyMode", "editedChallengeId"]
};
</script>

<style lang="scss">
.editor-mode-note {
  @include respond(mobile) {
    max-width: 65%;
  }
}
</style>
