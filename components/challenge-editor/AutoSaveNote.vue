<template>
  <Notification class="auto-save-note" :dismissable="false">
    <p>
      <strong>Last auto-save:</strong>
      <span>{{ text }}</span>
      <i :class="iconClasses" />
    </p>
  </Notification>
</template>

<script>
import moment from "moment";

export default {
  props: {
    date: Date,
    loading: Boolean,
    error: Boolean
  },
  computed: {
    text() {
      return this.date ? moment(this.date).format("lll") : "Failed to save";
    },
    iconClasses() {
      return {
        "auto-save-note__icon": true,
        fas: true,
        "fa-check": !this.error && !this.loading,
        "fa-times": this.error && !this.loading,
        "fa-circle-notch": this.loading,
        "fa-spin": this.loading
      };
    }
  }
};
</script>

<style lang="scss">
.auto-save-note {
  @include respond(mobile) {
    width: fit-content !important;
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
  }
}
</style>
