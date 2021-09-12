<template>
  <div class="notifications">
    <component
      :is="isMounted ? 'TransitionGroup' : 'div'"
      class="notifications__wrapper"
      name="notification"
    >
      <component
        v-for="item in items"
        :key="item.id"
        :is="item.component || 'Notification'"
        v-bind="item.props || item"
        @dismiss="removeNotification(item.id)"
      />
    </component>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  inject: ["removeNotification"],
  data() {
    return {
      isMounted: false
    };
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
.notifications {
  position: fixed;
  bottom: 3rem;
  left: 3rem;
  z-index: 10;

  @include respond(mobile) {
    bottom: 1.5rem;
    left: 1.5rem;
    width: calc(100% - 3rem);
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > *:not(:last-child) {
      margin-bottom: 1.5rem;

      @include respond(mobile) {
        margin-bottom: 1rem;
      }
    }
  }
}

.notification-enter,
.notification-leave-to {
  transform: translateX(-200%);
}

.notification-enter-to,
.notification-leave-from {
  transform: translateX(0);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s;
}

.notification-leave-active {
  position: absolute;
}

.notification-move {
  transition: transform 0.4s;
}
</style>
