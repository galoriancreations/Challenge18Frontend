<template>
  <component :is="tag" :class="classes">
    <img class="image-with-text__img" :src="image.src" :alt="image.alt" />
    <div class="image-with-text__content">
      <h3 v-if="title" class="image-with-text__title">
        {{ title }}
      </h3>
      <p v-for="paragraph in paragraphs" :key="paragraph">
        {{ paragraph }}
      </p>
      <BaseButton v-if="button" :link="button.link" :variant="button.variant">
        {{ button.text }}
      </BaseButton>
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
    image: {
      src: String,
      alt: String
    },
    title: String,
    text: String,
    button: {
      link: String,
      variant: String,
      text: String
    },
    reverse: Boolean
  },
  computed: {
    classes() {
      return {
        "image-with-text": true,
        "image-with-text--reverse": this.reverse
      };
    },
    paragraphs() {
      return this.text.split("\n");
    }
  }
};
</script>

<style lang="scss">
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

  .button {
    width: 20rem;
    margin-top: 2.5rem;
    font-weight: 600;

    @include respond(tablet-land) {
      margin-top: 3.5rem;
    }

    @include respond(mobile) {
      margin-top: 3rem;
    }
  }
}
</style>
