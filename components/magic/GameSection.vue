<template>
<section class="game-section">
    <SectionHeading small>Share On Magic</SectionHeading>
    <div class="game-section__grid">
      <div class="game-section__img" v-for="image in images" :key="image.link">
        <NuxtLink :to="{
          name: image.link}">
          <img :src="image.src">
          <!-- @click="location.href=image.link" -->
        </NuxtLink>
        <h1 class="game-section__title">{{image.link}}</h1>
      </div>
    
    </div>
</section>
</template>

<script>
import nuxtConfig from '~/nuxt.config';

export default {
    data() {
        return {
            images: [
                {
                    src: require("~/assets/images/photo-magic/BGI-mAGIc.png"),
                    link: 'BGI-mAGIc' ,
                },
                {
                    src: require("~/assets/images/photo-magic/Environmagic.png"),
                    link: 'Environmagic' 
                },
                {
                    src: require("~/assets/images/photo-magic/SDG-Magic.png"),
                    link: 'SDG-Magic' 
                },
                {
                    src: require("~/assets/images/photo-magic/Imagic.png"),
                    link: 'Imagic' 
                },
                {
                    src: require("~/assets/images/photo-magic/Kids-Magic.png"),
                    link: 'KidsMagic' 
                },
                {
                    src: require("~/assets/images/photo-magic/You&I-Magic.png"),
                    link: 'YouAndI-Magic' 
                },
                {
                    src: require("~/assets/images/photo-magic/Moral-Magic.png"),
                    link: 'MoralMagic' 
                },
            ]
        };
    },
    components: { nuxtConfig }
};
</script>

<style lang="scss">
.game-section {
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 3.5rem;

    @include respond(tablet) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond(tablet) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond(mobile) {
      gap: 2rem;
    }
  }

  &__title {
    color: $color-blue-2;
    font-size: 2rem;
    margin: 1rem 0rem;
    text-align: center;
  }

  &__img {
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    overflow: hidden;

    img {
      width: 100%;
      display: block;
    }
  }
}
</style>