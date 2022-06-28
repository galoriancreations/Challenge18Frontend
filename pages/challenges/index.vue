<template>
  <Page title="Challenges" name="challenges">
    <section class="challenges-intro">
      <p>
        Join or create any community below to receive daily tasks that will lead
        you on your journey to change!
      </p>
    </section>
    <div class="challenges-grid">
      <TopChallengesItem
        v-for="item in challenges"
        :key="item.title"
        :challenge="item"
      />
    </div>
  </Page>
</template>

<script>
import challenges from "~/assets/data/top-challenges";

export default {
  data() {
    return { challenges };
  }
};
</script>

<style lang="scss">
.challenges-intro {
  max-width: 80rem;
  margin: auto;
  font-size: 2rem;
  text-align: center;
  line-height: 1.7;
  margin-bottom: 8rem;

  @include respond(mobile) {
    font-size: 1.6rem;
    margin-bottom: 6rem;
  }

  p {
    font-size: inherit;
    line-height: inherit;
  }
}

.challenges-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3rem;

  @include respond(tablet) {
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
  }

  @include respond(tablet-sm) {
    gap: 3rem;
  }

  @include respond(mobile-land) {
    gap: 2.5rem;
  }

  @include respond(mobile) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
</style>
