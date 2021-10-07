<template>
  <BaseButton variant="outline" @click="deleteSelected">
    <i class="far fa-trash-alt"></i> Delete Selected
  </BaseButton>
</template>

<script>
export default {
  inject: ["deleteSelected"]
};
</script>
