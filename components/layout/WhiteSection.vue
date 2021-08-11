<template>
  <component :is="tag" class="section-white">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "section"
    }
  }
};
</script>

<style lang="scss">
.section-white {
  padding: 10rem $padding-sides-desktop;

  @include respond(mobile) {
    padding: 7rem $padding-sides-mobile;
  }
}
</style>
