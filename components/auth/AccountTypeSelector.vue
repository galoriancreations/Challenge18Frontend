<template>
  <div class="form__field">
    <label class="form__label">Account type</label>
    <div class="account-types">
      <div
        v-for="option in options"
        :key="option.value"
        class="account-types__option"
      >
        <input
          type="radio"
          :id="option.value"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('change', option.value)"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    modelValue: String
  },
  data() {
    return {
      options: [
        { value: "organization", label: "Organization" },
        { value: "individual", label: "Individual" }
      ]
    };
  }
};
</script>

<style lang="scss">
.account-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @include respond(mobile-land) {
    gap: 2.5rem;
  }

  @include respond(mobile) {
    gap: 1.5rem;
  }

  &__option {
    input {
      display: none;
    }

    label {
      display: block;
      width: 100%;
      padding: 1.5rem;
      text-align: center;
      font-size: 1.7rem;
      font-weight: 500;
      border-radius: 0.8rem;
      border: 0.2rem solid #ccc;
      cursor: pointer;
      transition: all 0.5s;

      @include respond(mobile) {
        padding: 1.2rem;
        font-size: 1.5rem;
      }
    }

    &:hover label {
      @media (hover: hover) {
        background-color: rgba($color-azure-light, 0.8);
      }
    }

    input:checked + label {
      background-color: rgba($color-azure-light, 0.8);
      border-color: $color-azure;
    }
  }
}
</style>
