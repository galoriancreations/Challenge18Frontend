<template>
  <section class="game-section">
    <SectionHeading small>Share On Magic</SectionHeading>
    <div class="game-section__grid">
      <div v-for="image in images" :key="image.link" class="game-section__img" :class="{ 'disabled': image.link === 'SecretGame' }">
        <NuxtLink  :to="{ name: image.link }">
          <div class="image-container">
            <img :src="s3AssetsGenerator(image.src)" class="rotate-3d" />
            <div class="overlay" v-if="image.link === 'SecretGame'"></div>
          </div>
        </NuxtLink>
        <div v-if="image.link === 'SecretGame'" class="coming-soon">Coming Soon</div>
        <h1 class="game-section__title">{{ image.link }}</h1>
      </div>
    </div>
  </section>
</template>

  <script>
  import nuxtConfig from '~/nuxt.config';
  import s3AssetsMixin from '~/mixins/s3AssetsMixin';
  
  export default {
    mixins: [s3AssetsMixin],
    data() {
      return {
        images: [
          {
            src: 'images/photo-magic/BGI-mAGIc.png',
            link: 'BGI-mAGIc',
          },
          {
            src: 'images/photo-magic/Environmagic.png',
            link: 'Environmagic',
          },
          {
            src: 'images/photo-magic/SDG-Magic.png',
            link: 'SDG-Magic',
          },
          {
            src: 'images/photo-magic/Imagic.png',
            link: 'Imagic',
          },
          {
            src: 'images/photo-magic/Kids-Magic.png',
            link: 'KidsMagic',
          },
          {
            src: 'images/photo-magic/You&I-Magic.png',
            link: 'YouAndI-Magic',
          },
          {
            src: 'images/photo-magic/Moral-Magic.png',
            link: 'MoralMagic',
          },
          {
            src: 'images/photo-magic/secret-game.png',
            link: 'SecretGame',
          },
        ],
      };
    },
    components: { nuxtConfig },
  };
  </script>
  
  <style lang="scss">
  .game-section {
    padding: 4rem;
    text-align: center;
  
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
      position: relative;
      transition: transform 0.5s, box-shadow 0.5s;
  
      img {
        width: 100%;
        display: block;
      }
  
      &:hover {
        transform: translateY(-5px) rotateY(-5deg);
        box-shadow: $boxshadow1;
      }
   
    .rotate-3d {
      animation: rotate 3s infinite linear; 
    }

      &.disabled {
        pointer-events: none;
        filter: grayscale(100%);
      }
  
      .coming-soon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
        color: white;
        font-size: 2rem;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }
  }
  </style>
  