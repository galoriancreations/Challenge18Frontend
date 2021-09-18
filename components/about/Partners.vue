<template>
  <section class="partners">
    <SectionHeading :small="small">In Partnership With</SectionHeading>
    <agile :options="sliderOptions">
      <div v-for="image in images" :key="image" class="partners__slide">
        <img class="partners__img" :src="image" />
      </div>
    </agile>
  </section>
</template>

<script>
import reshet from "../../assets/images/partners/reshet.jpg";
import fers from "../../assets/images/partners/fers.jpg";
import hanson from "../../assets/images/partners/hanson.jpg";
import hplus from "../../assets/images/partners/h+.jpg";
import tlvseed from "../../assets/images/partners/tlvseed.jpg";
import eretzir from "../../assets/images/partners/eretzir.jpg";

export default {
  props: {
    small: Boolean
  },
  data() {
    return {
      images: [reshet, fers, hanson, hplus, tlvseed, eretzir],
      sliderOptions: {
        autoplay: true,
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
  &__img {
    width: 100%;
    display: block;
  }

  &__slide:nth-child(6) &__img {
    max-width: 10rem;
    margin: 0 5rem;
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
