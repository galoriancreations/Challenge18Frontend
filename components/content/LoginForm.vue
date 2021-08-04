<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form__field">
      <label for="username" class="form__label">
        Username
      </label>
      <input
        v-model="formData.username"
        id="username"
        placeholder="Your username"
        required
        class="form__input"
        ref="username"
      />
    </div>
    <div class="form__field">
      <label for="phone" class="form__label">Phone</label>
      <input
        v-model="formData.phone"
        id="phone"
        name="phone"
        type="tel"
        required
        placeholder="Phone number used for registration"
        class="form__input"
      />
    </div>
    <BaseButton variant="blue">Login</BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        phone: ""
      },
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
    window.scrollTo(0, 0);
  }
};
</script>
