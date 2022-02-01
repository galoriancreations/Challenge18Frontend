<template>
  <Page name="home" :showHeading="false" :mainSection="false">
    <Intro />
    <main class="home">
      <TopChallenges />
      <UpcomingChallenges />
      <TryItYourself />
      <Testimonials />
      <LatestNews />
      <Partners class="section-white" />
    </main>
  </Page>
</template>

<script>
import Intro from "~/components/home/Intro";
import TopChallenges from "~/components/home/TopChallenges";
import UpcomingChallenges from "~/components/home/UpcomingChallenges";
import TryItYourself from "~/components/home/TryItYourself";
import Testimonials from "~/components/home/Testimonials";
import LatestNews from "~/components/home/LatestNews";
import Partners from "~/components/about/Partners";

export default {
  components: {
    Intro,
    TopChallenges,
    UpcomingChallenges,
    TryItYourself,
    Testimonials,
    LatestNews,
    Partners
  },
  async asyncData({ store }) {
    if (process.client) {
      await store.dispatch("challenges/loadLatest");
    }
  }
};
</script>
