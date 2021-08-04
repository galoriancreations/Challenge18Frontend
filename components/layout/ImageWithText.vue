<template>
  <component :is="tag" :class="classes">
    <img class="image-with-text__img" :src="image" :alt="alt" />
    <div class="image-with-text__content">
      <h3 v-if="title" class="image-with-text__title">
        {{ title }}
      </h3>
      <slot />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    image: String,
    alt: String,
    title: String,
    reverse: Boolean
  },
  computed: {
    classes() {
      return {
        "image-with-text": true,
        "image-with-text--reverse": this.reverse
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.image-with-text {
  display: flex;
  align-items: center;

  &--reverse {
    flex-direction: row-reverse;
  }

  @include respond(tablet-land) {
    flex-direction: column;
    text-align: center;
  }

  &__img {
    width: 42vw;
    margin-right: 6rem;
    border-radius: 1rem;
    box-shadow: $boxshadow2;

    @include respond(tablet-land) {
      margin: 0 0 4.5rem;
      width: 100%;
      max-width: 50rem;
    }

    @include respond(mobile) {
      margin-bottom: 3.5rem;
    }
  }

  &--reverse &__img {
    margin-right: 0;
    margin-left: 7rem;

    @include respond(tablet-land) {
      margin-left: 0;
    }
  }

  &__content {
    p {
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }
  }
}
</style>
