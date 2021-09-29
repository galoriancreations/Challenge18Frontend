<template>
  <WhiteSection class="top-challenges">
    <SectionHeading small>Top Challenges</SectionHeading>
    <div class="top-challenges__grid">
      <TopChallengesItem
        v-for="item in challenges"
        :key="item.title"
        :challenge="item"
      />
    </div>
  </WhiteSection>
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
            "In 2015, world leaders agreed to 17 Global Goals (officially known as the Sustainable Development Goals or SDGs). It's now five years on, and we have more work than ever to do.\nThese goals have the power to create a better world by 2030, by ending poverty, fighting inequality and addressing the urgency of climate change. Guided by the goals, it is now up to all of us, governments, businesses, civil society and the general public to work together to build a better future for everyone.\nJoin us on an amazing process of 18 Days of Sustainability & Leadership Challenge inspired by the Global Goals."
        },
        {
          image: require("~/assets/images/logos/PNGChallenge18LogoClimateAction-01.png"),
          title: "Climate Action",
          text:
            "Take urgent action to combat climate change and its impacts. Join us on an on an amazing process of 18 Days of Climate Action Challenge inspired by Global Goals."
        },
        {
          image: require("~/assets/images/logos/PNGChallenge18LogoSongsAndValues-01.png"),
          title: "Songs & Values",
          text:
            "Join us on an amazing process of 18 Days challenge of Songs & Values with each day focusing on a certain value and ending with one big celebration and a playlist of songs we all love."
        },
        {
          image: require("~/assets/images/logos/PNGChallenge18LogoFriendlyAI-01.png"),
          title: "Friendly AI",
          text:
            "Join us on an amazing process of 18 Days challenge of Friendly AI with each day focusing on a certain value of how to better live and shape our future."
        },
        {
          image: require("~/assets/images/logos/hero-journey.jpeg"),
          title: "The Hero's Journey",
          text:
            "In literature, the hero’s journey is a common structure of many stories that unfold the story of a hero who embarks on an adventure, wins a victory after a crucial crisis, and then returns home. The structure was presented by Joseph Campbell in his book The Hero with a Thousand Faces, which described the basic plot as it would be described and as we would experience together during the days of the challenge. Thus every day we will advance in a journey of heroes shared by all of us, in which together we will present beloved characters from literature or cinema and share their journey and ours in all its stages. Ready?"
        }
      ]
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
    grid-template-columns: repeat(5, 1fr);
    gap: 3.5rem;
    max-width: 100rem;
    margin: auto;

    @include respond(mobile-land) {
      gap: 2.5rem;
    }

    @include respond(mobile) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
}
</style>
