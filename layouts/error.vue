<template>
  <Page :title="title" name="error-page">
    <p class="error-page__text">{{ errorText }}</p>
    <BaseButton variant="blue" @click="buttonAction">
      {{ buttonText }}
    </BaseButton>
  </Page>
</template>

<script>
export default {
  props: {
    error: null
  },
  computed: {
    title() {
      return this.error.statusCode === 404
        ? "Page Not Found"
        : "An Error Occured";
    },
    errorText() {
      return this.error.statusCode === 404
        ? this.error.response?.data?.msg ||
            "The page you're looking for does not exist."
        : this.error.response?.data?.msg ||
            this.error.message ||
            "Something went wrong.";
    },
    buttonText() {
      return this.error.statusCode === 404 ? "Go to homepage" : "Go back";
    },
    buttonAction() {
      return this.error.statusCode === 404
        ? () => this.$router.push("/")
        : () => this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__text {
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 5rem;

    @include respond(mobile) {
      font-size: 1.8rem;
      margin-bottom: 4rem;
    }
  }
}
</style>
