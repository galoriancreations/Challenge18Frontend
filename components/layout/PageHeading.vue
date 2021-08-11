<template>
  <section class="page-heading" :id="name">
    <h1 class="page-heading__heading">
      {{ title }}
    </h1>
    <WavePatternBottom />
  </section>
</template>

<script>
export default {
  inject: ["name", "title"]
};
</script>

<style lang="scss">
.page-heading {
  height: 50rem;
  position: relative;
  background-color: #4c9cd4;
  background-position: center;
  background-size: cover;
  padding: 0 $padding-sides-desktop;

  @media (hover: hover) {
    background-attachment: fixed;
  }

  @include respond(mobile) {
    height: 40rem;
  }

  &#scores {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.85),
        rgba(#4189bd, 0.85)
      ),
      url(../../assets/images/scores-bg.jpg);
  }

  &#what-we-do {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/what-we-do-bg.jpg);
  }

  &#about {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/about-bg.jpg);
  }

  &#blog {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.85),
        rgba(#4189bd, 0.85)
      ),
      url(../../assets/images/blog-2-bg.jpg);
  }

  &#videos {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/videos-bg.jpg);
  }

  &#players {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.85),
        rgba(#4189bd, 0.85)
      ),
      url(../../assets/images/players-bg.jpg);
  }

  &#contact {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/contact-2-bg.jpg);
    background-position-y: bottom;
    background-position-x: 10%;

    @include respond(tablet-sm) {
      background-position-x: 30%;
    }
  }

  &#login {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/login-bg.jpg);
  }

  &#register {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/register-bg.jpg);
  }

  &#membership {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/membership-bg.jpeg);
  }

  &#dashboard {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/membership-bg.jpeg);
  }

  &#challenge-options {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/challenge-options-bg.jpeg);
  }

  &#notfound {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.6),
        rgba(#4189bd, 0.6)
      ),
      url(../../assets/images/404-bg.jpg);
  }

  &__heading {
    font-size: 6rem;
    color: #fff;
    font-weight: 800;
    position: absolute;
    top: 46%;
    left: 50%;
    width: calc(100% - 2 * #{$padding-sides-mobile});
    max-width: 70rem;
    transform: translate(-50%, -50%);
    text-align: center;

    @include respond(mobile) {
      font-size: 4rem;
      top: 50%;
      max-width: 40rem;
    }
  }
}
</style>
