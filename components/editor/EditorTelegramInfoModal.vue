<template>
  <PopupModal
    title="Integration Steps"
    :active="active"
    class="editor-telegram-info-modal new-challenge-modal create-challenge"
    :scrollbar="false"
  >
    <agile
      :options="sliderOptions"
      class="editor-telegram-info-modal__slider"
      ref="carousel"
    >
      <div
        class="editor-telegram-info-modal__slider__item"
        v-for="(slide, index) in sliders"
        :key="index"
      >
        <h3>{{ `${index + 1}: ${slide}` }}</h3>
      </div>
    </agile>

    <base-button
      variant="blue"
      @click="$refs.carousel.goToPrev()"
      title="Back"
      class="editor-telegram-info-modal__base-button-info"
      >Previous</base-button
    >
    <base-button
      variant="blue"
      @click="$refs.carousel.goToNext()"
      title="Next"
      class="editor-telegram-info-modal__base-button-info"
      >Next</base-button
    >
  </PopupModal>
</template>

<script>
export default {
  emits: ['toggleInfoModel'],
  props: {
    active: Boolean,
  },
  inject: ['closeModal'],
  data() {
    return {
      sliders: [
        'Generate an invite link for your group on Ting Global.',
        'Create a group on Telegram.',
        'Add the Ting Global bot to the Telegram group.',
        'In the Telegram group, send the command `/connect` followed by the invite link for Ting Global.',
        'Go to the Ting Global group and confirm the connection with Telegram using the command `/telegram followed by the link to the Telegram group.`',
        'Return to the Telegram group and finish the process using the command `/activate` with links for Ting Global and Telegram groups.',
      ],
      sliderOptions: {
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        navButtons: false,
        dots: true,
      },
    };
  },
  // this is a workaround for the modal not closing when clicking outside of it
  //   mounted() {
  //     this.clickHandler = (e) => {
  //       if (e.target.classList.contains('modal__backdrop')) {
  //         if (this.active) {
  //           this.$emit('toggleInfoModel');
  //         } else {
  //             console.log('not active');
  //         }
  //       }
  //     };
  //     window.addEventListener('click', this.clickHandler);
  //   },
  //   unmounted() {
  //     window.removeEventListener('click', this.clickHandler);
  //   },
};
</script>

<style lang="scss">
.editor-telegram-info-modal {
  &__slider {
    margin: 1rem 0;
  }

  &__base-button-info {
    display: inline-block;
  }
}
</style>
