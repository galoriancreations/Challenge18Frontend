<template>
  <div :class="classes">
    <div v-for="tab in tabs" :key="tab.id" class="side-tabs__tab">
      <input
        type="radio"
        :id="tab.id"
        :value="tab.value"
        :checked="selectedTab === tab.value"
        @change="$emit('change', tab.value)"
      />
      <label :for="tab.id">{{ tab.label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "selectedTab",
    event: "change"
  },
  props: {
    selectedTab: [Number, String],
    tabs: Array,
    tabletCols: {
      type: Number,
      default: 4
    },
    mobileCols: {
      type: Number,
      default: 3
    }
  },
  computed: {
    classes() {
      return {
        "side-tabs": true,
        [`side-tabs--tb-${this.tabletCols}`]: true,
        [`side-tabs--mb-${this.mobileCols}`]: true
      };
    }
  }
};
</script>

<style lang="scss">
.side-tabs {
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
    grid-template-columns: repeat(4, 1fr);
  }

  @include respond(mobile-land) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include respond(mobile) {
    margin-bottom: 3rem;
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

    &:not(:nth-child(4n)) {
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

    &:nth-child(4n + 1):nth-last-child(-n + 4),
    &:nth-child(4n + 1):nth-last-child(-n + 4) ~ & {
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
}

.challenge-editor__content[style="direction: rtl;"] .side-tabs {
  &__tab {
    &:not(:nth-child(4n)) {
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
</style>
