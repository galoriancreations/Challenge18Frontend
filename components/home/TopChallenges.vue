<template>
  <ColoredSection class="top-challenges">
    <SectionHeading small>Top Challenges</SectionHeading>
    <div class="top-challenges__grid">
      <TopChallengesItem
        v-for="item in challenges"
        :key="item.title"
        :challenge="item"
      />
    </div>
    <div class="top-challenges__button">
      <BaseButton variant="blue" link="/challenges">
        Explore more challenges
      </BaseButton>
    </div>
  </ColoredSection>
</template>

<script>
import challenges from "~/assets/data/top-challenges";

export default {
  computed: {
    challenges() {
      return challenges.slice(0, 3);
    }
  }
};
</script>

<style lang="scss">
.top-challenges {
  padding-top: 10rem !important;

  @include respond(mobile) {
    padding-top: 6.5rem !important;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
    max-width: 80rem;
    margin: auto;
    padding: 0;

    @include respond(tablet-sm) {
      gap: 3rem;
    }

    @include respond(mobile-land) {
      gap: 2.5rem;
    }

    @include respond(mobile) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      gap: initial;
      margin: -1rem;

      & > * {
        width: calc((100% - 2rem * 2) / 2);
        margin: 1rem;
      }
    }
  }

  &__button {
    margin-top: 8rem;

    @include respond(mobile) {
      margin-top: 6rem;
    }

    .button {
      width: 100%;
      max-width: 35rem;
    }
  }
}
</style>
