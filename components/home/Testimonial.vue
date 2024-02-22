<template>
  <article class="testimonial">
    <img class="testimonial__icon" :src="this.s3AssetsGenerator('images/icon-quotes.svg')" />
    <div
      class="testimonial__scroll-area"
      ref="textWrapper"
      :style="{ height: textWrapperHeight }"
    >
      <p class="testimonial__text" ref="text">{{ testimonial.text }}</p>
    </div>
    <img
      class="testimonial__avatar"
      :src="testimonial.imgSrc"
      :alt="testimonial.name"
    />
    <h3 class="testimonial__name">{{ testimonial.name }}</h3>
    <p v-if="testimonial.role" class="testimonial__role">
      {{ testimonial.role }}
    </p>
  </article>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
import s3AssetsMixin from "~/mixins/s3AssetsMixin";

export default {
    mixins: [ s3AssetsMixin ],
  props: {
    testimonial: Object
  },
  inject: ["sliderCompleted"],
  data() {
    return {
      textWrapperHeight: null
    };
  },
  computed: {
    isSliderReady() {
      return this.sliderCompleted();
    }
  },
  watch: {
    isSliderReady() {
      const { textWrapper, text } = this.$refs;
      if (text.offsetHeight > 108) {
        this.textWrapperHeight = "108px";
        Scrollbar.init(textWrapper);
      }
    }
  }
};
</script>

<style lang="scss">
.testimonial {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.6;

  &__scroll-area {
    margin: 0 -1.25rem;
    padding: 0 1.25rem;
    margin-top: -2rem !important;
    position: relative;
    z-index: 10;
    overflow: auto;

    @include respond(mobile) {
      margin: 0 -1rem;
      padding: 0 1rem;
    }
  }

  &__text {
    font-weight: 500;
    font-size: 1.7rem;

    @include respond(mobile) {
      font-size: 1.5rem;
    }
  }

  &__avatar {
    width: 8rem;
    border-radius: 50%;
    border: 0.2rem solid $color-azure;
    margin-top: 2.5rem;

    @include respond(mobile) {
      width: 6.5rem;
    }
  }

  &__name {
    font-size: 1.9rem;
    color: $color-blue-2;
    margin-top: 1.5rem;

    @include respond(mobile) {
      font-size: 1.75rem;
    }
  }

  &__role {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 500;
    max-width: 35rem;

    @include respond(mobile) {
      font-size: 1.4rem;
    }
  }
}
</style>
