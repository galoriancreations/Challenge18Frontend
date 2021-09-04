<template>
  <div class="how-to-play__video">
    <video autoplay muted loop playsinline ref="video">
      <source src="../../assets/videos/whatsapp-recording.mp4" />
    </video>
  </div>
</template>

<style lang="scss">
.how-to-play {
  &__video {
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    width: fit-content;
    max-width: 100%;
    margin: auto;
    margin-bottom: 9rem;
    overflow: hidden;

    @include respond(mobile) {
      margin-bottom: 6rem;
    }

    video {
      display: block;
    }
  }
}
</style>
