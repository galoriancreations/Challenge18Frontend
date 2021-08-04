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
import Intro from "../components/content/Intro";
import RecentResults from "../components/content/RecentResults";
import Testimonials from "../components/content/Testimonials";
import LatestNews from "../components/content/LatestNews";
import Partners from "../components/content/Partners";

export default {
  components: { Intro, RecentResults, Testimonials, LatestNews, Partners }
};
</script>
