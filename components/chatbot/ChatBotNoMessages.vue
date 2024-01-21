<template>
  <section class="chatbot-no-messages">
    <div class="chatbot-no-messages__description">
      <div class="chatbot-no-messages__description-icon">
        <img :src="council.image" :alt="council.name" />
      </div>
      <div class="chatbot-no-messages__description-text">
        <h5>{{ council.name || "Hi, I'm your personal assistant." }}</h5>
        <p>{{ council.text || 'How can I help you?' }}</p>
      </div>
    </div>
    <div class="chatbot-no-messages-conversations">
      <div
        v-for="conversation in council.conversations"
        @click="$emit('sendMessage', conversation)"
      >
        {{ conversation }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['sendMessage'],
  props: {
    councils: [],
  },
  computed: {
    council() {
      const council = this.$store.getters['chatbot/council'];
      return (
        this.councils.find((c) => c.id === council?.id) || this.councils[0]
      );
    },
  },
};
</script>

<style lang="scss">
.chatbot-no-messages {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  
  &__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    
    &-icon {
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
        border-radius: 50%;

        @include respond(mobile) {
          width: 10rem;
          height: 10rem;
        }
      }
    }

    &-text {
      h5 {
        font-size: 2rem;
        font-weight: 500;
        color: #495057;

        @include respond(mobile) {
          font-size: 1.75rem;
        }
      }

      p {
        font-size: 1.5rem;
        font-weight: 400;
        color: #495057;

        @include respond(mobile) {
          font-size: 1.25rem;
        }
      }
    }
  }
  &-conversations {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    div {
      width: 40%;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      background-color: #e8ecef;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-size: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;


      &:hover {
        background-color: #dee2e6;
      }

      @include respond(tablet) {
        width: 100%;
      }
    }
  }
}
</style>
