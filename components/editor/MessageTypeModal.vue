<template>
  <PopupModal class="message-type-modal" :active="active" :scrollbar="false">
    <h3 class="message-type-modal__title">
      Select message type:
    </h3>
    <div class="message-type-modal__options">
      <button class="message-type-modal__option" @click="addMessage(false)">
        Text message
      </button>
      <button class="message-type-modal__option" @click="addMessage(true)">
        Audio recording
      </button>
    </div>
  </PopupModal>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  inject: ["addMessage"]
};
</script>

<style lang="scss">
.message-type-modal {
  direction: ltr;

  .modal__wrapper {
    max-width: fit-content;

    @include respond(mobile) {
      max-width: 100%;
    }
  }

  &__title {
    font-size: 2rem;
    color: $color-blue-2;
    font-weight: 700;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 1.8rem;
      margin-bottom: 2.5rem;
    }
  }

  &__options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    @include respond(mobile) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  &__option {
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    padding: 1.5rem 3rem;
    display: block;
    font-weight: 600;
    font-size: 1.7rem;
    transition: all 0.5s;

    @include respond(mobile) {
      font-size: 1.55rem;
    }

    &:hover {
      background-color: rgba($color-azure-light, 0.8);
    }
  }
}
</style>
