<template>
  <div class="challenge-editor__day-actions" v-if="options.length > 1">
    <div class="challenge-editor__day-actions-wrapper">
      <IconButton type="delete" @click="deleteDay" />
    </div>
  </div>
</template>

<script>
export default {
  inject: ["options", "deleteDay"]
};
</script>

<style lang="scss">
.challenge-editor {
  &__day-actions {
    margin-bottom: 6rem;

    @include respond(mobile) {
      margin-bottom: 4.5rem;
    }
  }

  &__day-actions-wrapper {
    display: flex;
    justify-content: center;
    margin: 0 -1rem;

    .icon-button {
      margin: 0 1rem;
      font-size: 2rem;

      @include respond(mobile) {
        font-size: 1.9rem;
      }
    }
  }
}
</style>
