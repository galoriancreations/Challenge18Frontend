<template>
  <div class="chatbot-placeholder">
    <div class="chatbot-placeholder__icon">
      <img
        src="../../assets/images/logos/chatbot-placeholder.png"
        alt="Chatbot icon"
      />
    </div>
    <div class="chatbot-placeholder__text">
      <p>Hi, I'm your personal assistant. How can I help you?</p>
    </div>
  </div>
</template>

<style lang="scss">
.chatbot-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon {
    width: 10rem;
    height: 10rem;
    background-color: #e8ecef;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;

    @include respond(mobile) {
      width: 7rem;
      height: 7rem;
    }
    
    img {
      width: 15rem;
      height: 15rem;

      @include respond(mobile) {
        width: 10rem;
        height: 10rem;
      }
    }
  }

  &__text {
    p {
      font-size: 2rem;
      font-weight: 500;
      color: #495057;

      @include respond(mobile) {
        font-size: 1.5rem;
      }
    }
  }

  @include respond(mobile) {
    flex-direction: column;
    width: 80%;
    padding: 2rem;
    text-align: center;
  }
}
</style>
