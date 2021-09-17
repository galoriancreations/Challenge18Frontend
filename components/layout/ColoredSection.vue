<template>
  <component :is="tag" :class="classes">
    <WavePatternTop v-if="topWaves" />
    <slot />
    <WavePatternBottom v-if="bottomWaves" />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "section"
    },
    color: {
      type: String,
      default: "azure"
    },
    topWaves: {
      type: Boolean,
      default: true
    },
    bottomWaves: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return ["section-colored", `section-colored--${this.color}`];
    }
  }
};
</script>

<style lang="scss">
.section-colored {
  padding: 15rem $padding-sides-desktop;
  position: relative;

  @include respond(mobile) {
    padding: 10rem $padding-sides-mobile;
  }

  &--azure {
    background-color: $color-azure-light-2;
  }

  &--blue {
    background-color: $color-blue-2;
  }
}
</style>
