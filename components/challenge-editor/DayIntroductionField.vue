<template>
  <div class="challenge-editor__introduction-field">
    <h3 for="introduction" class="challenge-editor__top-label">
      Introduction message
    </h3>
    <textarea-autosize
      :value="value"
      @input="$emit('input', $event)"
      class="task-form__extra"
      placeholder="Message that would be displayed to the participants on the group chat, explaining about the day's subject"
      :min-height="100"
      :max-height="300"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__introduction-field {
    margin-bottom: 8rem;

    @include respond(mobile) {
      margin-bottom: 6rem;
    }

    h3 {
      text-align: center;
    }

    textarea {
      border-radius: 0.5rem;
      padding: 1rem 1.25rem;
      max-width: 65rem;
      display: block;
      margin: auto;
      line-height: 1.6;
    }
  }
}
</style>
