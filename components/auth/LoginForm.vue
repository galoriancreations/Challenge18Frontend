<template>
  <form class="form" @submit.prevent="submitHandler">
    <div v-if="!verificationMode" class="form__field">
      <label for="phone" class="form__label">Phone number</label>
      <VuePhoneNumberInput
        class="phone-number-input"
        id="phone"
        v-model="phoneInput.value"
        @update="updatePhoneNumber"
        color="#007bff"
        :border-radius="8"
        :show-code-on-list="true"
        :no-flags="true"
        ref="phone"
      />
    </div>
    <div v-else class="verification">
      <p class="verification__text">
        Enter the 6-digit code that was sent to phone number
        {{ formData.phone }}
      </p>
      <input
        :value="code"
        @input="codeInputHandler"
        class="verification__input"
        :maxlength="6"
        :readonly="loading"
        autofocus
      />
      <p class="verification__subtext">The code will expire in 10 minutes.</p>
    </div>
    <BaseButton v-if="!verificationMode" variant="blue">Login</BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <BaseButton
      v-if="verificationMode && error"
      @click="verificationMode = false"
      variant="blue"
    >
      Retry login
    </BaseButton>
  </form>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  components: { VuePhoneNumberInput },
  data() {
    return {
      formData: {
        phone: ""
      },
      phoneInput: {
        value: "",
        isValid: false
      },
      loading: false,
      error: null,
      verificationMode: false,
      code: ""
    };
  },
  methods: {
    updatePhoneNumber(data) {
      this.formData.phone = data.formattedNumber;
      this.phoneInput.isValid = data.isValid;
    },
    async submitHandler() {
      if (!this.phoneInput.isValid) {
        if (this.phoneInput.value) {
          this.error = "Invalid phone number";
        }
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        await this.$store.dispatch("auth", {
          mode: "signIn",
          data: this.formData
        });
        // await this.$axios.$post("/api", { signIn: this.formData });
        // this.verificationMode = true;
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
    codeInputHandler(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      this.code = event.target.value;
    },
    async verifyCode() {
      this.loading = true;
      this.error = null;
      try {
        await this.$axios.$post("/api", {
          verifySignIn: {
            userId: this.formData.phone,
            code: this.code
          }
        });
        // await this.$store.dispatch("auth", {
        //   userId: this.formData.phone,
        //   code: this.code
        // });
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    }
  },
  watch: {
    verificationMode() {
      setTimeout(() => {
        this.error = null;
      }, 10);
      this.phoneInput.value = "";
      this.code = "";
    },
    code(value) {
      if (value.length === 6) {
        this.verifyCode();
      } else {
        this.error = null;
      }
    }
  },
  mounted() {
    this.$refs.phone.$el.focus();
    setTimeout(() => {
      const { top } = this.$el.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + top - 150);
    }, 10);
  }
};
</script>

<style lang="scss">
.verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__text {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 2rem;

    @include respond(mobile) {
      font-size: 1.7rem;
    }
  }

  &__input {
    outline: none;
    border: 2px solid #ccc;
    border-radius: 0.5rem;
    width: 22.5rem;
    padding: 0.75rem 0;
    font: inherit;
    font-size: 3rem;
    letter-spacing: 1rem;
    text-align: center;
    display: block;
    transition: all 0.5s;

    @include respond(mobile) {
      font-size: 2.8rem;
    }

    &:focus {
      border-color: $color-azure;
    }
  }

  &__subtext {
    font-size: 1.4rem;
    margin-top: 2rem;

    @include respond(mobile) {
      font-size: 1.3rem;
    }
  }

  & + .error-message:not(:last-child) {
    margin-bottom: 3.5rem;

    @include respond(mobile) {
      margin-bottom: 2.5rem;
    }
  }
}
</style>
