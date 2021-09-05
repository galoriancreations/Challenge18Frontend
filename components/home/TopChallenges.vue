<template>
  <section class="top-challenges">
    <SectionHeading small>Top Challenges</SectionHeading>
    <div class="top-challenges__grid">
      <TopChallengesItem
        v-for="item in challenges"
        :key="item.title"
        :challenge="item"
        @click="setChallenge(item)"
      />
    </div>
    <DashboardModal
      :active="showModal"
      class="top-challenges__modal"
      :scrollbar="false"
    >
      <h2 class="top-challenges__title">
        {{ selectedChallenge.title }}
      </h2>
      <div class="top-challenges__text" v-html="selectedChallenge.text" />
    </DashboardModal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      challenges: [
        {
          image: require("~/assets/images/logos/PNGChallenge18LogoSDGs-01.png"),
          title: "SDG's",
          text:
            "<p>In 2015, world leaders agreed to 17 Global Goals (officially known as the Sustainable Development Goals or SDGs). It's now five years on, and we have more work than ever to do.</p><p>These goals have the power to create a better world by 2030, by ending poverty, fighting inequality and addressing the urgency of climate change. Guided by the goals, it is now up to all of us, governments, businesses, civil society and the general public to work together to build a better future for everyone.</p><p>Join us on an amazing process of 18 Days of Sustainability & Leadership Challenge inspired by the Global Goals.</p>"
        },
        {
          image: require("~/assets/images/logos/PNGChallenge18LogoClimateAction-01.png"),
          title: "Climate Action",
          text:
            "<p>Take urgent action to combat climate change and its impacts. Join us on an on an amazing process of 18 Days of Climate Action Challenge inspired by Global Goals.</p>"
        },
        {
          image: require("~/assets/images/logos/PNGChallenge18LogoSongsAndValues-01.png"),
          title: "Songs & Values",
          text:
            "<p>Join us on an amazing process of 18 Days challenge of Songs & Values with each day focusing on a certain value and ending with one big celebration and a playlist of songs we all love.</p>"
        },
        {
          image: require("~/assets/images/logos/PNGChallenge18LogoFriendlyAI-01.png"),
          title: "Friendly AI",
          text:
            "<p>Join us on an amazing process of 18 Days challenge of Friendly AI with each day focusing on a certain value of how to better live and shape our future.</p>"
        }
      ],
      selectedChallenge: {},
      showModal: false
    };
  },
  methods: {
    setChallenge(challenge) {
      this.selectedChallenge = challenge;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  provide() {
    return {
      closeModal: this.closeModal
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
    cursor: pointer;

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

  &__modal {
    // .modal__wrapper {
    //   max-width: 75rem !important;
    // }
  }

  &__title {
    color: $color-blue-2;
    font-size: 3.5rem;
    margin-bottom: 3rem;
  }

  &__text {
    p {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
