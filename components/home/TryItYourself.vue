<template>
  <ColoredSection class="try-it-yourself">
    <SectionHeading small>
      Try It Yourself
    </SectionHeading>
    <p class="try-it-yourself__text">
      Using our advanced
      <strong>Challenge Editor</strong>, you can start your own challenge by
      choosing from our rich collection of templates, customize any template to
      your needs, or build a new template from scratch. Any challenge you create
      will be automatically integrated with WhatsApp.
    </p>
    <div class="try-it-yourself__video">
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
.try-it-yourself {
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

  &__text {
    text-align: center;
    font-size: 1.9rem;
    max-width: 90rem;
    margin: auto;
    margin-bottom: 6.5rem;

    @include respond(mobile) {
      font-size: 1.65rem;
      margin-bottom: 4.5rem;
    }

    strong {
      font-weight: 600;
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
