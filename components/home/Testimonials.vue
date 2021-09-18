<template>
  <section class="section-white testimonials">
    <SectionHeading>Testimonials</SectionHeading>
    <agile :options="sliderOptions" class="testimonials__slider">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        class="testimonials__slide"
      >
        <Testimonial :testimonial="testimonial" />
      </div>
      <template slot="prevButton"><i class="fas fa-chevron-left"/></template>
      <template slot="nextButton"><i class="fas fa-chevron-right"/></template>
    </agile>
  </section>
</template>

<script>
import testimonials from "../../assets/data/testimonials";
import Testimonial from "./Testimonial";

export default {
  components: { Testimonial },
  data() {
    return {
      testimonials,
      sliderOptions: {
        navButtons: false,
        dots: false,
        responsive: [
          {
            breakpoint: 750,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.sliderOptions.navButtons = true;
    this.sliderOptions.dots = true;
  },
  provide() {
    return {
      sliderCompleted: () =>
        this.sliderOptions.navButtons && this.sliderOptions.dots
    };
  }
};
</script>

<style lang="scss">
.testimonials {
  .section-heading-wrapper {
    @include respond(mobile) {
      margin-bottom: 3.5rem;
    }
  }

  &__slider {
    margin: 0 -5rem;

    @include respond(tablet) {
      margin: 0 -3rem;
    }
  }

  &__slide {
    padding: 0 5rem;

    @include respond(tablet) {
      padding: 0 3rem;
    }
  }

  .agile {
    &__actions {
      margin-left: 5rem;
      margin-right: 5rem;

      @include respond(tablet) {
        margin-left: 3rem;
        margin-right: 3rem;
      }
    }
  }
}
</style>
