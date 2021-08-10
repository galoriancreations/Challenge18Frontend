<template>
  <FloatingNote v-if="showNote" class="auto-save-note">
    <strong>Last auto-save:</strong>
    <span>{{ text }}</span>
    <i v-if="showIcon" :class="iconClasses" />
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
    showIcon() {
      return !!this.date || this.saving || this.error;
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
@import "@/assets/sass/base.scss";

.auto-save-note {
  font-size: 1.5rem;
  text-align: center;
  animation: fadeFromLeft 0.5s;

  @include respond(mobile) {
    font-size: 1.35rem;
  }

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

    &.fa-circle-notch {
      color: #ccc;
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
