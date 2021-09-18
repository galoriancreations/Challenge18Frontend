<template>
  <section class="team-section">
    <SectionHeading small>{{ title }}</SectionHeading>
    <div class="team-section__grid">
      <TeamMember
        v-for="member in members"
        :key="member.name"
        :member="member"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    members: Array
  }
};
</script>

<style lang="scss">
.team-section {
  &:not(:last-child) {
    margin-bottom: 9rem;

    @include respond(mobile) {
      margin-bottom: 7rem;
    }
  }

  .section-heading {
    margin-bottom: 5rem;

    @include respond(mobile) {
      margin-bottom: 4rem;
    }
  }

  &__grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: -2rem -1.25rem;

    & > * {
      margin: 2rem 1.25rem;
      width: calc((100% - 2.5rem * 4) / 4);
    }

    @include respond(tablet-land) {
      margin: -2rem;

      & > * {
        margin: 2rem;
        width: calc((100% - 4rem * 2) / 2);
      }
    }

    @include respond(tablet-sm) {
      margin: -2.5rem -1.25rem;

      & > * {
        margin: 2.5rem 1.25rem;
        width: calc((100% - 2.5rem * 2) / 2);
      }
    }

    @include respond(mobile) {
      margin: -2rem 0;

      & > * {
        margin: 2rem 0;
        width: 100%;
      }
    }
  }
}
</style>
