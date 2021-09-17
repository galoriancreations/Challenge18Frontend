<template>
  <Page name="home" :showHeading="false" :mainSection="false">
    <Intro />
    <main class="home">
      <TopChallenges />
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
import TryItYourself from "~/components/home/TryItYourself";
import Testimonials from "~/components/home/Testimonials";
import LatestNews from "~/components/home/LatestNews";
import Partners from "~/components/about/Partners";

export default {
  components: {
    Intro,
    TopChallenges,
    TryItYourself,
    Testimonials,
    LatestNews,
    Partners
  }
};
</script>
