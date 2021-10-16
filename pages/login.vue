<template>
  <Page title="Login" name="login">
    <LoginForm />
    <SectionSeperator />
    <div class="auth-switch">
      <p class="auth-switch__text">Don't have an account yet?</p>
      <div class="auth-switch__links">
        <BaseButton
          :link="{ path: '/join', query: $route.query }"
          variant="gold"
        >
          Register for free
        </BaseButton>
      </div>
    </div>
  </Page>
</template>

<script>
export default {
  meta: {
    forLoggingIn: true
  }
};
</script>

<style lang="scss">
.auth-switch {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__text {
    font-size: 1.9rem;
    margin-bottom: 2rem;

    @include respond(mobile) {
      font-size: 1.6rem;
    }
  }

  &__links {
    display: flex;
    justify-content: center;

    @include respond(mobile-land) {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }

  .button {
    font-size: 1.4rem;
    font-weight: 600;

    @include respond(mobile-land) {
      width: 100%;
    }

    @include respond(mobile) {
      font-size: 1.2rem;
    }

    &:not(:last-child) {
      margin-right: 2rem;

      @include respond(mobile-land) {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
