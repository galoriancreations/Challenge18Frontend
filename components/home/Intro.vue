<template>
  <section class="intro" :style="{ backgroundImage: 
      `linear-gradient(to right, rgba(65, 137, 189, 0.75), rgba(65, 137, 189, 0.75)), url(${currentImage})`
    }">

    <div class="intro__top">
      <h1 class="intro__heading">Ting Global: AI-Powered Education </h1>
      <p class="intro__subheading">
        Transforming Education Through AI and DAO Collaboration
      </p>
    </div>
    <div class="intro__content">
      <!-- <img class="intro__img" src="../../assets/images/challenge-intro.gif" alt="Challenge 18" /> -->
      <p class="intro__text">
        Discover the future of education at Ting Global, where we blend cutting-edge AI technology with the power of
        decentralized autonomous organization (DAO) principles. Join us in revolutionizing the way you learn, collaborate,
        and grow.
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
  data(){
    return{
      images:[
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        '10.png',
        '11.png',
        '12.png',
        '13.png',
        '14.png',
        '15.png',
        '16.png',
        '17.png',
        '18.png',
        '19.png',
        '20.png',
      ],
      currentImage :'',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    
  },
  mounted() {
    this.changeBackground();
  },
  methods: {
    changeBackground() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      this.currentImage = require(`~/static/${this.images[randomIndex]}`);
    },
  },
};
</script>

<style lang="scss">
.intro {
  padding: 18rem $padding-sides-desktop;
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
    flex-direction: column;

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
      z-index: 2;

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
