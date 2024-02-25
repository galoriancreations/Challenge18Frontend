<template>
  <section class="page-heading" :id="name" :title="title">
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
  height: 45rem;
  position: relative;
  background-color: #4c9cd4;
  background-position: center;
  background-size: cover;
  padding: 0 $padding-sides-desktop;

  @media (hover: hover) {
    background-attachment: fixed;
  }

  @include respond(mobile) {
    height: 35rem;
  }

  &#clubs {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/clubs-bg.jpg);
  }

  &#what-we-do {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/what-we-do-bg.jpg);
  }

  &#about {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/about-bg.jpg);
  }

  &#how-to-play {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/register-bg.jpg);
  }

  &#articles {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.85),
        rgba(#4189bd, 0.85)
      ),
      url(../../assets/images/backgrounds/blog-2-bg.jpg);
  }

  &#videos {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/videos-bg.jpg);
  }

  &#players {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.85),
        rgba(#4189bd, 0.85)
      ),
      url(../../assets/images/backgrounds/players-bg.jpg);
  }

  &#marketplace {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.75),
        rgba(#4189bd, 0.75)
      ),
      url(../../assets/images/backgrounds/marketplace-bg.jpg);
  }

  &#contact {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/contact-2-bg.jpg);
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
      url(../../assets/images/backgrounds/login-bg.jpg);
  }

  &#register {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/register-bg.jpg);
  }

  &#membership,
  &#protocol {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/intro-2-bg.jpg);
  }

  &#dashboard {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/dashboard-bg.jpeg);
  }

  &#editor {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/challenge-editor-bg.jpeg);
  }

  &#boom18 {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.75),
        rgba(#4189bd, 0.75)
      ),
      url(../../assets/images/backgrounds/18boom-bg.jpeg);
  }

  &#challenges {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/what-we-do-bg.jpg);
  }

  &#chatbot {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.8),
        rgba(#4189bd, 0.8)
      ),
      url(../../assets/images/backgrounds/chatbot-bg.jpg);
  }

  &#error-page {
    background-image: linear-gradient(
        to right,
        rgba(#4189bd, 0.6),
        rgba(#4189bd, 0.6)
      ),
      url(../../assets/images/backgrounds/404-bg.jpg);
  }

  &#magic-page {
    background-image:
      url(../../assets/images/backgrounds/photo.png);
  }
  &#BGI-page {
    background-image:
      url(../../assets/images/photo-magic/BGI-mAGIc.png);
  }
  &#environmagic-page {
    background-image:
      url(../../assets/images/photo-magic/Environmagic.png);
  }
  &#SDG-Magic-page {
    background-image:
      url(../../assets/images/photo-magic/SDG-Magic.png);
  }
  &#imagic-page {
    background-image:
      url(../../assets/images/photo-magic/Imagic.png);
  }
  &#Kids-Magic-page {
    background-image:
      url(../../assets/images/photo-magic/Kids-Magic.png);
  }
  &#YouAndI-Magic-page {
    background-image:
      url(../../assets/images/photo-magic/You&I-Magic.png);
  }
  &#Moral-Magic-page {
    background-image:
      url(../../assets/images/photo-magic/Moral-Magic.png);
  }


  &__heading {
    font-size: 6rem;
    color: #fff;
    font-weight: 800;
    position: absolute;
    top: 46%;
    left: 50%;
    width: calc(100% - 2 * #{$padding-sides-mobile});
    // max-width: 70rem;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 5;

    @include respond(mobile) {
      font-size: 4rem;
      top: 50%;
      max-width: 40rem;
    }
  }
}
</style>
