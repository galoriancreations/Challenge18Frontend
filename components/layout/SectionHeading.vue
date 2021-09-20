<template>
  <div class="section-heading-wrapper">
    <div class="section-heading-wrapper__seperator" />
    <h2 :class="classes">
      <slot />
    </h2>
    <div class="section-heading-wrapper__seperator" />
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
  margin-bottom: 6.5rem;
  display: flex;
  align-items: center;

  @include respond(mobile) {
    margin-bottom: 4.5rem;
  }

  &__seperator {
    height: 0.2rem;
    flex: 1;
    min-width: 2rem;
    background-color: #ccc;
  }
}

.section-heading {
  display: inline-block;
  font-size: 3.85rem;
  letter-spacing: -0.5px;
  font-weight: 700;
  position: relative;
  color: $color-blue-2;
  max-width: 50rem;
  margin: 0 8rem;

  @include respond(tablet) {
    margin: 0 5rem;
  }

  @include respond(mobile-land) {
    margin: 0 3rem;
  }

  @include respond(mobile) {
    font-size: 3rem;
    margin: 0 2rem;
  }

  &--small {
    font-size: 3.7rem;

    @include respond(mobile) {
      font-size: 2.8rem;
    }
  }
}

.dashboard-modal {
  .section-heading-wrapper {
    margin-bottom: 5rem;

    @include respond(mobile) {
      margin-bottom: 3.5rem;
    }
  }

  .section-heading {
    margin: 0 3rem;

    @include respond(mobile) {
      margin: 0 1.5rem;
    }
  }
}
</style>
