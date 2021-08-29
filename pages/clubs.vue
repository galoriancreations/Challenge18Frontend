<template>
  <Page title="Clubs" name="clubs">
    <section class="top-clubs">
      <SectionHeading small>Top Clubs</SectionHeading>
      <div class="top-clubs__grid">
        <div class="top-clubs__img" v-for="image in images" :key="image">
          <img :src="image" />
        </div>
      </div>
    </section>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require("~/assets/images/clubs/shazar.jpeg"),
        require("~/assets/images/clubs/adamimolam.jpeg"),
        require("~/assets/images/clubs/aklim.jpeg"),
        require("~/assets/images/clubs/benguryon.jpeg"),
        require("~/assets/images/clubs/emekhefer.jpeg"),
        require("~/assets/images/clubs/ironiyudbeit.jpeg"),
        require("~/assets/images/clubs/premiernepal.jpeg"),
        require("~/assets/images/clubs/raziel.jpeg"),
        require("~/assets/images/clubs/reshetyeruka.jpeg"),
        require("~/assets/images/clubs/shazar.jpeg"),
        require("~/assets/images/clubs/shevachmofet.jpeg"),
        require("~/assets/images/clubs/ycl.jpeg")
      ]
    };
  }
};
</script>

<style lang="scss">
.top-clubs {
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
      gap: 2.5rem;
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
