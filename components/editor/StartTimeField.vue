<template>
  <TimeSelector
    :value="value"
    @input="$emit('input', $event)"
    :defaultLabel="false"
    class="editor__day-time-selector"
  >
    <template slot="label">
      <h3 class="editor__top-label">
        Start time
      </h3>
    </template>
  </TimeSelector>
</template>

<script>
export default {
  props: {
    value: null
  }
};
</script>

<style lang="scss">
.editor {
  &__day-time-selector {
    margin-top: -1.5rem;
  }
}
</style>
