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
          src: require("~/assets/images/top-challenges/sdgs-2.jpeg"),
          alt: "International SDG"
        },
        {
          src: require("~/assets/images/top-challenges/climate-action-2.jpeg"),
          alt: "Climate Action"
        },
        {
          src: require("~/assets/images/top-challenges/songs-values.jpg"),
          alt: "Songs & Values"
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
    grid-template-columns: repeat(3, 1fr);
    gap: 4.5rem;
    align-items: center;
    max-width: 85rem;
    margin: auto;

    @include respond(mobile-land) {
      gap: 2.5rem;
    }

    @include respond(mobile) {
      grid-template-columns: 1fr;
      gap: 3rem;
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
      max-width: 30rem;
      margin: auto;
    }

    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
