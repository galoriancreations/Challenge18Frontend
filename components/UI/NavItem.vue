<template>
  <li :class="classes" @click="clickHandler">
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
    <span v-else :class="linkClasses">
      {{ text }}
      <i v-if="dropdown" class="fas fa-chevron-down" />
    </span>
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
    link: String,
    text: String,
    reverse: Boolean,
    button: Boolean,
    dropdown: Array,
    action: Function
  },
  inject: ["closeNav"],
  data() {
    return {
      dropdownOpenMobile: false,
      dropdownMaxHeight: 0
    };
  },
  computed: {
    classes() {
      return {
        "header__nav-item": true,
        reverse: this.reverse,
        open: this.dropdownOpenMobile
      };
    },
    linkClasses() {
      return this.button ? "button button--gold" : null;
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
      if (this.dropdown) {
        if (event.target.getAttribute("href") !== this.$route.path) {
          this.dropdownOpenMobile = !this.dropdownOpenMobile;
        }
      } else {
        this.closeNav();
      }
      if (this.action) {
        this.action();
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

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) {
        this.dropdownMaxHeight = null;
        this.dropdownOpenMobile = false;
      }
    });
  }
};
</script>
