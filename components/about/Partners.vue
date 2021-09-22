<template>
  <section class="partners">
    <SectionHeading :small="small">In Partnership With</SectionHeading>
    <agile :options="sliderOptions" class="partners__slider">
      <div v-for="image in images" :key="image" class="partners__slide">
        <img class="partners__img" :src="image" />
      </div>
    </agile>
  </section>
</template>

<script>
import reshet from "../../assets/images/partners/reshet-big.png";
import fers from "../../assets/images/partners/ifers-big.jpg";
import hanson from "../../assets/images/partners/hanson-big.jpg";
import hplus from "../../assets/images/partners/h+-big.png";
import tlvseed from "../../assets/images/partners/tlvseed-big.jpg";
import eretzir from "../../assets/images/partners/eretzir.jpg";

export default {
  props: {
    small: Boolean
  },
  data() {
    return {
      images: [reshet, fers, hanson, hplus, tlvseed, eretzir],
      sliderOptions: {
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        navButtons: false,
        dots: false,
        responsive: [
          {
            breakpoint: 750,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 5
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.partners {
  &__slider {
    margin: 0 -5rem;

    @include respond(mobile) {
      margin: 0 -2rem;
    }
  }

  &__slide {
    padding: 0 5rem;

    @include respond(mobile) {
      padding: 0 2rem;
    }
  }

  &__img {
    width: 100%;
    display: block;
    margin: auto;

    @include respond(mobile) {
      max-width: 18rem;
    }
  }
}

.about {
  .partners {
    margin: 10.5rem 0;

    @include respond(mobile) {
      margin: 8rem 0;
    }

    .section-heading-wrapper {
      margin-bottom: 5rem;
    }
  }
}
</style>
