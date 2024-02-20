<template>
    <div class="legalAi-modal">
        <div class="modal__wrapper" ref="wrapper" :class="classes">
          <div
            class="modal__container"
            :style="{ height: scrollbar ? containerHeight : null }"
          >
            <div v-if="scrollbar">
              <div
                class="modal__content"
                :style="{ minHeight: contentMinHeight }"
              >
                <SectionHeading v-if="title" small>{{ title }}</SectionHeading>
                <slot />
              </div>
            </div>
            <div v-else class="modal__content">
              <SectionHeading v-if="title" small>{{ title }}</SectionHeading>
              <slot />
            </div>
          </div>
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
  .legalAi-modal {
    ::-webkit-scrollbar {
    width: 15px;
    
    }
    /* Track */
    // ::-webkit-scrollbar-track {
    //   background: #f1f1f1; 
    // }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(56, 162, 255); 
        height: 10%;
        border-radius: 50px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(1, 112, 231); 
    }
    white-space:pre-wrap;
    z-index: 0;
    position: relative;
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
    //   padding: 0 $padding-sides-mobile;
  
      &__wrapper {
        position: relative;
        max-height: 85vh;
        width: 100%;
        max-width: 70rem;
        margin: auto;
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
        height: 100%;
  
        @include respond(mobile) {
          padding: 3rem 2rem;
        }
      }
  
      &__backdrop {
        background-color: rgba(#000, 0.6);
      }
    }
  }
//   .__bar-is-vertical{
//     cursor: pointer;
//     position: absolute;
//     margin: auto;
//     transition: opacity 0.5s ease 0s;
//     user-select: none;
//     border-radius: inherit;
//     height: 10.30281%;
//     background: rgb(0, 12, 102);
//     width: 15px;
//     opacity: 0;
//     transform: translateY(0%);
//     left: 0px;
//     right: 0px;
//   }

  </style>
  