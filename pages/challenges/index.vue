<template>
  <Page title="Challenges" name="challenges">
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
