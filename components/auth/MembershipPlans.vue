<template>
  <div class="plans-grid">
    <PlanColumn v-for="plan in planOptions" :key="plan.type" :plan="plan" />
  </div>
</template>

<script>
import { planOptions } from "../../assets/util/options";

export default {
  data() {
    return {
      planOptions
    };
  }
};
</script>

<style lang="scss">
.plans-grid {
  display: grid;
  // grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  grid-template-columns: 1fr;
  max-width: 40rem;
  margin: auto;

  @include respond(tablet-land) {
    // grid-template-columns: 1fr 1fr;
    // gap: 5rem;
    // max-width: 75rem;
    // margin: auto;
  }

  @include respond(tablet-sm) {
    // gap: 2.5rem;
  }

  @include respond(mobile-land) {
    // grid-template-columns: 1fr;
    // gap: 4rem;
    // max-width: 40rem;
  }
}
</style>
