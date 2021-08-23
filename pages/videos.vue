<template>
  <Page title="Videos" name="videos">
    <p class="videos__intro">
      Watch some of our players and participants talk about the Challenge 18
      project, what it means to them and how they benefited from it.
    </p>
    <div class="videos__seperator" />
    <section class="videos__grid">
      <div v-for="videoId in videos" :key="videoId" class="videos__item">
        <youtube :videoId="videoId" />
      </div>
    </section>
  </Page>
</template>

<script>
export default {
  head: {
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Watch some of our players and participants talk about the Challenge 18 project, what it means to them and how they benefited from it."
      }
    ]
  },
  data() {
    return {
      videos: [
        "C3QGd4tKldw",
        "GM4n9yGsUE8",
        "FVVFhAPM9Zw",
        "OQTZAGLp5Ho",
        "pI2m0z_n_ss",
        "iCfHWsw_5u4"
      ]
    };
  }
};
</script>

<style lang="scss">
.videos {
  &__intro {
    max-width: 80rem;
    margin: auto;
    font-size: 2rem;
    text-align: center;
    line-height: 1.7;

    @include respond(mobile) {
      font-size: 1.6rem;
    }
  }

  &__seperator {
    width: 50%;
    max-width: 12rem;
    height: 0.5rem;
    background-color: $color-blue-2;
    margin: 5.5rem auto 8rem;

    @include respond(mobile) {
      margin: 4rem auto 6rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5rem;

    @include respond(tablet) {
      grid-template-columns: 1fr 1fr;
    }

    @include respond(mobile-land) {
      gap: 1.5rem;
    }

    @include respond(mobile) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  &__item {
    iframe {
      width: 100%;
      height: 16vw;
      display: block;
      border-radius: 0.8rem;

      @include respond(tablet) {
        height: 25vw;
      }

      @include respond(mobile) {
        height: 60vw;
      }
    }
  }
}
</style>
