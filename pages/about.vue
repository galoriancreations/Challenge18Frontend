<template>
  <Page title="About Us" name="about">
    <OurCompany />
    <WhyChallenge18 />
    <Partners small />
    <TeamSection v-for="team in teams" :key="team.title" v-bind="team" />
  </Page>
</template>

<script>
import teams from "../assets/data/teams";

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
