<template>
  <div class="points-selector">
    <label class="task-form__selector-label">Awarded points</label>
    <NumberInput
      v-if="isTemplateEditable"
      v-model="task.points"
      :min="1"
      :max="18"
      :center="true"
      size="large"
      :disabled="!task.isBonus"
      inline
      controls
    />
    <span v-else>{{ task.points }}</span>
  </div>
</template>

<script>
import NumberInput from "@chenfengyuan/vue-number-input";

export default {
  components: { NumberInput },
  inject: ["task", "isTemplateEditable"]
};
</script>
