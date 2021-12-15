<template>
  <div class="time-selector">
    <label v-if="defaultLabel" class="task-form__selector-label">Time</label>
    <slot name="label" />
    <span v-if="!isTemplateEditable">{{ value }}</span>
    <vue-timepicker
      v-else
      format="HH:mm:ss"
      :value="value"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  components: { VueTimepicker },
  props: {
    value: null,
    defaultLabel: {
      type: Boolean,
      default: true
    }
  },
  inject: ["isTemplateEditable"]
};
</script>

<style lang="scss">
.time-selector {
  display: flex;
  flex-direction: column;
  align-items: center;

  .vue__time-picker {
    input {
      outline: none;
      border-radius: 0.3125rem;
      font-family: "Montserrat", sans-serif;
      transition: border-color 0.4s;
      text-align: center;
      letter-spacing: 0.5px;

      &:focus {
        border-color: $color-azure;
      }
    }

    * {
      font-family: "Montserrat", sans-serif;
    }

    .dropdown ul li:not([disabled]).active {
      background-color: $color-azure;
    }
  }
}
</style>
