<template>
  <section class="intro">
    <div class="intro__top">
      <h1 class="intro__heading">Challenge Yourself to Change</h1>
      <p class="intro__subheading">
        Connect and inspire the world through play – Challenge 18: a WhatsApp
        based social platform.
      </p>
    </div>
    <div class="intro__content">
      <img
        class="intro__img"
        src="../../assets/images/challenge-intro.gif"
        alt="Challenge 18"
      />
      <p class="intro__text">
        TING.global provides unique and engaging daily tasks to develop global
        awareness through collaboration and friendly competition.
      </p>
    </div>
    <div class="intro__links">
      <BaseButton v-if="!isLoggedIn" link="/join" variant="blue">
        Get Started <i class="fas fa-chevron-right" />
      </BaseButton>
      <BaseButton v-else link="/dashboard" variant="blue">
        Go do dashboard <i class="fas fa-chevron-right" />
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
.intro {
  padding: 18rem $padding-sides-desktop;
  background-image: linear-gradient(
      to right,
      rgba(#4189bd, 0.75),
      rgba(#4189bd, 0.75)
    ),
    url(../../assets/images/backgrounds/join-bg.jpg);
  background-position: center;
  background-size: cover;
  color: #fff;
  position: relative;
  background-attachment: fixed;

  @include respond(tablet) {
    padding: 17rem $padding-sides-desktop 16rem;
  }

  @include respond(mobile) {
    padding: 13rem $padding-sides-mobile 12rem;
    background-attachment: initial;
  }

  &__top {
    text-align: center;
    margin-bottom: 6rem;

    @include respond(mobile) {
      margin-bottom: 3rem;
    }
  }

  &__heading {
    font-weight: 800;
    font-size: 4.5rem;
    margin-bottom: 2rem;

    @include respond(mobile) {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }
  }

  &__subheading {
    font-size: 2.1rem;
    line-height: 1.6;

    @include respond(mobile) {
      font-size: 1.7rem;
      line-height: 1.55;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 90rem;
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
    max-width: 32rem;

    @include respond(tablet) {
      margin-bottom: 5rem;
      max-width: 35rem;
    }
  }

  &__text {
    width: 37.5vw;
    max-width: 54rem;
    min-width: 50rem;
    font-size: 1.95rem;
    line-height: 1.6;

    @include respond(tablet) {
      width: 100%;
      min-width: 0;
    }

    @include respond(mobile) {
      font-size: 1.6rem;
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
      display: flex;
      align-items: center;
      justify-content: center;

      @include respond(mobile) {
        font-size: 1.3rem;
        padding: 1rem;
      }

      &:hover {
        box-shadow: $boxshadow1;
      }

      i {
        font-size: 1.2rem;
        margin-left: 1.5rem;
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
