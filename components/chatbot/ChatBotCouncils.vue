<template>
  <section class="chatbot__council">
    <div class="chatbot__council-container">
      <div class="chatbot__council-container-image">
        <img
          :src="require('assets/images/chatbot/chatbot.png')"
          alt="Chatbot"
        />
      </div>
      <div class="chatbot__council-container-text">
        <h3>Choose a council:</h3>
        <h4>
          Please choose a council to chat with. You can ask them any questions
          you have about the council.
        </h4>
      </div>
      <div class="chatbot__council-container-councils">
        <div
          class="chatbot__council-container-councils-council"
          :class="{ active: activeCouncil.id === council.id }"
          v-for="council in councils"
          :key="council.id"
          @click="selectCouncil(council)"
        >
          <img :src="council.image" alt="Council" />
          <h4>{{ council.name }}</h4>
          <p>{{ council.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['loading'],
  props: {
    councils: {
      type: Array,
      required: true,
    },
    activeCouncil: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async selectCouncil(council) {
      this.$emit('loading', true);
      this.$cookies.set('selectedCouncil', council);
      await this.$store.dispatch('chatbot/selectCouncil', council);
      this.$emit('loading', false);
    },
  },
};
</script>

<style lang="scss">
.chatbot__council {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  margin-bottom: 2rem;

  @include respond(mobile) {
    padding: 1rem;
  }

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;

    @include respond(mobile) {
      flex-direction: column;
    }

    &-image {
      width: 10rem;
      height: 10rem;
      margin-right: 2rem;

      @include respond(mobile) {
        margin-right: 0;
        margin-bottom: 1rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-text {
      h3 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      h4 {
        font-size: 1.6rem;
        font-weight: 400;
        color: $color-gray-5;
      }
    }
  }

  &-container-image {
    width: 10rem;
    height: 10rem;
    margin-right: 2rem;

    @include respond(mobile) {
      margin-right: 0;
      margin-bottom: 1rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &-container-councils {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 2rem;

    @include respond(mobile) {
      flex-direction: column;
    }

    &-council {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25rem;
      height: 25rem;
      margin: 1rem;
      padding: 2rem;
      background-color: #fff;
      border-radius: 0.5rem;
      box-shadow: $boxshadow2;
      transition: all 0.2s ease-in-out;

      @include respond(tablet) {
        width: 100%;
        height: auto;
        margin: 1rem auto;
      }

      img {
        width: 10rem;
        height: 10rem;
        margin-bottom: 1rem;
        border-radius: 50%;
      }

      h4 {
        text-align: center;
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      p {
        text-align: center;
        font-size: 1.4rem;
        font-weight: 400;
        color: $color-gray-5;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &:hover {
        cursor: pointer;
        box-shadow: $boxshadow1;
        background-color: $color-grey-1;
      }

      &.active {
        box-shadow: $boxshadow1;
        background-color: $color-grey-2;
      }
    }
  }
}
</style>
