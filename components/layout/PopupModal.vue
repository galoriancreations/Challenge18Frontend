<template>
  <div class="dashboard-modal">
    <div :class="classes">
      <div class="modal__wrapper" ref="wrapper">
        <div
          class="modal__container"
          :style="{ height: scrollbar ? containerHeight : null }"
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
      <div class="modal__backdrop" @click="closeModal" />
    </div>
  </div>
</template>

<script>
import { isTouchDevice } from "~/assets/util/functions";

export default {
  props: {
    active: Boolean,
    title: String,
    scrollbar: {
      type: Boolean,
      default: true
    }
  },
  inject: ["closeModal"],
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
      this.containerHeight = `${this.$refs.wrapper.offsetHeight}px`;
      this.contentMinHeight = this.containerHeight;
    }
  },
  mounted() {
    if (this.scrollbar) {
      this.adjustContainerHeight();
    }
  },
  watch: {
    active(value) {
      document.querySelector("html").style.overflow =
        value && isTouchDevice() ? "hidden" : null;
    }
  }
};
</script>

<style lang="scss">
.dashboard-modal {
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 $padding-sides-mobile;

    &__wrapper {
      position: relative;
      max-height: 85vh;
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
      height: 100%;
      overflow: auto;
      box-shadow: $boxshadow1;
    }

    &.active .modal__container {
      transform: scale(1);
    }

    &__content {
      padding: 4rem;
      position: relative;

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
