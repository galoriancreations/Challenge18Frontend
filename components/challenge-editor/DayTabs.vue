<template>
  <div class="challenge-editor__tabs-list">
    <div
      v-for="day in days"
      :key="options[day - 1].id"
      class="challenge-editor__tab"
    >
      <input
        type="radio"
        :id="`day${day}`"
        :value="day"
        :checked="modelValue === day"
        @change="$emit('change', day)"
      />
      <label :for="`day${day}`">{{ dayLabel }} {{ day }}</label>
    </div>
  </div>
</template>

<script>
import { numbersArray } from "../../assets/util/functions";
export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    modelValue: Number
  },
  inject: ["options", "getDayLabel"],
  computed: {
    days() {
      return numbersArray(this.options.length);
    },
    dayLabel() {
      return this.getDayLabel();
    }
  }
};
</script>
