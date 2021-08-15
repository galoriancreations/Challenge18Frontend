<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form__field">
      <label for="username" class="form__label">
        Username (used for login)
        <CheckIcon :status="availability.username" />
      </label>
      <input
        v-model="formData.username"
        id="username"
        placeholder="Your username"
        required
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="phone" class="form__label">
        Phone (used for login)
        <CheckIcon :status="availability.phone" />
      </label>
      <input
        v-model="formData.phone"
        id="phone"
        type="tel"
        required
        placeholder="Phone number incl. country code"
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="fullName" class="form__label">Full name</label>
      <input
        v-model="formData.fullName"
        id="fullName"
        required
        placeholder="Your full name"
        class="form__input"
      />
    </div>
    <div class="form__field">
      <label for="email" class="form__label">
        Email (optional)
      </label>
      <input
        v-model="formData.email"
        id="email"
        placeholder="Your email address"
        type="email"
        class="form__input"
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
    <BaseButton variant="blue">Register</BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </form>
</template>

<script>
import { languageOptions } from "../../assets/util/options";
import _ from "lodash";

export default {
  data() {
    return {
      formData: {
        username: "",
        phone: "",
        fullName: "",
        email: "",
        language: "English",
        accountType: "individual"
      },
      languageOptions,
      availability: {
        username: null,
        phone: null
      },
      loading: false,
      error: null,
      timeout: null
    };
  },
  computed: {
    username() {
      return this.formData.username;
    },
    phone() {
      return this.formData.phone;
    }
  },
  methods: {
    async submitHandler() {
      for (let key in this.availability) {
        if (this.availability[key] === "taken") {
          this.error = `${_.capitalize(key)}
            is already taken. Please try a different ${key}.`;
          return;
        }
      }
      this.loading = true;
      this.error = null;
      try {
        await this.$store.dispatch("auth", {
          mode: "register",
          data: this.formData
        });
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
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
  }
};
</script>
