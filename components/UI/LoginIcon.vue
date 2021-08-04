<template>
  <NuxtLink :to="link" class="header__login">
    <i class="far fa-user" @click="closeNav" />
  </NuxtLink>
</template>

<script>
export default {
  inject: ["closeNav"],
  computed: {
    link() {
      return this.$store.getters.isAuth ? "/dashboard" : "/login";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.header {
  &__login {
    display: none;
    color: #fff;
    transition: all 0.5s;
    font-size: 2.4rem;

    @include respond(tablet) {
      display: block;
    }
  }

  &.sticky:not(.active) &__login {
    color: #000;
  }
}
</style>
