<template>
  <article class="testimonial">
    <img class="testimonial__icon" src="../../assets/images/icon-quotes.svg" />
    <div class="testimonial__scroll-area" ref="text">
      <p class="testimonial__text">{{ testimonial.text }}</p>
    </div>
    <StarRating
      v-if="isSliderReady"
      v-model="testimonial.rating"
      :star-size="20"
      :show-rating="false"
      :read-only="true"
      class="testimonial__rating"
    />
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

export default {
  components: {
    StarRating: () => (process.client ? import("vue-star-rating") : null)
  },
  props: {
    testimonial: Object
  },
  inject: ["sliderCompleted"],
  computed: {
    isSliderReady() {
      return this.sliderCompleted();
    }
  },
  watch: {
    isSliderReady() {
      Scrollbar.init(this.$refs.text);
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
    height: 13rem;
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

  &__rating {
    margin-top: 1rem;
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
