<template>
  <Page title="18 Boom" name="boom18">
    <section class="boom18__container">
      <img
        class="boom18__img"
        src="~/assets/images/18boom-einstein.jpg"
        alt="Boom 18 - Prof. Einstein"
      />
      <div class="boom18__content">
        <h3 class="boom18__title">How It Works</h3>
        <div class="boom18__text">
          <p>
            Pass the envelope in a message to friends so that the envelope
            passes until it reaches 18 people who donated in total. Then a
            lottery takes place when one of the players wins Prof. Einstein
            Robot for its personal use or to be donated to a school.
          </p>
          <p>
            Delivery time: February 2022.
          </p>
          <p>
            P.s. Whoever the envelope reaches after 18 People then has the
            option to open a new group.
          </p>
        </div>
      </div>
    </section>
    <section class="boom18__donate">
      <h3 class="boom18__title">Ready?</h3>
      <div class="boom18__subsection">
        <p class="boom18__subtitle">Select an amount to donate:</p>
        <div class="boom18__options">
          <button
            class="boom18__option"
            v-for="option in options"
            :key="option"
            @click="selectedAmount = option"
          >
            <input
              type="radio"
              :id="option"
              :value="option"
              v-model="selectedAmount"
            />
            <label :for="option">${{ option }}</label>
          </button>
        </div>
      </div>
      <div class="boom18__subsection">
        <p class="boom18__subtitle">Or enter your own amount (USD):</p>
        <div class="points-selector">
          <NumberInput
            v-model="selectedAmount"
            @input="selectedAmount = +$event.target.value"
            :min="10"
            :step="10"
            :center="true"
            size="large"
            inline
            controls
          />
        </div>
      </div>
      <client-only>
        <div class="boom18__paypal">
          <PayPal :amount="amountText" currency="USD" :client="credentials" />
        </div>
      </client-only>
    </section>
  </Page>
</template>

<script>
import NumberInput from "@chenfengyuan/vue-number-input";

export default {
  components: {
    NumberInput,
    PayPal: () => (process.client ? import("vue-paypal-checkout") : null)
  },
  data() {
    return {
      selectedAmount: 10,
      options: [10, 20, 50],
      credentials: {
        sandbox: this.$config.paypalSandbox,
        production: this.$config.paypalLive
      }
    };
  },
  computed: {
    amountText() {
      return this.selectedAmount.toFixed(2).toString();
    }
  }
};
</script>

<style lang="scss">
.boom18 {
  &__container {
    display: flex;
    align-items: center;
    margin-bottom: 9rem;

    @include respond(tablet-sm) {
      flex-direction: column-reverse;
    }

    @include respond(mobile) {
      margin-bottom: 6rem;
    }
  }

  &__img {
    display: block;
    width: 22vw;
    min-width: 20rem;
    max-width: 30rem;
    box-shadow: $boxshadow2;
    border-radius: 0.8rem;
    margin-right: 9rem;

    @include respond(tablet) {
      margin-right: 5rem;
    }

    @include respond(tablet-sm) {
      width: 100%;
      max-width: 40rem;
      margin: auto;
      margin-top: 8rem;
    }

    @include respond(mobile) {
      margin-top: 6rem;
    }
  }

  &__content {
    flex: 1;

    @include respond(tablet-sm) {
      text-align: center;
    }
  }

  &__title {
    color: $color-blue-2;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.7rem;
      margin-bottom: 2rem;
    }
  }

  &__text {
    p {
      &:not(:last-child) {
        margin-bottom: 2rem;

        @include respond(mobile) {
          margin-bottom: 1.5rem;
        }
      }
    }

    strong {
      font-weight: 600;
    }
  }

  &__donate {
    text-align: center;

    h3 {
      margin-bottom: 4rem;

      @include respond(mobile) {
        margin-bottom: 2.5rem;
      }
    }

    .points-selector {
      input {
        font-size: 1.9rem !important;
        font-weight: 600;

        @include respond(mobile) {
          font-size: 1.75rem !important;
        }
      }
    }
  }

  &__subsection {
    &:not(:last-child) {
      margin-bottom: 4rem;

      @include respond(mobile) {
        margin-bottom: 3rem;
      }
    }
  }

  &__subtitle {
    font-size: 1.85rem;
    margin-bottom: 2rem;

    @include respond(mobile) {
      font-size: 1.55rem;
      margin-bottom: 1.5rem;
    }
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    max-width: 50rem;
    margin: auto;

    @include respond(mobile) {
      gap: 1.5rem;
    }
  }

  &__option {
    display: block;
    font: inherit;
    border: none;
    outline: none;

    input {
      display: none;
    }

    label {
      display: block;
      border: 0.2rem solid transparent;
      border-radius: 0.5rem;
      box-shadow: $boxshadow2;
      padding: 1rem;
      font-size: 1.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.5s;

      @include respond(mobile) {
        font-size: 1.75rem;
      }
    }

    &:hover label,
    &:focus label,
    input:checked + label {
      background-color: rgba($color-azure-light, 0.5);
    }

    input:checked + label {
      border-color: $color-azure;
    }
  }

  &__paypal {
    max-width: 60rem;
    margin: auto;

    .paypal-button {
      * {
        width: 100% !important;
      }
    }
  }
}
</style>
