<template>
  <form class="form" @submit.prevent="submitHandler">
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
        id="phone"
        v-model="phoneInput.value"
        @update="updatePhoneNumber"
        color="#007bff"
        :border-radius="8"
        :show-code-on-list="true"
        :no-flags="true"
      />
    </div>
    <div class="form__field">
      <label for="password" class="form__label">Password</label>
      <input
        v-model="formData.password"
        id="Password"
        required
        class="form__input"
        placeholder="Password"
        type="password"
      />
    </div>
    <div class="form__field">
      <label for="confirmPassword" class="form__label">Confirm password</label>
      <input
        v-model="formData.confirmPassword"
        id="confirmPassword"
        required
        class="form__input"
        placeholder="Confirm password"
        type="password"
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
      <VueSelect
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
        Lead staff member's name
      </label>
      <input
        v-model="formData.memberName"
        id="memberName"
        class="form__input"
        placeholder="Lead staff member's name"
      />
    </div>
    <div class="form__field" v-if="isOrganization">
      <label for="memberRole" class="form__label">
        Lead staff member's role
      </label>
      <input
        v-model="formData.memberRole"
        id="memberRole"
        class="form__input"
        placeholder="Lead staff member's role"
      />
    </div>
    <div class="form__field">
      <label for="email" class="form__label">
        Email address
        <CheckIcon :status="availability.email" />
      </label>
      <input
        v-model="emailInput.value"
        @input="updateEmail"
        id="email"
        type="email"
        class="form__input"
        placeholder="Your email address"
      />
    </div>
    <div class="form__field">
      <label for="language" class="form__label">
        Challenge language
      </label>
      <VueSelect
        v-model="formData.language"
        :options="languageOptions"
        :reduce="option => option.name"
        class="language-selector"
      />
    </div>
    <div
      class="form__field form__confirm"
      :style="{ direction: commitmentDirection }"
    >
      <v-app>
        <v-checkbox
          v-model="confirmed"
          :label="commitmentText"
          :disabled="!name"
          color="#007bff"
          :style="{ direction: commitmentDirection }"
        />
      </v-app>
    </div>
    <BaseButton variant="blue" :disabled="!confirmed || loading">
      Register
    </BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </form>
</template>

<script>
import registration from "~/mixins/registration";
import { commitmentTexts, rtlLanguages } from "~/assets/util/options";

export default {
  mixins: [registration],
  inject: ["getSelectedPlan"],
  data() {
    return {
      confirmed: false,
      availability: { 
      username: null,
      phone: null,
      email: null
    },
    };
  },
  computed: {
    plan() {
      return this.getSelectedPlan();
    },
    isOrganization() {
      return this.formData.accountType === "organization";
    },
    name() {
      const { fullName, organization, username } = this.formData;
      return (this.isOrganization ? organization : fullName) || username;
    },
    commitmentLanguage() {
      const { language } = this.formData;
      return Object.keys(commitmentTexts).includes(language)
        ? language
        : "English";
    },
    commitmentText() {
      let text = commitmentTexts[this.commitmentLanguage];
      if (this.name) {
        text = text.replace("__", this.name);
      }
      return text;
    },
    commitmentDirection() {
      return rtlLanguages.includes(this.commitmentLanguage) ? "rtl" : null;
    }
  },
  methods: {
    async submitHandler() {
      if (!this.validateData()) return;
      if (this.formData.confirmPassword != this.formData.password){
        this.error = "Passwords don't match"
        return;
      } 
      this.loading = true;
      try {
        await this.$store.dispatch("auth", {
          mode: "register",
          data: { ...this.formData, plan: "18-days" }
        });
        this.$cookies.set("newRegistration", true);
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
.selected-plan {
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 4rem;

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
    margin: -1rem 4rem 0;
    display: inline-block;
    padding: 0.5rem 2.5rem;
    border: 0.2rem solid #ccc;
    border-radius: 0.5rem;

    @include respond(mobile) {
      margin: -0.75rem 1.5rem 0;
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

.form {
  &__confirm {
    .v-label {
      color: #000 !important;
      line-height: 1.7 !important;

      @include respond(mobile) {
        font-size: 1.45rem;
      }

      &--is-disabled {
        color: rgba(#000, 0.5) !important;
      }
    }

    .v-messages {
      min-height: 0;
    }

    &[style="direction: rtl;"] {
      .v-label {
        text-align: right;
      }

      .v-input--selection-controls__input {
        margin-right: 0;
        margin-left: 8px;
      }
    }
  }
}
</style>
