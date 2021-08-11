<template>
  <div class="checkout">
    <div class="selected-plan">
      <div class="selected-plan__seperator" />
      <p class="selected-plan__plan">{{ plan.label }} / ${{ plan.price }}</p>
      <div class="selected-plan__seperator" />
    </div>
    <div class="checkout__info" ref="container">
      <h3 class="checkout__heading">Your Details</h3>
      <div class="checkout__grid">
        <div class="checkout__field">
          <h4 class="checkout__title">Username</h4>
          <p class="checkout__value">{{ details.username }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Lead staff member's name</h4>
          <p class="checkout__value">{{ details.memberName }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Lead staff member's role</h4>
          <p class="checkout__value">{{ details.memberRole }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">School/Organization</h4>
          <p class="checkout__value">{{ details.organization }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Town/City</h4>
          <p class="checkout__value">{{ details.city }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Country</h4>
          <p class="checkout__value">{{ details.country }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Lead contact email</h4>
          <p class="checkout__value">{{ details.email }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Lead contact phone number</h4>
          <p class="checkout__value">{{ details.phone }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Challenge language</h4>
          <p class="checkout__value">{{ languageText }}</p>
        </div>
        <div class="checkout__field">
          <h4 class="checkout__title">Membership plan</h4>
          <p class="checkout__value">{{ planText }}</p>
        </div>
      </div>
      <BaseButton variant="blue" @click="backToForm">
        <i class="fas fa-edit" /> Edit
      </BaseButton>
    </div>
    <client-only>
      <PayPal
        :amount="price"
        currency="USD"
        :client="paypalCredentials"
        :env="paypalEnv"
        @payment-completed="paymentCompleted"
        @payment-cancelled="paymentCancelled"
      />
    </client-only>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </div>
</template>

<script>
import { languageOptions, planOptions } from "../../assets/util/options";

export default {
  components: {
    PayPal: () => (process.client ? import("vue-paypal-checkout") : null)
  },
  inject: ["details", "getSelectedPlan", "backToForm"],
  data() {
    return {
      paypalCredentials: {
        sandbox: this.$config.paypalSandbox,
        production: this.$config.paypalLive
      },
      paypalEnv:
        process.env.NODE_ENV === "production" ? "production" : "sandbox",
      loading: false,
      error: null
    };
  },
  computed: {
    plan() {
      return this.getSelectedPlan();
    },
    languageText() {
      const matchingLanguage = languageOptions.find(
        language => language.name === this.details.language
      );
      return matchingLanguage?.label;
    },
    planText() {
      const { label, price } = planOptions.find(
        plan => plan.type === this.plan.type
      );
      return `${label} / $${price}`;
    },
    price() {
      return `${this.plan.price}.00`;
    }
  },
  methods: {
    async paymentCompleted() {
      this.loading = true;
      this.error = null;
      try {
        await this.$store.dispatch("auth", {
          mode: "register",
          data: { ...this.details, paid: true }
        });
      } catch {
        this.error =
          "An error occured while creating your account. Please contact us.";
      }
      this.loading = false;
    },
    paymentCancelled() {
      this.error =
        "Payment failed. Please check with your credit card company and try again.";
    }
  },
  mounted() {
    window.scrollTo(
      0,
      window.scrollY + this.$refs.container.getBoundingClientRect().top - 120
    );
  }
};
</script>

<style lang="scss">
.checkout {
  max-width: 70rem;
  margin: auto;
  line-height: 1.6;

  &__info {
    margin-bottom: 4.5rem;
    box-shadow: $boxshadow2;
    padding: 3.5rem 3rem;
    border-radius: 1rem;

    @include respond(mobile) {
      text-align: center;
      margin: 0 0 3.5rem;
      padding: 2.5rem 2rem;
    }

    & > .button {
      width: auto;
      padding: 0.8rem 3rem;
      font-weight: 600;
      margin-top: 3rem;
    }
  }

  &__heading {
    text-align: center;
    font-size: 2.8rem;
    color: $color-blue-2;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.3rem;
      margin-bottom: 2rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    justify-content: space-between;
    grid-gap: 1.5rem;

    @include respond(mobile) {
      grid-template-columns: 1fr;
      justify-content: initial;
    }
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 600;

    @include respond(mobile) {
      font-size: 1.6rem;
    }
  }
}

.paypal-button {
  * {
    width: 100% !important;
  }
}
</style>
