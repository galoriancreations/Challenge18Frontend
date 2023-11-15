<template>
  <BaseButton :variant="color" v-on="$listeners" class="dashboard-button">
    <i v-if="type === 'clone'" class="far fa-clone" />
    <i v-else-if="type === 'edit'" class="far fa-edit" />
    <i v-else-if="type === 'simulate'" class="fas fa-mobile-alt" />
    <i v-else-if="type === 'join'" class="fas fa-sign-in-alt" />
    <label v-if="showLabel">{{ label }}</label>
  </BaseButton>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    type: String,
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    color() {
      return this.type === "clone"
        ? "darkblue"
        : this.type === "join"
        ? "blue"
        : this.type === "edit"
        ? "blue"
        : this.type === "simulate"
        ? "azure"
        : null;
    },
    label() {
      return _.capitalize(this.type);
    }
  }
};
</script>

<style lang="scss">
.button.dashboard-button {
  padding: 0;
  margin: 0;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  i {
    font-size: 1.1rem;
  }
  label {
    position: absolute;
    display: block;
    background-color: #eee;
    box-shadow: $boxshadow2;
    border-radius: 0.5rem;
    font-size: 1.5rem !important;
    color: $color-blue-2;
    font-weight: 600;
    text-transform: initial;
    letter-spacing: initial;
    padding: 0.75rem 1.5rem;
    bottom: calc(100% + 0.75rem);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;
  }
  &:hover label {
    opacity: 1;
    visibility: visible;
  }
}
</style>