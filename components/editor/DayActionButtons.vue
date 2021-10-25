<template>
  <div class="editor__day-actions">
    <div class="editor__day-actions-wrapper">
      <button class="editor__day-action-button" @click="deleteDay">
        <i class="fas fa-trash-alt" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["deleteDay"]
};
</script>

<style lang="scss">
.editor {
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
  }

  &__day-action-button {
    margin: 0 1rem;
    font-size: 1.7rem;
    width: 6rem;
    height: 6rem;
    border: 1.5px solid $color-blue-2;
    border-radius: 50%;
    display: block;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;

    @include respond(mobile) {
      font-size: 1.45rem;
      width: 5rem;
      height: 5rem;
    }

    &:hover {
      background-color: #cce4fc;
      border-color: #cce4fc;
      box-shadow: $boxshadow2;
    }
  }
}
</style>
