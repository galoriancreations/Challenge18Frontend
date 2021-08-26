<template>
  <li
    :class="classes"
    @click="clickHandler"
    @mouseenter="openDropdownOnDesktop"
    @mouseleave="closeDropdownOnDesktop"
    @keydown.enter="enterKeyHandler"
    @keydown.esc="closeDropdownOnDesktop"
  >
    <NuxtLink
      v-if="link"
      :to="link"
      activeClass="active"
      exact
      :class="linkClasses"
    >
      {{ text }}
      <i v-if="dropdown" class="fas fa-chevron-down" />
    </NuxtLink>
    <button v-else :class="linkClasses">
      {{ text }}
      <i v-if="dropdown" class="fas fa-chevron-down" />
    </button>
    <nav
      v-if="dropdown"
      class="header__nav-dropdown"
      :style="{ maxHeight: dropdownMaxHeight }"
      ref="dropdown"
    >
      <ul class="header__nav-dropdown-list">
        <li
          v-for="item in dropdown"
          :key="item.link"
          class="header__nav-subitem"
          @click="closeNav"
        >
          <NuxtLink :to="item.link" activeClass="active" exact>
            {{ item.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </li>
</template>

<script>
export default {
  props: {
    link: [String, Object],
    text: String,
    reverse: Boolean,
    button: Boolean,
    dropdown: Array,
    action: Function
  },
  inject: ["closeNav"],
  data() {
    return {
      dropdownOpenDesktop: false,
      dropdownOpenMobile: false,
      dropdownMaxHeight: 0
    };
  },
  computed: {
    classes() {
      return {
        "header__nav-item": true,
        reverse: this.reverse,
        "open-desktop": this.dropdownOpenDesktop,
        "open-mobile": this.dropdownOpenMobile
      };
    },
    linkClasses() {
      return {
        "header__nav-link": true,
        button: this.button,
        "button--gold": this.button
      };
    },
    hasActiveSubitem() {
      for (let item of this.dropdown) {
        if (item.link === this.$route.path) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    clickHandler(event) {
      if (window.innerWidth <= 1100) {
        if (this.dropdown) {
          if (event.target.getAttribute("href") !== this.$route.path) {
            this.dropdownOpenMobile = !this.dropdownOpenMobile;
          }
        } else {
          this.closeNav();
        }
      }
      if (this.action) {
        this.action();
      }
    },
    enterKeyHandler() {
      this.openDropdownOnDesktop();
      if (this.action) {
        this.action();
      }
    },
    openDropdownOnDesktop() {
      if (window.innerWidth > 1100) {
        this.dropdownOpenDesktop = true;
      }
    },
    closeDropdownOnDesktop() {
      this.dropdownOpenDesktop = false;
    },
    adjustDropdownOnResize() {
      if (window.innerWidth > 1100) {
        this.dropdownMaxHeight = null;
        this.dropdownOpenMobile = false;
      }
    }
  },
  watch: {
    dropdownOpenMobile(value) {
      if (window.innerWidth <= 1100) {
        this.dropdownMaxHeight = value
          ? `${this.$refs.dropdown.scrollHeight}px`
          : 0;
      }
    }
  },
  mounted() {
    if (this.dropdown && this.hasActiveSubitem) {
      this.dropdownOpenMobile = true;
    }
    window.addEventListener("resize", this.adjustDropdownOnResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.adjustDropdownOnResize);
  }
};
</script>

<style lang="scss">
.header {
  &__nav-item {
    list-style: none;
    font-size: 1.55rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    position: relative;
    background-color: unset !important;

    &:first-child {
      display: none;

      @include respond(tablet) {
        display: block;
      }
    }

    &:not(:last-child) {
      margin-right: 5rem;

      @include respond(tablet-land) {
        margin-right: 4rem;
      }
    }

    a,
    button {
      transition: all 0.5s;

      &.active {
        color: $color-gold-3;
      }
    }

    button {
      font: inherit;
      color: inherit;
      border: none;
      background: none;
      cursor: inherit;
    }

    i {
      font-size: 1.2rem;
      margin-left: 0.6rem;
      transition: transform 0.5s;
    }

    .button {
      width: auto;
      letter-spacing: initial;
      text-transform: none;
      color: #000 !important;
      font-weight: 500;
      font-size: inherit;
      padding: 1rem 4rem;
    }

    &:hover,
    &.open-desktop {
      & > a,
      & > button {
        @include respond(desktop) {
          color: $color-gold-3;
        }
      }

      i {
        @include respond(desktop) {
          transform: rotate(180deg);
        }
      }

      .button {
        background-color: #fff;
        color: $color-azure !important;
        box-shadow: $boxshadow2;
      }
    }
  }

  &.sticky &__nav-item {
    color: #000;

    @include respond(tablet) {
      color: #fff;
    }
  }

  &__nav-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 1rem;
    cursor: initial;
    min-width: 30rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s 0.1s;
  }

  &__nav-item.open-desktop &__nav-dropdown {
    @include respond(desktop) {
      visibility: visible;
      opacity: 1;
    }
  }

  &__nav-dropdown-list {
    list-style: none;
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #f0f4fc;
    border-radius: 1rem;
    padding: 2rem 2.5rem;
    width: fit-content;
    min-width: 16rem;
    margin: auto;
    box-shadow: $boxshadow2;
    transition: all 0.5s;
  }

  &.sticky:not(.active) &__nav-dropdown-list {
    background-color: #fff;
  }

  &__nav-subitem {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    a {
      transition: color 0.5s;
      color: #000;
    }

    &:hover a {
      color: $color-gold-3;
    }
  }

  @include respond(tablet) {
    &__nav-item {
      opacity: 0;
      font-size: 1.6rem;
      transform: translateX(-100vw);
      visibility: hidden;
      transition: all 0.55s;

      &.reverse {
        transform: translateX(100vw);
      }

      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 3.5rem;
      }

      .button {
        background-color: $color-gold-4;
        color: #000;
        font-weight: 600;
        width: 20rem;
      }

      &.open-mobile {
        i {
          transform: rotate(180deg);
        }
      }
    }

    &.active &__nav-item {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }

    &__nav-dropdown {
      position: static;
      top: initial;
      left: initial;
      transform: none;
      padding: 0;
      max-height: 0;
      opacity: 1;
      transition: all 0.5s;
      visibility: visible;
      overflow: hidden;
      width: calc(100vw - 2 * #{$padding-sides-mobile});
      min-width: initial;
    }

    &__nav-dropdown-list {
      margin-top: 1.5rem;
      padding: 3rem 2rem;
      background-color: rgba(#000, 0.3);
      font-size: 1.45rem;
      width: 100%;
      max-width: 25rem;
      box-shadow: none;

      a {
        color: #fff;
      }
    }

    &__nav-subitem {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
