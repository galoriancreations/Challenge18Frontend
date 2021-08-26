<template>
  <NuxtLink to="/" class="header__nav-link">
    <img
      class="logo"
      src="../../assets/images/new-logo.png"
      @click="closeNav"
    />
  </NuxtLink>
</template>

<script>
export default {
  inject: ["closeNav"]
};
</script>

<style lang="scss">
.logo {
  height: 8.5rem;
  width: auto;
  transition: all 0.5s;

  @include respond(mobile) {
    height: 6.5rem;
    transition: all 0.3s;
  }
}

.header.sticky .logo {
  height: 6.25rem;

  @include respond(mobile) {
    height: 5.25rem;
  }
}
</style>
