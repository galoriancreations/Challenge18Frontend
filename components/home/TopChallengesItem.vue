<template>
  <div class="top-challenges__item" v-on="$listeners">
    <img :src="challenge.image" :alt="challenge.title" />
  </div>
</template>

<script>
export default {
  props: {
    challenge: Object
  }
};
</script>

<style lang="scss">
.top-challenges {
  &__item {
    display: block;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: all 0.5s;
    }

    &:hover::after {
      background-color: rgba($color-azure, 0.4);
    }

    @include respond(mobile) {
      max-width: 25rem;
      margin: auto;
    }

    img {
      width: 100%;
      display: block;
    }
  }

  &__title {
    color: $color-blue-2;
    font-size: 3.5rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }
  }

  &__text {
    p {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
