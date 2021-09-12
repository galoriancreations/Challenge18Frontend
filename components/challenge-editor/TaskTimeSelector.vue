<template>
  <div class="task-form__time-selector">
    <label class="task-form__selector-label">Time</label>
    <vue-timepicker format="HH:mm:ss" v-model="task.time" />
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  components: { VueTimepicker },
  inject: ["task"]
};
</script>

<style lang="scss">
.task-form__time-selector {
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
