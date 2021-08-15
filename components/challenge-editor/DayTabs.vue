<template>
  <div class="challenge-editor__tabs-list">
    <div
      v-for="day in days"
      :key="options[day - 1].id"
      class="challenge-editor__tab"
    >
      <input
        type="radio"
        :id="`day${day}`"
        :value="day"
        :checked="selectedDay === day"
        @change="$emit('change', day)"
      />
      <label :for="`day${day}`">{{ dayLabel }} {{ day }}</label>
    </div>
  </div>
</template>

<script>
import { numbersArray } from "../../assets/util/functions";

export default {
  model: {
    prop: "selectedDay",
    event: "change"
  },
  props: {
    selectedDay: Number
  },
  inject: ["options", "getDayLabel"],
  computed: {
    days() {
      return numbersArray(this.options.length);
    },
    dayLabel() {
      return this.getDayLabel();
    }
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__tabs-list {
    box-shadow: $boxshadow2;
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    position: relative;
    background-color: rgba(#eee, 0.5);
    margin-bottom: 3.5rem;

    @include respond(desktop) {
      border-radius: 0.8rem;
    }

    @include respond(tablet) {
      grid-template-columns: repeat(6, 1fr);
    }

    @include respond(mobile-land) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond(mobile) {
      margin-bottom: 3rem;
    }
  }

  &__tab {
    @include respond(tablet) {
      border-bottom: 0.1rem solid #ccc;
    }

    &:not(:last-child) {
      @include respond(desktop) {
        border-bottom: 0.1rem solid #ccc;
      }
    }

    &:not(:nth-child(6n)) {
      @include respond(tablet) {
        border-right: 0.1rem solid #ccc;
      }

      @include respond(mobile-land) {
        border-right: none;
      }
    }

    &:not(:nth-child(3n)) {
      @include respond(mobile-land) {
        border-right: 0.1rem solid #ccc;
      }
    }

    &:nth-child(6n + 1):nth-last-child(-n + 6),
    &:nth-child(6n + 1):nth-last-child(-n + 6) ~ & {
      @include respond(tablet) {
        border-bottom: none;
      }

      @include respond(mobile-land) {
        border-bottom: 0.1rem solid #ccc;
      }
    }

    &:nth-child(3n + 1):nth-last-child(-n + 3),
    &:nth-child(3n + 1):nth-last-child(-n + 3) ~ & {
      @include respond(mobile-land) {
        border-bottom: none !important;
      }
    }

    input {
      display: none;
    }

    label {
      display: block;
      cursor: pointer;
      width: 100%;
      height: 100%;
      border: 0.3rem solid transparent;
      padding: 1.5rem;
      text-align: center;
      font-weight: 600;
      font-size: 1.8rem;
      background-color: #fff;
      transition: all 0.5s;
      position: relative;

      @include respond(mobile) {
        font-size: 1.6rem;
      }

      &:hover {
        background-color: rgba($color-azure-light, 0.8);
        z-index: 1;
      }
    }

    &:first-child label {
      @include respond(desktop) {
        border-radius: 0.8rem 0.8rem 0 0;
      }
    }

    &:last-child label {
      @include respond(desktop) {
        border-radius: 0 0 0.8rem 0.8rem;
      }
    }

    &:first-child:last-child label {
      @include respond(desktop) {
        border-radius: 0.8rem;
      }
    }

    input:checked + label {
      background-color: rgba($color-azure-light, 0.8);
      border-color: $color-azure;
      z-index: 1;
    }
  }

  &__layout[style="direction: rtl;"] {
    .challenge-editor__tab {
      &:not(:nth-child(6n)) {
        border-right: none;

        @include respond(tablet) {
          border-left: 0.1rem solid #ccc;
        }

        @include respond(mobile-land) {
          border-left: none;
        }
      }

      &:not(:nth-child(3n)) {
        border-right: none;

        @include respond(mobile-land) {
          border-left: 0.1rem solid #ccc;
        }
      }
    }
  }
}
</style>
