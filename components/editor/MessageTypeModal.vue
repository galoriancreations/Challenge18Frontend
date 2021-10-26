<template>
  <PopupModal class="message-type-modal" :active="active" :scrollbar="false">
    <h3 class="message-type-modal__title">
      Select message type:
    </h3>
    <div class="message-type-modal__options">
      <button
        v-for="option in options"
        :key="option.value"
        class="message-type-modal__option"
        @click="addMessage(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </PopupModal>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  inject: ["addMessage"],
  data() {
    return {
      options: [
        { value: "text", label: "Text" },
        { value: "audio", label: "Audio" },
        { value: "image", label: "Image" }
      ]
    };
  }
};
</script>

<style lang="scss">
.message-type-modal {
  direction: ltr;

  .modal__wrapper {
    max-width: 50rem;

    @include respond(mobile) {
      max-width: 40rem;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

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
