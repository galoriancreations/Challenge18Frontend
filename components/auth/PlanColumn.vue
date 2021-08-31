<template>
  <article class="plan-column">
    <div class="plan-column__header">
      <div class="plan-column__header-content">
        <h3 class="plan-column__plan">{{ plan.label }}</h3>
      </div>
      <WavePatternBottom />
    </div>
    <div class="plan-column__content">
      <ul class="plan-column__features">
        <li
          v-for="feature in plan.features"
          :key="feature"
          class="plan-column__feature"
        >
          <i class="fas fa-check" />
          <span>{{ feature }}</span>
        </li>
      </ul>
      <BaseButton variant="blue" @click="setSelectedPlan(plan)">
        Pick plan
      </BaseButton>
    </div>
  </article>
</template>

<script>
import { membershipFeatures } from "../../assets/util/options";

export default {
  props: {
    plan: Object
  },
  inject: ["setSelectedPlan"],
  data() {
    return {
      membershipFeatures
    };
  }
};
</script>

<style lang="scss">
@import "../../assets/sass/base.scss";

.plan-column {
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: $boxshadow2;
  display: flex;
  flex-direction: column;

  &__header {
    position: relative;
    background-color: $color-blue-2;
    color: #fff;
    padding: 3rem 2.5rem 5.5rem;
    text-align: center;
  }

  &__header-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 7rem;

    @include respond(mobile) {
      height: 6.5rem;
    }
  }

  &__plan {
    font-size: 3rem;

    @include respond(mobile) {
      font-size: 2.8rem;
    }
  }

  &__content {
    padding: 4rem 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;

    @include respond(tablet-land) {
      padding: 4rem 2.5rem;
    }

    @include respond(mobile) {
      padding: 3rem 2rem;
    }
  }

  &__features {
    list-style: none;
    flex: 1;
    margin-bottom: 4rem;

    @include respond(mobile) {
      margin-bottom: 3rem;
    }
  }

  &__feature {
    display: flex;
    align-items: center;
    line-height: 1.5;
    font-size: 1.55rem;

    @include respond(mobile) {
      font-size: 1.5rem;
    }

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    &.excluded {
      color: #b9b8b8;

      i {
        color: $color-blue-1;
      }
    }

    i {
      margin-right: 1.5rem;
      width: 1.55rem;
      color: $color-azure;
      display: block;
      text-align: center;

      @include respond(mobile) {
        width: 1.5rem;
      }
    }

    span {
      display: block;
      flex: 1;
    }
  }

  .button {
    width: 100%;
  }
}
</style>
