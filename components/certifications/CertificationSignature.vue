<template>
  <div class="certification-signature form">
    <label class="form__label certification-signature__label">Signature:</label>
    <input
      @input="$emit('update:certificationSignature', $event.target.value)"
      placeholder="Enter signature name"
      class="certification-signature__input form__input"
    />
  </div>
</template>

<script>
export default {
  emits: ['update:certificationSignature'],
};
</script>

<style lang="scss">
.certification-signature {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__label {
    margin-bottom: 0.5rem;
  }

  &__input {
    width: 100%;

    @include respond(tablet) {
      max-width: 300px;
    }
  }
}
</style>
