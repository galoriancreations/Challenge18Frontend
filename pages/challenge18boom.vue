<template>
  <Page title="18 Boom Challenge!" name="boom18">
    <section class="boom18__intro">
      <p>
        Donate 18 or more dollars to our charity and get a ticket to win your
        very own Prof. Einstein Robot.
      </p>
    </section>
    <section class="boom18__container">
      <!-- <img
        class="boom18__main-img"
        src="~/assets/images/18boom-einstein.jpg"
        alt="Boom 18 - Prof. Einstein"
      /> -->
      <div class="boom18__content">
        <h3 class="boom18__title">How does it work?</h3>
        <div class="boom18__text">
          <p>Join 18 Boom WhatsApp Group.</p>
          <p>Donate a sum of 18 dollars or more.</p>
          <img
            class="boom18__img"
            src="~/assets/images/einstein-tongue.jpeg"
            alt="18 Boom - Prof. Einstein - tongue out"
          />
          <p>
            Pass the envelope in a message to friends so that the envelope
            passes until it reaches 18 people who donated in total. Then a
            lottery takes place when one of the players wins Prof. Einstein
            Robot for its personal use or to be donated to a school.
          </p>
          <p>
            Invite more friends to the challenge together with an image of your
            tongue out as the famous Prof. Einstein, share on social media and
            grow the chances to receive your own Prof. Einstein Robot or join us
            in helping more schools around the world with their Climate
            education and learning the SDG’s.
          </p>
          <p>Remember to add <strong>#18boom</strong>.</p>
          <p>
            Delivery time: 17 February 2022.
          </p>
        </div>
      </div>
    </section>
    <section class="boom18__donate">
      <h3 class="boom18__title">Ready?</h3>
      <div class="boom18__subsection">
        <!-- <p class="boom18__subtitle">Choose a payment method:</p>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="hosted_button_id" value="9VPU46W3U8EK6" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/IL/i/btn/btn_donateCC_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
            class="boom18__paypal-img"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_IL/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </div> -->
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
        <client-only>
          <div class="points-selector">
            <NumberInput
              v-model="selectedAmount"
              :min="10"
              :step="10"
              :center="true"
              size="large"
              inline
              controls
            />
          </div>
        </client-only>
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
export default {
  components: {
    NumberInput: () =>
      process.client ? import("@chenfengyuan/vue-number-input") : null,
    PayPal: () => (process.client ? import("vue-paypal-checkout") : null)
  },
  head: {
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Donate 18 or more dollars to our charity and get a ticket to win your very own Prof. Einstein Robot."
      }
    ]
  },
  data() {
    return {
      selectedAmount: 18,
      options: [18, 48, 180],
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
  text-align: center;
  &__intro {
    max-width: 70rem;
    margin: auto;
    margin-bottom: 8rem;

    @include respond(mobile) {
      margin-bottom: 5rem;
    }

    p {
      font-size: 2rem;
      line-height: 1.7;

      @include respond(mobile) {
        font-size: 1.7rem;
      }
    }
  }

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

  &__main-img {
    display: block;
    width: 30vw;
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
    max-width: 95rem;
    margin: auto;
  }

  &__title {
    color: $color-blue-2;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 4rem;

    @include respond(mobile) {
      font-size: 2.7rem;
      margin-bottom: 2.5rem;
    }
  }

  &__text {
    p {
      font-size: 1.8rem;
      line-height: 1.7;

      @include respond(mobile) {
        font-size: 1.55rem;
      }

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

  &__img {
    display: block;
    margin: 3rem auto;
    border-radius: 50%;
    border: 5px solid $color-azure;
    box-shadow: $boxshadow2;
    width: 250px;
  }

  &__donate {
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
