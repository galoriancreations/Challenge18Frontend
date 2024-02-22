<template>
  <NuxtLink to="/">
    <img
      class="logo"
      :src="this.s3AssetsGenerator('images/new-logo.png')"
      @click="closeNav"
    />
  </NuxtLink>
</template>

<script>
import s3AssetsMixin from '~/mixins/s3AssetsMixin';

export default {
  mixins: [ s3AssetsMixin ],
  inject: ["closeNav"]
};
</script>

<style lang="scss">
.logo {
  height: 8.5rem;
  width: auto;
  transition: all 0.4s;

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
