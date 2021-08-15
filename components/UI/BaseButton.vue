<template>
  <NuxtLink v-if="link" :to="link" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    link: [String, Object],
    variant: String
  },
  computed: {
    classes() {
      return `button button--${this.variant}`;
    }
  }
};
</script>
