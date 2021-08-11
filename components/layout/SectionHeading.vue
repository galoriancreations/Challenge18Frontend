<template>
  <div class="section-heading-wrapper">
    <h2 :class="classes">
      <slot />
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    extraClass: String,
    small: Boolean
  },
  computed: {
    classes() {
      return {
        "section-heading": true,
        "section-heading--small": this.small,
        [this.extraClass]: !!this.extraClass
      };
    }
  }
};
</script>

<style lang="scss">
.section-heading-wrapper {
  text-align: center;
}

.section-heading {
  display: inline-block;
  font-size: 3.85rem;
  letter-spacing: -0.5px;
  font-weight: 600;
  position: relative;
  color: $color-blue-2;
  margin-bottom: 7rem;
  max-width: 50rem;

  @include respond(mobile) {
    font-size: 3rem;
    margin-bottom: 6rem;
  }

  &--small {
    font-size: 3.7rem;

    @include respond(mobile) {
      font-size: 2.8rem;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 0.8rem);
    width: 50%;
    max-width: 18rem;
    border-top: 0.5rem solid $color-blue-3;
  }
}
</style>
