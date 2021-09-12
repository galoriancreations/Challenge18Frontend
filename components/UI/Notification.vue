<template>
  <div class="notification">
    <div class="notification__content">
      <p v-if="html" v-html="html" />
      <slot v-else />
    </div>
    <div v-if="dismissable" class="notification__close">
      <IconButton type="close" @click="$emit('dismiss')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dismissable: {
      type: Boolean,
      default: true
    },
    html: String
  }
};
</script>

<style lang="scss">
.notification {
  box-shadow: $boxshadow2;
  border-radius: 0.8rem;
  background-color: #fff;
  font-size: 1.5rem;
  line-height: 1.6;
  display: flex;
  position: relative;
  overflow: hidden;

  @include respond(mobile) {
    font-size: 1.35rem;
    text-align: center;
  }

  &__content {
    padding: 1.5rem 2rem;
    max-width: 45rem;

    @include respond(mobile) {
      padding: 1.2rem;
    }

    & > p {
      font-size: inherit;

      &:not(:last-child) {
        margin-bottom: 1.5rem;

        @include respond(mobile) {
          margin-bottom: 1rem;
        }
      }
    }
  }

  &__close {
    width: 3.5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color-azure-light, 0.6);
    transition: all 0.5s;

    @media (hover: hover) {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      visibility: hidden;
      opacity: 0;
    }

    @include respond(mobile) {
      width: 3rem;
    }
  }

  &:hover &__close {
    visibility: visible;
    opacity: 1;
  }
}
</style>
