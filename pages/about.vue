<template>
  <Page title="About Us" name="about">
    <WhiteSection tag="main" class="about">
      <ImageWithText tag="section" class="about-main" :image="mainImg">
        <p v-for="paragraph in aboutText.split('\n')" :key="paragraph">
          {{ paragraph }}
        </p>
        <BaseButton link="/membership" variant="gold">Join Us</BaseButton>
      </ImageWithText>
      <Partners small />
      <TeamSection v-for="team in teams" :key="team.title" v-bind="team" />
    </WhiteSection>
  </Page>
</template>

<script>
import ImageWithText from "../components/layout/ImageWithText";
import Partners from "../components/content/Partners";
import TeamSection from "../components/content/TeamSection";
import mainImg from "../assets/images/about-img.jpg";
import teams from "../assets/data/teams";

export default {
  components: { ImageWithText, Partners, TeamSection },
  head: {
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Ting Global is the international body that conducts the 18 official pre-tournament challenge competitions, and the tournament. 18 days of assignments that raise awareness of sustainability and leadership issues."
      }
    ]
  },
  data() {
    return {
      mainImg,
      aboutText:
        "Ting Global is the international body that conducts the 18 official pre-tournament challenge competitions, and the tournament. Teachers and students from across the globe have already completed the Ting Global Sustainability Challenge.\n 18 days of assignments that raise awareness of sustainability and leadership issues – Participation in the challenge solidifies students and raises awareness of the hot topics on the global agenda and allows participants to share their work and form thinking and action groups together.",
      teams
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.about {
  .partners {
    margin: 10.5rem 0 8.5rem;

    @include respond(mobile) {
      margin: 7rem 0 5.5rem;
    }
  }
}

.about-main {
  .button {
    width: 20rem;
    margin-top: 2.5rem;
    font-weight: 600;

    @include respond(tablet-land) {
      margin-top: 3.5rem;
    }

    @include respond(mobile) {
      margin-top: 3rem;
    }
  }
}
</style>
