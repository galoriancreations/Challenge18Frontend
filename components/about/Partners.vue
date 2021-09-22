<template>
  <section class="partners">
    <SectionHeading>In Partnership With</SectionHeading>
    <agile :options="sliderOptions" class="partners__slider">
      <div v-for="image in images" :key="image.src" class="partners__slide">
        <div class="partners__img">
          <img v-bind="image" />
        </div>
      </div>
    </agile>
  </section>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          src: require("../../assets/images/partners/reshet-big.png"),
          alt: "HaReshet Hayeruka - הרשת הירוקה"
        },
        {
          src: require("../../assets/images/partners/ifers-big.jpg"),
          alt: "IFERS"
        },
        {
          src: require("../../assets/images/partners/hanson-big.jpg"),
          alt: "Hanson Robotics"
        },
        {
          src: require("../../assets/images/partners/h+-big.png"),
          alt: "H+"
        },
        {
          src: require("../../assets/images/partners/tlvseed-big.jpg"),
          alt: "TLVSeed"
        },
        {
          src: require("../../assets/images/partners/eretzir.jpg"),
          alt: "Eretz Ir - ארץ עיר"
        }
      ],
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
  &__slider {
    margin: -3rem -5rem;

    @include respond(mobile) {
      margin: -3rem -2rem;
    }
  }

  &__slide {
    padding: 3rem 5rem;

    @include respond(mobile) {
      padding: 3rem 2rem;
    }
  }

  &__img {
    width: 90%;
    margin: auto;

    @include respond(mobile-land) {
      max-width: 18rem;
    }

    img {
      width: 100%;
      display: block;
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

    .section-heading {
      font-size: 3.7rem;

      @include respond(mobile) {
        font-size: 2.8rem;
      }
    }
  }
}
</style>
