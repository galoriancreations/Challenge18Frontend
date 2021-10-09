<template>
  <div class="points-selector">
    <label class="task-form__selector-label">Awarded points</label>
    <client-only>
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
    </client-only>
  </div>
</template>

<script>
export default {
  components: {
    NumberInput: () =>
      process.client ? import("@chenfengyuan/vue-number-input") : null
  },
  inject: ["task", "isTemplateEditable"]
};
</script>
