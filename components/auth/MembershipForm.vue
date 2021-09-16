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
        id="phone"
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
        required
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
    <BaseButton variant="blue">Register</BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </form>
</template>

<script>
import registration from "../../mixins/registration";

export default {
  mixins: [registration],
  inject: ["getSelectedPlan"],
  computed: {
    plan() {
      return this.getSelectedPlan();
    },
    isOrganization() {
      return this.formData.accountType === "organization";
    }
  },
  methods: {
    async submitHandler() {
      if (!this.plan) {
        this.error =
          "No plan has been selected. Please select on of the plans above.";
        return;
      }
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
</style>
