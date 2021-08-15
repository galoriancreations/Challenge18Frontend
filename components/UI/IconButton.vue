<template>
  <i :class="classes" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    type: String,
    filled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return {
        "icon-button": true,
        fas: this.filled,
        far: !this.filled,
        "fa-pen": this.type === "edit",
        "fa-trash-alt": this.type === "delete",
        "fa-star": this.type === "mark",
        "fa-times": this.type === "close"
      };
    }
  }
};
</script>

<style lang="scss">
.icon-button {
  cursor: pointer;
  transition: all 0.5s;
  font-size: 1.7rem;

  @include respond(mobile) {
    font-size: 1.55rem;
  }

  &.fa-pen,
  &.fa-star {
    color: $color-blue-3;
  }

  &.fa-trash-alt,
  &.fa-times {
    color: $color-blue-2;
  }

  &:hover {
    @media (hover: hover) {
      color: $color-azure;
    }
  }
}
</style>
