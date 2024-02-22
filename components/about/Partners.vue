<template>
  <section class="partners">
    <SectionHeading>Brought to you by:</SectionHeading>
    <agile :options="sliderOptions" class="partners__slider">
      <div v-for="image in images" :key="image.src" class="partners__slide">
        <div class="partners__img">
          <img :src="imageGenerator(image.src)" />
        </div>
      </div>
    </agile>
  </section>
</template>

<script>
import s3AssetsMixin from '~/mixins/s3AssetsMixin';

export default {
    mixins: [ s3AssetsMixin ],
  data() {
    return {
      images: [
        {
          src: "images/logos/sponsers/HC/Dark-vertical.png",
          alt: "HyperCircle"
        },
        {
          src: "images/logos/sponsers/SingularityNET/black-vertical.jpg",
          alt: "HyperCircle"
        },
        {
          src: "images/logos/sponsers/TrueAGI/Black-on-White.png",
          alt: "TrueAGI"
        },
      ],
      
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
              slidesToShow: 3
            }
          }
        ]
      }
    };
  },

  computed: {
    imageGenerator() {
        return (image) => {
            return this.s3AssetsGenerator(image);
        }
    }
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
