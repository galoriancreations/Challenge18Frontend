<template>
  <DashboardModal class="edit-day-title" :active="active" :scrollbar="false">
    <h3 class="challenge-editor__top-label">Day title</h3>
    <textarea-autosize
      :value="value"
      @input="$emit('input', $event)"
      class="edit-day-title__input section-heading"
      placeholder="Enter title here"
      :rows="1"
      ref="input"
    />
  </DashboardModal>
</template>

<script>
export default {
  props: {
    value: String,
    active: Boolean
  },
  watch: {
    active(value) {
      if (value) {
        setTimeout(() => this.$refs.input.$el.focus(), 100);
      }
    }
  }
};
</script>

<style lang="scss">
.edit-day-title {
  &__input {
    border: none;
    outline: none;
    font-family: "Spartan", sans-serif;
    display: block;
    width: 100%;
    text-align: center;
    border-bottom: 0.2rem solid #ccc;
    padding: 1rem 0;
    margin-bottom: 0 !important;
    margin-top: 0.5rem;

    @include respond(mobile) {
      margin-top: 0;
    }
  }
}
</style>
