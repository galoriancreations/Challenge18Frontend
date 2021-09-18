<template>
  <Page title="Join Us" name="membership">
    <section class="inner-section">
      <SectionHeading small>Commitment Membership Plans</SectionHeading>
      <MembershipPlans />
    </section>
    <section class="inner-section" ref="formSection">
      <SectionHeading small>Register Now</SectionHeading>
      <MembershipForm />
    </section>
  </Page>
</template>

<script>
export default {
  meta: {
    forLoggingIn: true
  },
  data() {
    return {
      selectedPlan: null
    };
  },
  methods: {
    setSelectedPlan(plan) {
      this.selectedPlan = plan;
      window.scrollTo(
        0,
        window.scrollY +
          this.$refs.formSection.getBoundingClientRect().top -
          125
      );
    }
  },
  provide() {
    return {
      getSelectedPlan: () => this.selectedPlan,
      setSelectedPlan: this.setSelectedPlan
    };
  }
};
</script>

<style lang="scss">
.inner-section {
  .section-heading-wrapper {
    margin-bottom: 6rem;

    @include respond(mobile) {
      margin-bottom: 4rem;
    }
  }

  &:not(:last-child) {
    margin-bottom: 10rem;

    @include respond(mobile) {
      margin-bottom: 8rem;
    }
  }
}
</style>
