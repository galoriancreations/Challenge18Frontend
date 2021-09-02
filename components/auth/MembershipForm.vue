<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="selected-plan">
      <div class="selected-plan__seperator" />
      <p v-if="plan" class="selected-plan__plan">
        {{ plan.label }}
      </p>
      <p v-else class="selected-plan__text">
        Please pick one of the plans above
      </p>
      <div class="selected-plan__seperator" />
    </div>
    <AccountTypeSelector v-model="formData.accountType" />
    <div class="form__field">
      <label for="username" class="form__label">
        Username (used for login)
        <CheckIcon :status="availability.username" />
      </label>
      <input
        v-model="formData.username"
        id="username"
        required
        class="form__input"
        placeholder="Username"
      />
    </div>
    <div class="form__field">
      <label for="phone" class="form__label">
        Phone number (used for login)
        <CheckIcon :status="availability.phone" />
      </label>
      <VuePhoneNumberInput
        class="phone-number-input"
        id="phone-number"
        v-model="phoneInput.value"
        @update="updatePhoneNumber"
        color="#007bff"
        :border-radius="8"
        :show-code-on-list="true"
        :no-flags="true"
      />
    </div>
    <div class="form__field" v-if="isOrganization">
      <label for="organization" class="form__label">
        Organization/school name
      </label>
      <input
        v-model="formData.organization"
        id="organization"
        required
        class="form__input"
        placeholder="Organization/school name"
      />
    </div>
    <div class="form__field" v-if="!isOrganization">
      <label for="fullName" class="form__label">
        Full name
      </label>
      <input
        v-model="formData.fullName"
        id="fullName"
        class="form__input"
        placeholder="Your full name"
      />
    </div>
    <div class="form__field">
      <label for="country" class="form__label">
        Country
      </label>
      <v-select
        v-model="formData.country"
        :options="countryOptions"
        :reduce="option => option.code"
        label="name"
        placeholder="Country"
        class="language-selector"
      />
    </div>
    <div class="form__field" v-if="isOrganization">
      <label for="memberName" class="form__label">
        Lead staff member's mame
      </label>
      <input
        v-model="formData.memberName"
        id="memberName"
        required
        class="form__input"
        placeholder="Lead staff member's mame"
      />
    </div>
    <div class="form__field" v-if="isOrganization">
      <label for="memberRole" class="form__label">
        Lead staff member's role
      </label>
      <input
        v-model="formData.memberRole"
        id="memberRole"
        required
        class="form__input"
        placeholder="Lead staff member's role"
      />
    </div>
    <div class="form__field">
      <label for="email" class="form__label">
        Email address
      </label>
      <input
        v-model="formData.email"
        id="email"
        type="email"
        class="form__input"
        :placeholder="
          isOrganization ? 'Lead contact email' : 'Your email address'
        "
      />
    </div>
    <div class="form__field">
      <label for="language" class="form__label">
        Challenge language
      </label>
      <v-select
        v-model="formData.language"
        :options="languageOptions"
        :reduce="option => option.name"
        class="language-selector"
      />
    </div>
    <BaseButton variant="blue" @click="submitHandler">Register</BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </form>
</template>

<script>
import countryOptions from "../../assets/data/countries";
import languageOptions from "../../assets/data/languages";
import _ from "lodash";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  components: { VuePhoneNumberInput },
  inject: ["getSelectedPlan"],
  data() {
    return {
      formData: {
        username: "",
        phone: "",
        fullName: "",
        organization: "",
        country: "",
        memberName: "",
        memberRole: "",
        email: "",
        language: "English",
        accountType: "organization"
      },
      phoneInput: {
        value: null,
        isValid: false
      },
      availability: {
        username: null,
        phone: null
      },
      countryOptions,
      languageOptions,
      loading: false,
      error: null,
      phoneNumber: null
    };
  },
  computed: {
    username() {
      return this.formData.username;
    },
    phone() {
      return this.formData.phone;
    },
    plan() {
      return this.getSelectedPlan();
    },
    isOrganization() {
      return this.formData.accountType === "organization";
    }
  },
  methods: {
    updatePhoneNumber(data) {
      if (data.formattedNumber) {
        this.formData.phone = data.formattedNumber;
      }
      this.phoneInput.isValid = data.isValid;
    },
    checkAvailability(key, value, apiKey) {
      clearTimeout(this.timeout);
      if (!value.trim()) {
        this.availability[key] = null;
      } else {
        this.timeout = setTimeout(async () => {
          this.availability[key] = "loading";
          const { result } = await this.$axios.$post("/api", {
            [apiKey]: value
          });
          this.availability[key] = result ? "available" : "taken";
        }, 500);
      }
    },
    validateData() {
      if (!this.plan) {
        this.error =
          "No plan has been selected. Please select on of the plans above.";
        return false;
      }
      if (!this.phoneInput.isValid) {
        this.error =
          "The phone number you entered is invalid. Please enter a valid number.";
        return false;
      }
      for (let key in this.availability) {
        if (this.availability[key] === "taken") {
          this.error = `${_.capitalize(key)}
            is already taken. Please try a different ${key}.`;
          return false;
        }
      }
      this.error = null;
      return true;
    },
    async submitHandler() {
      if (!this.validateData()) return;
      this.loading = true;
      try {
        await this.$store.dispatch("auth", {
          mode: "register",
          data: { ...this.formData, plan: this.plan.type }
        });
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    }
  },
  watch: {
    username(value) {
      this.checkAvailability("username", value, "checkUsername");
    },
    phone(value) {
      this.checkAvailability("phone", value, "checkPhone");
    }
  }
};
</script>

<style lang="scss">
.selected-plan {
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include respond(mobile) {
    margin-top: 0;
    margin-bottom: 3rem;
  }

  &__seperator {
    height: 0.2rem;
    flex: 1;
    background-color: #ccc;
  }

  &__text,
  &__plan {
    margin: 0 4rem;

    @include respond(mobile) {
      margin: 0 1.5rem;
    }
  }

  &__text {
    font-weight: 500;
    font-size: 1.8rem;

    @include respond(mobile) {
      font-size: 1.5rem;
    }
  }

  &__plan {
    font-weight: 600;
    color: $color-blue-2;
    font-size: 2.5rem;

    @include respond(mobile) {
      font-size: 2rem;
    }
  }
}

.phone-number-input {
  * {
    font-family: inherit !important;
    z-index: 5 !important;
  }

  & > div {
    height: 5.4rem !important;

    @include respond(mobile) {
      height: 5.2rem !important;
    }
  }

  input,
  label {
    font-size: inherit !important;
  }

  input {
    height: 5.4rem !important;
    border-width: 0.2rem !important;

    @include respond(mobile) {
      height: 5.2rem !important;
    }
  }

  .select-country-container {
    min-width: initial !important;
    max-width: initial !important;
    width: 15rem !important;
    flex: 0 0 15rem !important;

    @include respond(mobile) {
      width: 14.5rem !important;
      flex: 0 0 14.5rem !important;
    }
  }

  .country-selector__toggle {
    top: calc(50% - 4.5px) !important;

    @include respond(mobile) {
      top: calc(50% - 4.75px) !important;
    }
  }

  input:not(:placeholder-shown) ~ label,
  label[style="color: orangered;"] {
    font-size: 1.2rem !important;
  }
}
</style>
