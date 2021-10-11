<template>
  <component
    :is="component"
    :class="classes"
    :style="{ animation }"
    v-bind="$attrs"
    v-waypoint="{ active: true, callback: onWaypoint, options }"
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
      default: 700
    },
    delay: {
      type: Number,
      default: 0
    },
    offset: {
      type: Array,
      default() {
        return [0.25, 0.75];
      }
    }
  },
  data() {
    return {
      visible: false,
      animation: null
    };
  },
  computed: {
    options() {
      return {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: this.offset
      };
    },
    classes() {
      return {
        "animated-item": true,
        "animated-item--visible": this.visible
      };
    }
  },
  methods: {
    onWaypoint({ going }) {
      if (going === this.$waypointMap.GOING_IN) {
        this.animation = `${this.type} ${this.duration / 1000}s`;
        if (this.delay) {
          this.animation += ` ${this.delay / 1000}s`;
        }
        setTimeout(() => {
          this.visible = true;
        }, this.delay);
      }
    }
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
