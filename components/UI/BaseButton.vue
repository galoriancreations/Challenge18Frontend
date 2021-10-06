<template>
  <NuxtLink v-if="link" :to="link" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    link: [String, Object],
    variant: String
  },
  computed: {
    classes() {
      return ["button", `button--${this.variant}`];
    }
  }
};
</script>

<style lang="scss">
.button {
  display: block;
  width: 25rem;
  text-transform: uppercase;
  font: inherit;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: 1.3px;
  border-radius: 100px;
  border: none;
  transition: all 0.5s;
  text-align: center;
  cursor: pointer;
  padding: 1rem 3rem;
  margin: auto;

  @include respond(mobile) {
    font-size: 1.4rem;
  }

  &--gold {
    background-color: $color-gold-4;
    color: #000;
  }

  &--blue {
    background-color: $color-blue-3;
    color: #fff;
  }

  &--darkblue {
    background-color: $color-blue-2;
    color: #fff;
  }

  &--azure {
    background-color: $color-azure;
    color: #fff;
  }

  &--white {
    background-color: #fff;
    color: $color-blue-2;
  }

  &:hover {
    background-color: #fff;
    color: $color-azure;
    box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
  }

  &--white:hover {
    background-color: #cce4fc;
    color: $color-blue-2;
  }

  &--outline {
    background-color: transparent;
    color: $color-blue-3;
    border: 1.5px solid $color-blue-3;

    &:hover {
      background-color: #cce4fc;
      color: $color-blue-2;
      border-color: #cce4fc;
    }
  }

  &:disabled,
  &:disabled:hover {
    background-color: transparent;
    border-color: #ccc;
    color: #ccc;
    box-shadow: none;
    cursor: not-allowed;
  }

  &.view-all-button {
    margin-top: 5rem;
    font-size: 1.5rem;
    font-weight: 600;
    width: 22rem;

    @include respond(mobile) {
      margin-top: 4rem;
      font-size: 1.3rem;
    }
  }
}
</style>
