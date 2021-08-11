<template>
  <Page name="home" :showHeading="false">
    <Intro />
    <WhiteSection tag="main" class="home">
      <RecentResults />
      <SectionSeperator />
      <Testimonials />
      <SectionSeperator />
      <LatestNews />
      <SectionSeperator />
      <Partners />
    </WhiteSection>
  </Page>
</template>

<script>
import Intro from "../components/home/Intro";
import RecentResults from "../components/home/RecentResults";
import Testimonials from "../components/home/Testimonials";
import LatestNews from "../components/home/LatestNews";
import Partners from "../components/about/Partners";

export default {
  components: { Intro, RecentResults, Testimonials, LatestNews, Partners }
};
</script>
