<template>
  <div class="chatbot-no-messages">
    <div class="chatbot-no-messages__icon">
      <img
        src="../../assets/images/logos/chatbot-icon.png"
        alt="Chatbot icon"
      />
    </div>
    <div class="chatbot-no-messages__text">
      <p>Hi, I'm your personal assistant.<br />How can I help you?</p>
    </div>
  </div>
</template>

<style lang="scss">
.chatbot-no-messages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 30rem;

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

      @include respond(tablet) {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
