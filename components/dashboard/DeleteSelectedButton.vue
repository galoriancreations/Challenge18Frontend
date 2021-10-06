<template>
  <BaseButton variant="outline" @click="deleteSelected" :disabled="disabled">
    <i class="far fa-trash-alt"></i> Delete Selected
  </BaseButton>
</template>

<script>
export default {
  props: {
    disabled: Boolean
  },
  inject: ["deleteSelected"]
};
</script>
