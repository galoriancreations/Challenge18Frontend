<template>
  <div class="section-seperator" />
</template>

<style lang="scss">
.section-seperator {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 9rem auto;

  @include respond(mobile) {
    margin: 6rem auto;
  }
}

.editor .section-seperator {
  margin: 8.5rem 0 9.5rem;

  @include respond(mobile) {
    margin: 6rem 0;
  }
}
</style>
