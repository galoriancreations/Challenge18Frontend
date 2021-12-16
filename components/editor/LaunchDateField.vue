<template>
  <EditorTopField label="Challenge launch date">
    <client-only>
      <Datepicker
        :value="value"
        @selected="$emit('input', $event)"
        full-month-name
        format="dd MMMM yyyy"
        :disabled-dates="disabledDates"
        class="editor__datepicker"
      />
    </client-only>
  </EditorTopField>
</template>

<script>
export default {
  components: {
    Datepicker: () => (process.client ? import("vuejs-datepicker") : null)
  },
  props: {
    value: Date
  },
  computed: {
    disabledDates() {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return { to: date };
    }
  }
};
</script>

<style lang="scss">
.editor {
  &__datepicker {
    input {
      font-size: 1.9rem;
      font-weight: 600;
      padding: 0.75rem;
      border: 1px solid rgba(60, 60, 60, 0.26) !important;
      border-radius: 4px;
      display: block;
      width: 25rem;
      margin: auto;
      cursor: pointer;

      @include respond(mobile) {
        font-size: 1.7rem;
      }
    }

    .vdp-datepicker__calendar {
      top: calc(100% + 0.5rem);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
