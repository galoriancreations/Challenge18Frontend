<template>
  <Page :title="title" name="notfound">
    <WhiteSection tag="main" class="notfound">
      <p>{{ text }}</p>
      <BaseButton variant="blue" link="/">Go to homepage</BaseButton>
    </WhiteSection>
  </Page>
</template>

<script>
export default {
  props: {
    error: null
  },
  data() {
    return {
      title:
        this.error.statusCode === 404 ? "Page Not Found" : "An Error Occured",
      text:
        this.error.statusCode === 404
          ? "The page you're looking for does not exist."
          : this.error.message || "Something went wrong."
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.notfound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
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
