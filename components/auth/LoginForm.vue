<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form__field">
      <label for="username" class="form__label">
        Username
      </label>
      <input
        v-model.trim="formData.username"
        id="username"
        placeholder="Your username"
        required
        class="form__input"
        ref="username"
      />
    </div>
    <div class="form__field">
      <label for="phone" class="form__label">Phone</label>
      <VuePhoneNumberInput
        class="phone-number-input"
        id="phone"
        v-model="phoneInput"
        @update="formData.phone = $event.formattedNumber"
        color="#007bff"
        :border-radius="8"
        :show-code-on-list="true"
        :no-flags="true"
      />
    </div>
    <BaseButton variant="blue">Login</BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </form>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  components: { VuePhoneNumberInput },
  data() {
    return {
      formData: {
        username: "",
        phone: ""
      },
      phoneInput: "",
      loading: false,
      error: null
    };
  },
  methods: {
    async submitHandler() {
      this.loading = true;
      this.error = null;
      try {
        await this.$store.dispatch("auth", {
          mode: "signIn",
          data: this.formData
        });
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    }
  },
  mounted() {
    this.$refs.username.focus();
    setTimeout(() => {
      const { top } = this.$el.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + top - 150);
    }, 10);
  }
};
</script>
