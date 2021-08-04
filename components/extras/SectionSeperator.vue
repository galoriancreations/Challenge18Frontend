<template>
  <div class="section-seperator" />
</template>

<style lang="scss">
@import "@/assets/sass/base.scss";

.section-seperator {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 9rem auto;

  @include respond(mobile) {
    margin: 6rem auto;
  }
}
</style>
