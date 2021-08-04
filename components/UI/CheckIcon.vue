<template>
  <i v-if="status" :class="classes" :style="{ color }" />
</template>

<script>
export default {
  props: {
    status: String
  },
  computed: {
    classes() {
      switch (this.status) {
        case "loading":
          return "fas fa-circle-notch fa-spin";
        case "available":
          return "fas fa-check";
        case "taken":
          return "fas fa-times";
        default:
          return null;
      }
    },
    color() {
      switch (this.status) {
        case "loading":
          return "#000";
        case "available":
          return "#007bff";
        case "taken":
          return "#FF0000";
        default:
          return null;
      }
    }
  }
};
</script>
