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
export default {
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
            { link: "/how-to-play", text: "How to Play" },
            { link: "/about", text: "Abous Us" },
            { link: "/why-challenge-18", text: "Why Challenge 18" },
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
  }
}
</style>
