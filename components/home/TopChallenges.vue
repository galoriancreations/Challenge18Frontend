<template>
  <section class="top-challenges">
    <SectionHeading small>Top Challenges</SectionHeading>
    <div class="top-challenges__grid">
      <NuxtLink
        v-for="image in images"
        :key="image.src"
        to="/join"
        class="top-challenges__item"
      >
        <img v-bind="image" />
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          src: require("~/assets/images/logos/PNGChallenge18LogoSDGs-01.png"),
          alt: "International SDG"
        },
        {
          src: require("~/assets/images/logos/PNGChallenge18LogoClimateAction-01.png"),
          alt: "Climate Action"
        },
        {
          src: require("~/assets/images/logos/PNGChallenge18LogoSongsAndValues-01.png"),
          alt: "Songs & Values"
        },
        {
          src: require("~/assets/images/logos/PNGChallenge18LogoFriendlyAI-01.png"),
          alt: "Friendly AI"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.top-challenges {
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4.5rem;
    align-items: center;
    max-width: 90rem;
    margin: auto;

    @include respond(mobile-land) {
      gap: 2.5rem;
    }

    @include respond(mobile) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  &__item {
    display: block;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    overflow: hidden;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: all 0.5s;
    }

    &:hover::after {
      background-color: rgba($color-azure, 0.4);
    }

    @include respond(mobile) {
      max-width: 25rem;
      margin: auto;
    }

    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
