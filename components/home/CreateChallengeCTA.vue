<template>
  <ColoredSection class="create-challenge-cta">
    <h2 class="create-challenge-cta__title">
      Try our advanced Challenge Editor
    </h2>
    <div class="create-challenge-cta__video">
      <video autoplay muted loop playsinline ref="video">
        <source src="../../assets/videos/challenge-editor.mp4" />
      </video>
    </div>
    <BaseButton variant="blue" link="/challenge-editor">
      Create your own challenge
    </BaseButton>
  </ColoredSection>
</template>

<script>
export default {
  mounted() {
    this.$refs.video?.play();
  }
};
</script>

<style lang="scss">
.create-challenge-cta {
  &__title {
    text-align: center;
    font-weight: 700;
    font-size: 3.6rem;
    color: $color-blue-2;
    max-width: 55rem;
    margin: auto;
    margin-bottom: 6rem;
    line-height: 1.3;

    @include respond(mobile) {
      font-size: 2.7rem;
      margin-bottom: 4rem;
    }
  }

  &__video {
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    overflow: hidden;
    position: relative;
    margin-bottom: 7rem;

    @include respond(mobile) {
      margin-bottom: 4rem;
    }
  }

  video {
    width: 100%;
  }

  .button {
    width: 100%;
    max-width: 37.5rem;
  }
}
</style>
