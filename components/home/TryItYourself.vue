<template>
  <ColoredSection class="try-it-yourself">
    <SectionHeading small>
      Try It Yourself
    </SectionHeading>
    <p class="try-it-yourself__text">
      Using our advanced
      <strong>Challenge Editor</strong>, you can start your own challenge by
      choosing from our rich collection of templates, or by building a new
      template from scratch. Any challenge you create will be automatically
      integrated with WhatsApp.
    </p>
    <div class="try-it-yourself__video">
      <video autoplay muted loop playsinline ref="video">
        <source src="../../assets/videos/challenge-editor.mp4" />
      </video>
    </div>
    <BaseButton variant="blue" @click="openModal">
      Create your own challenge
    </BaseButton>
  </ColoredSection>
</template>

<script>
import popupModal from "~/mixins/popup-modal";

export default {
  mixins: [popupModal],
  inject: ["openModal"],
  mounted() {
    this.$refs.video?.play();
  }
};
</script>

<style lang="scss">
.try-it-yourself {
  &__text {
    text-align: center;
    font-size: 1.8rem;
    line-height: 1.7;
    max-width: 90rem;
    margin: auto;
    margin-bottom: 6.5rem;

    @include respond(mobile) {
      font-size: 1.55rem;
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
