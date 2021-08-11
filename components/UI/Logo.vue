<template>
  <NuxtLink to="/">
    <img
      class="logo"
      src="../../assets/images/logo18-1.png"
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
  height: 10rem;
  width: auto;
  transition: height 0.5s;

  @include respond(mobile) {
    height: 8rem;
  }
}

.header.sticky .logo {
  height: 7rem;

  @include respond(mobile) {
    height: 6rem;
  }
}
</style>
