<template>
  <div class="how-to-play__video">
    <youtube videoId="YBW3yiNmKLU" />
  </div>
</template>

<style lang="scss">
.how-to-play {
  &__video {
    border-radius: 0.8rem;
    overflow: hidden;
    box-shadow: $boxshadow2;
    width: 100%;
    max-width: 70rem;
    height: 40rem;
    margin: auto;
    margin-bottom: 9rem;

    @include respond(mobile-land) {
      height: 60vw;
      min-height: 25rem;
    }

    @include respond(mobile) {
      margin-bottom: 6rem;
    }

    iframe {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
