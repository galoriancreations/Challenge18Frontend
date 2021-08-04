<template>
  <section class="register-note">
    <p>
      <slot />
    </p>
    <p>
      If you already have an account, you can
      <NuxtLink to="/login">log in here</NuxtLink>.
    </p>
  </section>
</template>

<style lang="scss">
@import "@/assets/sass/base.scss";

.register-note {
  margin: auto;
  max-width: 75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 9rem;

  @include respond(mobile) {
    margin-bottom: 6.5rem;
  }

  & > * {
    font-size: 1.8rem;
    line-height: 1.7;

    @include respond(mobile) {
      font-size: 1.6rem;
    }

    &:not(:last-child) {
      margin-bottom: 2.5rem;

      @include respond(mobile) {
        margin-bottom: 2rem;
      }
    }
  }

  a {
    color: $color-blue-2;
    transition: color 0.5s;
    font-weight: 500;

    &:hover {
      color: $color-gold-3;
    }
  }
}
</style>
