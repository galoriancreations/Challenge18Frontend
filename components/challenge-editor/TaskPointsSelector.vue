<template>
  <div class="task-form__points-selector">
    <label class="task-form__selector-label">Awarded points</label>
    <NumberInput
      v-model="task.points"
      :min="1"
      :max="18"
      :center="true"
      size="large"
      :disabled="!task.isBonus"
      inline
      controls
    />
  </div>
</template>

<script>
import NumberInput from "@chenfengyuan/vue-number-input";

export default {
  components: { NumberInput },
  inject: ["task"]
};
</script>

<style lang="scss">
.task-form {
  &__points-selector {
    text-align: center;

    .number-input {
      input {
        font-family: inherit;
        font-size: 1.6rem !important;
        transition: border-color 0.4s !important;

        @include respond(mobile) {
          font-size: 1.5rem !important;
        }

        &:focus {
          border-color: $color-azure !important;
        }
      }

      button {
        transition: all 0.5s;

        &:not(:disabled) {
          cursor: pointer;

          &:hover {
            background-color: rgba($color-azure-light, 0.8);

            &::before,
            &::after {
              background-color: #111 !important;
            }
          }
        }

        &:disabled {
          cursor: initial;
        }

        &::before {
          width: 1.45rem !important;

          @include respond(mobile) {
            width: 1.4rem !important;
          }
        }

        &::after {
          height: 1.45rem !important;

          @include respond(mobile) {
            height: 1.4rem !important;
          }
        }
      }
    }
  }
}
</style>
