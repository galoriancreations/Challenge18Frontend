<template>
  <div class="certification-signature form">
    <h3 class="certification-signature__text">Signature:</h3>
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

  &__text {
    margin-top: 2rem;
    font-size: 2rem;
  }

  &__input {
    width: 100%;

    @include respond(tablet) {
      max-width: 300px;
    }
  }
}
</style>
