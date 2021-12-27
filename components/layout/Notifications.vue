<template>
  <div class="notifications">
    <TransitionGroup
      tag="div"
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
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  inject: ["removeNotification"]
};
</script>

<style lang="scss">
.notifications {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 16;

  @include respond(mobile) {
    bottom: 1rem;
    left: 1rem;
    width: calc(100% - 2rem);
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
