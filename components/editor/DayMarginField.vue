<template>
  <EditorTopField label="Margin between days" class="editor__day-margin">
    <client-only>
      <div class="points-selector">
        <NumberInput
          v-model="data.dayMargin"
          :min="1"
          :max="30"
          :center="true"
          size="large"
          inline
          controls
          :rounded="true"
        />
      </div>
    </client-only>
  </EditorTopField>
</template>

<script>
export default {
  components: {
    NumberInput: () =>
      process.client ? import("@chenfengyuan/vue-number-input") : null
  },
  props: {
    value: Number
  },
  inject: ["isTemplateEditable", "data"]
};
</script>

<style lang="scss">
.editor {
  &__day-margin {
    .points-selector .number-input input {
      font-size: 1.9rem !important;
      font-weight: 500;
    }
  }
}
</style>
