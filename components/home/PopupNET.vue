<template>
  <div class="dashboard-modal">
    <div :class="classes">
      <div class="modal__wrapper" ref="wrapper">
        <div
          class="modal__container"
          
        >
          <vue-scroll v-if="scrollbar">
            <div
              class="modal__content"
              :style="{ minHeight: contentMinHeight }"
            >
              <SectionHeading v-if="title" small>{{ title }}</SectionHeading>
              <slot />
            </div>
          </vue-scroll>
          <div v-else class="modal__content">
            <SectionHeading v-if="title" small>{{ title }}</SectionHeading>
            <slot />
          </div>
        </div>
      </div>
      <div class="modal__backdrop"/>

    </div>
  </div>
</template>

<script>

export default {
  props: {
    active: Boolean,
    title: String,
    scrollbar: {
      type: Boolean,
      default: true
    },
    dismissable: {
      type: Boolean,
      default: true
    },
    height: String
  },
  data() {
    return {
      containerHeight: null,
      contentMinHeight: null
    };
  },
  computed: {
    classes() {
      return {
        modal: true,
        active: this.active
      };
    }
  },
  methods: {
    adjustContainerHeight() {
      if (this.scrollbar) {
        this.containerHeight =
          this.height || `${this.$refs.wrapper.offsetHeight}px`;
        this.contentMinHeight = this.containerHeight;
      }
    },
  },
  mounted() {
    this.adjustContainerHeight();
  },
};
</script>

<style lang="scss">
.dashboard-modal {
  white-space:pre-wrap;
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 $padding-sides-mobile;

    &__wrapper {
      position: relative;
      // max-height: 85vh;
      width: 100%;
      max-width: 70rem;
    }

    &__container {
      position: relative;
      top: initial;
      left: initial;
      transform: scale(0);
      width: 100%;
      max-width: 100%;
      padding: 0;
      // height: 100%;
      // overflow: auto;
      box-shadow: $boxshadow1;
    }

    &.active .modal__container {
      transform: scale(1);
    }

    &__content {
      padding: 4rem;
      position: relative;
      // height: 100%;

      @include respond(mobile) {
        padding: 3rem 2rem;
      }
    }

    &__backdrop {
      background-color: rgba(#000, 0.6);
    }
  }
}
</style>
