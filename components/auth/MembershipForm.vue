<template>
  <form v-if="!checkoutMode" class="form" @submit.prevent="submitHandler">
    <div class="selected-plan">
      <div class="selected-plan__seperator" />
      <p v-if="plan" class="selected-plan__plan">
        {{ plan.label }} / ${{ plan.price }}
      </p>
      <p v-else class="selected-plan__text">
        Please pick one of the plans above
      </p>
      <div class="selected-plan__seperator" />
    </div>
    <div class="form__field">
      <label for="username" class="form__label">
        Username
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
    <div class="form__field">
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
    <div class="form__field">
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
      <label for="city" class="form__label">
        City/Town
      </label>
      <input
        v-model="formData.city"
        id="city"
        required
        class="form__input"
        placeholder="City/Town"
      />
    </div>
    <div class="form__field">
      <label for="country" class="form__label">
        Country
      </label>
      <input
        v-model="formData.country"
        id="country"
        required
        class="form__input"
        placeholder="Country"
      />
    </div>
    <div class="form__field">
      <label for="email" class="form__label">
        Lead contact email
      </label>
      <input
        v-model="formData.email"
        id="email"
        type="email"
        required
        class="form__input"
        placeholder="Lead contact email"
      />
    </div>
    <div class="form__field">
      <label for="phone" class="form__label">
        Lead contact phone number
        <CheckIcon :status="availability.phone" />
      </label>
      <input
        v-model="formData.phone"
        id="phone"
        type="tel"
        required
        class="form__input"
        placeholder="Lead contact phone number"
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
        required
        class="language-selector"
      />
    </div>
    <BaseButton variant="blue">Proceed to checkout</BaseButton>
    <ErrorMessage v-if="error" :error="error" />
  </form>
  <Checkout v-else />
</template>

<script>
import { languageOptions } from "../../assets/util/options";
import _ from "lodash";

export default {
  inject: ["getSelectedPlan"],
  data() {
    return {
      formData: {
        username: "",
        memberName: "",
        memberRole: "",
        organization: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        language: "English",
        accountType: "organization"
      },
      availability: {
        username: null,
        phone: null
      },
      languageOptions,
      error: null,
      checkoutMode: false
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
    }
  },
  methods: {
    submitHandler() {
      if (!this.plan) {
        this.error =
          "No plan has been selected. Please select on of the plans above.";
        return;
      }
      for (let key in this.availability) {
        if (this.availability[key] === "taken") {
          this.error = `${_.capitalize(key)}
            is already taken. Please try a different ${key}.`;
          return;
        }
      }
      this.error = null;
      this.checkoutMode = true;
    },
    backToForm() {
      this.checkoutMode = false;
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
    }
  },
  watch: {
    username(value) {
      this.checkAvailability("username", value, "checkUsername");
    },
    phone(value) {
      this.checkAvailability("phone", value, "checkPhone");
    }
  },
  provide() {
    return {
      details: this.formData,
      backToForm: this.backToForm
    };
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
