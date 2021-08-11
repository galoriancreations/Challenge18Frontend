<template>
  <BaseButton :variant="color" :class="classes" @click="$emit('click')">
    <slot />
  </BaseButton>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    size: String
  },
  computed: {
    classes() {
      return {
        "action-button": true,
        [`action-button--${this.size}`]: !!this.size
      };
    }
  }
};
</script>

<style lang="scss">
.button.action-button {
  padding: 0;
  width: 7.5rem;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: $boxshadow2;
  font-size: 2rem;
  position: relative;

  @include respond(mobile) {
    width: 6rem;
    height: 6rem;
    font-size: 1.6rem;
  }

  i {
    transform: translateX(0.1rem);
  }
}

.dashboard-section .action-button {
  margin-top: -3.75rem;

  @include respond(mobile) {
    margin-top: -3rem;
  }
}
</style>
