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
import s3AssetsMixin from '~/mixins/s3AssetsMixin';

export default {
    mixins: [ s3AssetsMixin ],
  data() {
    return {
      images: [
        this.s3AssetsGenerator("images/clubs/shazar.jpeg"),
        this.s3AssetsGenerator("images/clubs/adamimolam.jpeg"),
        this.s3AssetsGenerator("images/clubs/aklim.jpeg"),
        this.s3AssetsGenerator("images/clubs/benguryon.jpeg"),
        this.s3AssetsGenerator("images/clubs/emekhefer.jpeg"),
        this.s3AssetsGenerator("images/clubs/ironiyudbeit.jpeg"),
        this.s3AssetsGenerator("images/clubs/premiernepal.jpeg"),
        this.s3AssetsGenerator("images/clubs/raziel.jpeg"),
        this.s3AssetsGenerator("images/clubs/reshetyeruka.jpeg"),
        this.s3AssetsGenerator("images/clubs/shevachmofet.jpeg"),
        this.s3AssetsGenerator("images/clubs/ycl.jpeg")
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
