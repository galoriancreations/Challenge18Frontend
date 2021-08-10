<template>
  <DashboardModal class="confirm-modal" :active="active" :scrollbar="false">
    <div class="confirm-modal__text">
      <p v-for="paragraph in confirmText" :key="paragraph">
        {{ text }}
      </p>
    </div>
    <div class="confirm-modal__buttons">
      <BaseButton variant="outline" @click="closeModal">
        Cancel
      </BaseButton>
      <BaseButton variant="blue" @click="confirmHandler">
        Yes, I'm sure
      </BaseButton>
    </div>
  </DashboardModal>
</template>

<script>
export default {
  props: {
    active: Boolean,
    text: String
  },
  emits: ["confirm"],
  inject: ["closeModal"],
  computed: {
    confirmText() {
      return this.text.split("\n");
    }
  },
  methods: {
    confirmHandler() {
      this.$emit("confirm");
      this.closeModal();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.confirm-modal {
  .modal__wrapper {
    max-width: 65rem;
  }

  &__text {
    margin-bottom: 2.5rem;

    p {
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    @include respond(mobile) {
      flex-direction: column;
    }

    & > * {
      margin: 0;

      &:not(:last-child) {
        margin-right: 2.5rem;

        @include respond(mobile) {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
