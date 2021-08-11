<template>
  <section class="partners">
    <SectionHeading :small="small">In Partnership With</SectionHeading>
    <agile :options="swiperOptions">
      <div v-for="image in images" :key="image" class="partners__slide">
        <img class="partners__img" :src="image" />
      </div>
    </agile>
  </section>
</template>

<script>
import image1 from "../../assets/images/partners/reshet.jpg";
import image2 from "../../assets/images/partners/fers.jpg";
import image3 from "../../assets/images/partners/hanson.jpg";
import image4 from "../../assets/images/partners/h+.jpg";
import image5 from "../../assets/images/partners/tlvseed.jpg";
import image6 from "../../assets/images/partners/eretzir.jpg";

export default {
  props: {
    small: Boolean
  },
  data() {
    return {
      images: [image1, image2, image3, image4, image5, image6],
      swiperOptions: {
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

.about .partners {
  .section-heading {
    margin-bottom: 5rem;
  }
}
</style>
