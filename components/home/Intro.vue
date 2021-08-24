<template>
  <section class="intro">
    <div class="intro__content">
      <img
        class="intro__img"
        src="../../assets/images/challenge-intro.gif"
        alt="Challenge 18"
      />
      <p class="intro__text">
        <strong>Challenge 18</strong> is the most important sustainability and
        leadership games tournament in the world, in which clubs from all over
        the world collaborate in achieving the SDG’s. At the end of the
        tournament a trophy is awarded to the winning clubs.
      </p>
    </div>
    <div class="intro__links">
      <BaseButton link="/what-we-do" variant="blue">
        What we do
      </BaseButton>
      <BaseButton v-if="!isLoggedIn" link="/membership" variant="gold">
        Join Us
      </BaseButton>
      <BaseButton v-if="isLoggedIn" link="/dashboard" variant="gold">
        Go do dashboard
      </BaseButton>
    </div>
    <WavePatternBottom />
  </section>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.intro {
  background-image: linear-gradient(to right, rgba(#000, 0.1), rgba(#000, 0.1)),
    url(../../assets/images/backgrounds/intro-bg.jpg);
  background-position: center;
  background-size: cover;
  padding: 19rem $padding-sides-desktop;
  color: #fff;
  position: relative;

  @media (hover: hover) {
    background-attachment: fixed;
  }

  @include respond(tablet) {
    padding: 18rem $padding-sides-desktop 17rem;
  }

  @include respond(mobile) {
    padding: 14rem $padding-sides-mobile 12rem;
  }

  &__heading {
    font-weight: 800;
    font-size: 4.5rem;
    text-align: center;
    margin: auto;
    margin-bottom: 5rem;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 95rem;
    margin: 0 auto 6rem;

    @include respond(tablet) {
      flex-direction: column;
      text-align: center;
    }

    @include respond(mobile) {
      margin-bottom: 5rem;
    }
  }

  &__img {
    width: 100%;
    max-width: 35rem;
    margin-right: 10rem;

    @include respond(tablet) {
      margin-right: 0;
      margin-bottom: 5rem;
    }
  }

  &__text {
    width: 37.5vw;
    max-width: 54rem;
    min-width: 50rem;
    font-size: 2.1rem;
    line-height: 1.6;

    @include respond(tablet) {
      width: 100%;
      min-width: 0;
    }

    @include respond(mobile) {
      font-size: 1.7rem;
    }
  }

  &__links {
    display: flex;
    justify-content: center;

    @include respond(mobile) {
      flex-direction: column;
      align-items: center;
    }

    .button {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      width: 25rem;
      padding: 1.2rem 0 1rem;
      box-shadow: $boxshadow2;

      @include respond(mobile) {
        font-size: 1.3rem;
        padding: 1rem;
      }

      &:hover {
        box-shadow: $boxshadow1;
      }

      &:not(:last-child) {
        margin-right: 2.5rem;

        @include respond(mobile) {
          margin-right: 0;
          margin-bottom: 1.5rem;
        }
      }
    }
  }
}
</style>
