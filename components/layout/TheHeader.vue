<template>
  <header :class="classes">
    <LoginIcon />
    <Logo />
    <NavToggle />
    <nav class="header__navigation">
      <ul class="header__nav-list">
        <NavItem
          v-for="(item, index) in navigationItems"
          :key="item.text"
          v-bind="item"
          :reverse="index % 2 !== 0"
        />
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from "../UI/Logo";
import NavToggle from "../UI/NavToggle";
import LoginIcon from "../UI/LoginIcon";
import NavItem from "../UI/NavItem";

export default {
  components: { Logo, NavToggle, LoginIcon, NavItem },
  data() {
    return {
      navOpen: false,
      sticky: false
    };
  },
  computed: {
    classes() {
      return {
        header: true,
        active: this.navOpen,
        sticky: this.sticky
      };
    },
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    navigationItems() {
      const items = [
        { link: "/", text: "Home" },
        {
          text: "About",
          dropdown: [
            { link: "/about", text: "Abous Us" },
            { link: "/what-we-do", text: "What We Do" },
            { link: "/articles", text: "Articles" },
            { link: "/videos", text: "Videos" }
          ]
        },
        { link: "/scores", text: "Scores" },
        { link: "/players", text: "Players" },
        {
          text: "Join",
          dropdown: [
            { link: "/register", text: "Free Registration" },
            { link: "/membership", text: "Premium Membership" }
          ],
          hide: this.isLoggedIn
        },
        { link: "/contact", text: "Contact" },
        { link: "/login", text: "Login", button: true, hide: this.isLoggedIn },
        { action: this.logout, text: "Logout", hide: !this.isLoggedIn },
        {
          link: "/dashboard",
          text: "Dashboard",
          button: true,
          hide: !this.isLoggedIn
        }
      ];
      return items.filter(item => !item.hide);
    }
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    closeNav() {
      this.navOpen = false;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    adjustNavOpen() {
      if (window.innerWidth > 1100 && this.navOpen) {
        this.navOpen = false;
      }
    },
    adjustStickyHeader() {
      this.sticky = window.scrollY > 0 && !this.active;
    }
  },
  watch: {
    navOpen(value) {
      document.querySelector("body").style.overflow = value ? "hidden" : null;
    }
  },
  mounted() {
    window.addEventListener("resize", this.adjustNavOpen);
    window.addEventListener("scroll", this.adjustStickyHeader);
  },
  beforeDestroy() {
    document.querySelector("body").style.overflow = null;
    window.removeEventListener("resize", this.adjustNavOpen);
    window.removeEventListener("scroll", this.adjustStickyHeader);
  },
  provide() {
    return {
      toggleNav: this.toggleNav,
      closeNav: this.closeNav
    };
  }
};
</script>

<style lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem $padding-sides-desktop;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;

  @include respond(mobile) {
    padding: 1rem $padding-sides-mobile;
  }

  &.sticky {
    position: fixed;
    background-color: rgba(#fff, 0.9);
    box-shadow: $boxshadow2;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &__nav-list {
    display: flex;
    align-items: center;
  }

  &__nav-item {
    list-style: none;
    font-size: 1.55rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    position: relative;

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
    span {
      transition: all 0.5s;

      &.active {
        color: $color-gold-3;
      }
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

    &:hover {
      & > a,
      & > span {
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

  &__nav-item:hover &__nav-dropdown {
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
    &__navigation {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color-blue-2, 0.95);
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
      z-index: -1;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 16rem;
        transform: translateX(-50%);
        width: calc(100% - 2 * #{$padding-sides-desktop});
        height: 0.1rem;
        background-color: rgba(#fff, 0.5);

        @include respond(mobile) {
          top: 13rem;
          width: calc(100% - 2 * #{$padding-sides-mobile});
        }
      }
    }

    &.active &__navigation {
      opacity: 1;
      visibility: visible;
    }

    &.sticky &__navigation::after {
      top: 13rem;

      @include respond(mobile) {
        top: 11rem;
      }
    }

    &__nav-list {
      flex-direction: column;
      margin-top: 21rem;
      padding-bottom: 6rem;
      height: calc(100% - 21rem);
      overflow: auto;
      text-align: center;

      @include respond(mobile) {
        margin-top: 18rem;
        height: calc(100% - 18rem);
      }
    }

    &.sticky &__nav-list {
      margin-top: 18rem;
      height: calc(100% - 18rem);

      @include respond(mobile) {
        margin-top: 16rem;
        height: calc(100% - 16rem);
      }
    }

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

      &.open {
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
