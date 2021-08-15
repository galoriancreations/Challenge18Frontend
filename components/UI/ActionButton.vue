<template>
  <BaseButton :variant="color" :class="buttonClasses" v-on="$listeners">
    <i v-if="type" :class="iconClasses" />
    <slot v-else />
  </BaseButton>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    size: String,
    type: String
  },
  computed: {
    buttonClasses() {
      return {
        "action-button": true,
        [`action-button--${this.size}`]: !!this.size
      };
    },
    iconClasses() {
      return {
        fas: true,
        "fa-edit": this.type === "edit",
        "fa-plus": this.type === "add",
        "fa-info": this.type === "info",
        "fa-random": this.type === "shuffle"
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

.challenge-editor .action-button {
  width: 6.5rem;
  height: 6.5rem;
  font-size: 1.9rem;
  position: relative;
  z-index: 5;

  @include respond(mobile) {
    width: 6rem;
    height: 6rem;
    font-size: 1.6rem;
  }
}
</style>
