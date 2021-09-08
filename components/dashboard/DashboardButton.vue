<template>
  <BaseButton :variant="color" v-on="$listeners" class="dashboard-button">
    <i v-if="type === 'clone'" class="far fa-clone" />
    <i v-else-if="type === 'edit'" class="far fa-edit" />
    <i v-else-if="type === 'delete'" class="far fa-trash-alt" />
  </BaseButton>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    color() {
      return this.type === "clone"
        ? "darkblue"
        : this.type === "edit"
        ? "blue"
        : this.type === "delete"
        ? "azure"
        : null;
    }
  }
};
</script>

<style lang="scss">
.button.dashboard-button {
  padding: 0;
  margin: 0;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 1.1rem;
  }
}
</style>
