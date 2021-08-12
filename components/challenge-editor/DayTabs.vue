<template>
  <div class="challenge-editor__tabs-list">
    <div
      v-for="day in days"
      :key="options[day - 1].id"
      class="challenge-editor__tab"
    >
      <input type="radio" v-model="selection" :value="day" :id="`day${day}`" />
      <label :for="`day${day}`">{{ dayLabel }} {{ day }}</label>
    </div>
  </div>
</template>

<script>
import { numbersArray } from "../../assets/util/functions";
export default {
  props: {
    value: Number
  },
  inject: ["options", "getDayLabel", "getCurrentDay"],
  data() {
    return {
      selection: this.value
    };
  },
  computed: {
    days() {
      return numbersArray(this.options.length);
    },
    dayLabel() {
      return this.getDayLabel();
    },
    currentDay() {
      return this.getCurrentDay();
    }
  },
  watch: {
    selection(value) {
      this.$emit("input", value);
    },
    currentDay(value) {
      this.selection = value;
    }
  }
};
</script>
