<template>
  <FloatingNote v-if="showNote" class="auto-save-note">
    <strong>Last auto-save:</strong>
    <span>{{ text }}</span>
    <i :class="iconClasses" />
  </FloatingNote>
</template>

<script>
import moment from "moment";

export default {
  props: {
    date: Date,
    saving: Boolean,
    error: Boolean
  },
  computed: {
    showNote() {
      return !!this.date || this.error;
    },
    text() {
      return this.date ? moment(this.date).format("lll") : "Failed to save";
    },
    iconClasses() {
      return {
        "auto-save-note__icon": true,
        fas: true,
        "fa-check": !this.error && !this.saving,
        "fa-times": this.error && !this.saving,
        "fa-circle-notch": this.saving,
        "fa-spin": this.saving
      };
    }
  }
};
</script>

<style lang="scss">
.auto-save-note {
  animation: fadeFromLeft 0.5s;

  strong {
    margin-right: 0.5rem;

    @include respond(mobile) {
      display: block;
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
  }

  &__icon {
    margin-left: 0.75rem;
    width: 1.5rem;

    @include respond(mobile) {
      margin-left: 0.25rem;
    }

    &.fa-check {
      color: $color-azure;
    }

    &.fa-times {
      color: $color-danger;
    }
  }
}

@keyframes fadeFromLeft {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
