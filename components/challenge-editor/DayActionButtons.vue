<template>
  <div class="challenge-editor__day-actions">
    <div class="challenge-editor__day-actions-wrapper">
      <IconButton type="edit" @click="editDayTitle" />
      <IconButton v-if="options.length > 1" type="delete" @click="deleteDay" />
    </div>
  </div>
</template>

<script>
export default {
  inject: ["options", "editDayTitle", "deleteDay"]
};
</script>

<style lang="scss">
.challenge-editor {
  &__day-actions {
    margin: -1rem 0 6rem;

    @include respond(mobile) {
      margin: -0.5rem 0 4.5rem;
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
