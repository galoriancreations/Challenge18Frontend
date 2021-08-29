<template>
  <article class="pricing-column">
    <div class="pricing-column__header">
      <div class="pricing-column__header-content">
        <p v-if="plan.label" class="pricing-column__plan">{{ plan.label }}</p>
        <h3 class="pricing-column__price">{{ price }}</h3>
      </div>
      <WavePatternBottom />
    </div>
    <div class="pricing-column__content">
      <ul class="pricing-column__features">
        <li
          v-for="feature in membershipFeatures"
          :key="feature"
          :class="{
            'pricing-column__feature': true,
            excluded: !plan.features.includes(feature)
          }"
        >
          <i v-if="plan.features.includes(feature)" class="fas fa-check" />
          <i v-else class="fas fa-times" />
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
  },
  computed: {
    price() {
      return this.plan.type === "free" ? "Free" : `$${this.plan.price}`;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/sass/base.scss";

.pricing-column {
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: $boxshadow2;
  display: flex;
  flex-direction: column;

  &__header {
    position: relative;
    background-color: $color-blue-2;
    color: #fff;
    padding: 2.5rem 2.5rem 5.5rem;
    text-align: center;
  }

  &__header-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 9.6rem;

    @include respond(mobile) {
      height: 9.2rem;
    }
  }

  &__plan {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;

    @include respond(mobile) {
      font-size: 1.85rem;
    }
  }

  &__price {
    font-size: 3.7rem;

    @include respond(mobile) {
      font-size: 3.5rem;
    }
  }

  &__content {
    padding: 4rem 2.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;

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
      margin-right: 2rem;
      width: 1.6rem;
      color: $color-azure;
      display: block;
      text-align: center;

      @include respond(mobile) {
        width: 1.5rem;
        margin-right: 1.5rem;
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
