<template>
  <header :class="classes">
    <LoginIcon />
    <Logo />
    <NavToggle />

    <!-- <input type="text" class="input" v-model="userInput" @input="sendRequest" :placeholder="`Search ${filterType} ...`" /> -->
    <nav class="header__navigation">
      <ul class="header__nav-list">
        <NavItem v-for="(item, index) in navigationItems" :key="item.text" v-bind="item" :reverse="index % 2 !== 0" />
      </ul>
    </nav>
    <!-- <div v-if="userInput !== ''" class="search-results">
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <strong>{{ filterType === 'courses' ? item.name : item.userName }}</strong>
        </li>
      </ul>
    </div> -->
  </header>
</template>

<script>
export default {
  data() {
    return {
      navOpen: false,
      sticky: false,
      user: this.$store.getters.isAuth,
      userInput: '',
      items: [],
      filterType: 'players',
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
          link: "/certifications",
          text: "Certifications",
          hide: !this.isLoggedIn
        },
        { link: '/chatbot', text: 'Chatbot', hide: !this.isLoggedIn },
        // {
        //   text: "About",
        //   dropdown: [
            { link: "/about", text: "About Us" },
        //     // { link: "/our-goals", text: "Our Goals" },
        //     // { link: "/articles", text: "Articles" },
        //     // { link: "/videos", text: "Videos" }
        //   ]
        // },
        // {
        //   link: '/search', text: 'Search'
        // },
        {
          text: "Play",
          dropdown: [
            { link: "/how-to-play", text: "How to Play" },
            { link: "/challenges", text: "Challenges" },
            { link: "/Guidelines", text: "Guidelines" },
            // { link: "/clubs", text: "Clubs" },
            // { link: "/players", text: "Players" },
            { link: "/protocol", text: "Protocol" },
            { link: "/articles", text: "Articles" },//belongs in about
            { link: "/legal_AI_Ethics", text: "Terms & Conditions"},
            { link: "/beneficialAgiAction", text: "BGI Action"},
            { link: '/magic', text: 'Magic Game', hide: !this.isLoggedIn }
          ]
        },
        // { link: "/marketplace", text: "Marketplace" },
        { link: "/join", text: "Join", hide: this.isLoggedIn },
        {
          external:
            'https://bgi24.ai/#sponsor',
            // "https://www.jgive.com/new/en/ils/charity-organizations/1285",
          text: "Sponsor"
        },
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
      if (window.innerWidth > 1100) {
        this.closeNav();
      }
    },
    adjustStickyHeader() {
      this.sticky = window.scrollY > 0 && !this.active;
    },
    async sendRequest() {
      try {
        console.log('q')
        const response = await this.$axios.$post("/api", {
          permissions: this.filterType,
          search: true,
          input: this.userInput,
        });
        if (Array.isArray(response)) {
          this.items = response.slice(0, 15)
          console.log(response)
        } else {
          console.error('Response is not an array:', response);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
  watch: {
    navOpen(value) {
      document.querySelector("html").style.overflow = value ? "hidden" : null;
    },
    filterType() {
      this.userInput = '';
    },
  },
  mounted() {
    window.addEventListener("resize", this.adjustNavOpen);
    window.addEventListener("scroll", this.adjustStickyHeader);
  },
  beforeDestroy() {
    document.querySelector("html").style.overflow = null;
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
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  padding: 2rem $padding-sides-desktop;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;

  @include respond(mobile) {
    padding: 1.5rem $padding-sides-mobile;
  }

  &.sticky {
    position: fixed;
    background-color: rgba(#fff, 0.9);
    box-shadow: $boxshadow2;
    padding-top: 1rem;
    padding-bottom: 1rem;
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
      overflow-x: hidden;
      overflow-y: auto;
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
