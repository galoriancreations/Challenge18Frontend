<template>
    <Popup class="confirm-modal" :active="active" :scrollbar="true">
      <div class="confirm-modal__text">
        <p >
          {{ text }}
        </p>
      </div>
      <br>
      <br>
      <br>
      <div class="confirm-modal__buttons">
        <input type="checkbox" v-model="confirm" class="confirm-modal__input">
        <p> I have read and agree to the Terms and Conditions outlined above.</p>
        <BaseButton variant="blue" @click="confirmHandler" v-if="confirm">
          confirm
        </BaseButton>
        <BaseButton disabled="true" variant="blue" v-else="confirm">
          confirm
        </BaseButton>
      </div>
    </Popup>
  </template>
  
  <script>
  export default {
    data(){
        return{
            confirm:false
        }
    },
    props: {
      active: Boolean,
      text: String
    },
    emits: ["confirm"],
    inject: ["closeModal"],
    computed: {
      confirmText() {
        return this.text.split("\n");
      }
    },
    methods: {
      confirmHandler() {
        this.closeModal();
      },
    }
  };
  </script>
  
  <style lang="scss">
  .confirm-modal {
    .modal__wrapper {
      max-width: 65rem !important;
    }
  
    &__text {
      margin-bottom: 2.5rem;
  
      p {
        &:not(:last-child) {
          margin-bottom: 1.5rem;
        }
      }
    }
  
    &__buttons {
      display: flex;
      background-color: white;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 0px;
      padding: 30px;
  
      @include respond(mobile) {
        flex-direction: column;
      }
  
      & > * {
        margin: 0;
  
        &:not(:last-child) {
          margin-right: 2.5rem;
  
          @include respond(mobile) {
            margin: auto;
            margin-bottom: 1rem;
          }
        }
      }
    }
    &__input {
        scale: 3;
    }
  }
  </style>
  