<template>
  <Page title="About Us" name="about">
    <TeamSection v-for="team in teams" :key="team.title" v-bind="team" />
    <OurCompany />
    <WhyChallenge18 />
    <Partners />
  </Page>
</template>

<script>
import teams from "~/assets/data/teams";

export default {
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
    return { teams };
  }
};
</script>

<style lang="scss">
.about > section:not(.team-section) {
  .section-heading-wrapper {
    margin-bottom: 5rem;

    @include respond(mobile) {
      margin-bottom: 3.5rem;
    }
  }
}
</style>
