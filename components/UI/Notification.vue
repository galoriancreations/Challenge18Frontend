<template>
  <div class="notification">
    <div class="notification__content">
      <slot />
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
    }
  }
};
</script>

<style lang="scss">
.notification {
  box-shadow: $boxshadow2;
  border-radius: 0.8rem;
  padding: 1.5rem 2rem;
  background-color: #fff;
  font-size: 1.5rem;
  line-height: 1.6;
  position: relative;
  overflow: hidden;

  @include respond(mobile) {
    font-size: 1.35rem;
    text-align: center;
  }

  &__content {
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
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color-azure-light, 0.6);
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s;
  }

  &:hover &__close {
    visibility: visible;
    opacity: 1;
  }
}
</style>
