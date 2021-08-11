<template>
  <Page title="Premium Membership" name="membership">
    <WhiteSection tag="main" class="membership">
      <RegisterNote>
        Premium membership is currently available for organizations only. To
        join us as an individual user, you can
        <RouterLink to="/register">register for free</RouterLink>.
      </RegisterNote>
      <section class="inner-section">
        <SectionHeading small>Membership Plans</SectionHeading>
        <MembershipPlans />
      </section>
      <section class="inner-section" ref="formSection">
        <SectionHeading small>Register Now</SectionHeading>
        <MembershipForm />
      </section>
    </WhiteSection>
  </Page>
</template>

<script>
import RegisterNote from "../components/UI/RegisterNote";
import MembershipPlans from "../components/auth/MembershipPlans";
import MembershipForm from "../components/auth/MembershipForm";

export default {
  components: { RegisterNote, MembershipPlans, MembershipForm },
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
  .section-heading {
    margin-bottom: 7rem;

    @include respond(mobile) {
      margin-bottom: 5rem;
    }
  }

  &:not(:last-child) {
    margin-bottom: 9rem;

    @include respond(mobile) {
      margin-bottom: 7rem;
    }
  }
}
</style>
