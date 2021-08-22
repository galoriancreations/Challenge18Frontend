<template>
  <NuxtLink v-if="link" :to="link" :class="classes">
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="classes"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
  >
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
