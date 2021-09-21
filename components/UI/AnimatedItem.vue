<template>
  <component
    :is="component"
    :class="classes"
    :style="{ animation }"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    component: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      default: "zoomIn"
    },
    duration: {
      type: Number,
      default: 600
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      animation: null
    };
  },
  computed: {
    classes() {
      return {
        "animated-item": true,
        "animated-item--visible": this.visible
      };
    }
  },
  mounted() {
    require("waypoints/lib/noframework.waypoints.min.js");
    setTimeout(() => {
      new Waypoint({
        element: this.$el,
        handler: () => {
          this.animation = `${this.type} ${this.duration / 1000}s`;
          if (this.delay) {
            this.animation += ` ${this.delay / 1000}s`;
          }
          setTimeout(() => {
            this.visible = true;
          }, this.delay);
        },
        offset: "90%"
      });
    }, 100);
  }
};
</script>

<style lang="scss">
.animated-item {
  opacity: 0;
  visibility: hidden;

  &--visible {
    opacity: 1;
    visibility: visible;
  }
}
</style>
