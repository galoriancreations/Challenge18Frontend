<template>
<section class="game-section">
    <SectionHeading small>Magic Boom</SectionHeading>
    <div class="game-section__grid">
      <div class="game-section__img" v-for="image in images" :key="image">
        <NuxtLink :to="{
          name: image.link}">
          <img :src="image.src">
          <!-- @click="location.href=image.link" -->
        </NuxtLink>
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
                    link: 'BGI-mAGIc' 
                },
                {
                    src: require("~/assets/images/photo-magic/Environment.png"),
                    link: 'Environment' 
                },
                {
                    src: require("~/assets/images/photo-magic/Global-Goals.png"),
                    link: 'Global-Goals' 
                },
                {
                    src: require("~/assets/images/photo-magic/Imagination.png"),
                    link: 'Imagination' 
                },
                {
                    src: require("~/assets/images/photo-magic/Rainbow.png"),
                    link: 'Rainbow' 
                },
                {
                    src: require("~/assets/images/photo-magic/relationships.png"),
                    link: 'relationships' 
                },
                {
                    src: require("~/assets/images/photo-magic/Values.png"),
                    link: 'Values' 
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