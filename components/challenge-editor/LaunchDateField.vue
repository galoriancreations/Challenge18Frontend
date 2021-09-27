<template>
  <EditorTopField label="Challenge launch date">
    <Datepicker
      :value="value"
      @selected="$emit('input', $event)"
      :disabled-dates="disabledDates"
      class="challenge-editor__datepicker"
      full-month-name
      format="dd MMMM yyyy"
    />
  </EditorTopField>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: { Datepicker },
  props: {
    value: Date
  },
  data() {
    return {
      disabledDates: {
        to: new Date()
      }
    };
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__datepicker {
    text-align: center !important;

    input {
      font-size: 2rem;
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
