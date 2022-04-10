<template>
  <div>
    <Nuxt />
    <SpinningLogoBg />
  </div>
</template>

<script>
import socket from "socket.io-client";

export default {
  data() {
    return {
      // io: socket(this.$config.axios.baseURL)
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    initSocketMethods() {
      // if (this.isLoggedIn) {
      //   this.io.emit("joinRoom", this.user._id);
      // }
      // this.io.on("updateCounter", data => console.log(data));
    },
    initToken() {
      if (this.isLoggedIn) {
        this.$axios.setToken(this.$store.getters.token, "Bearer");
      }
    }
  },
  watch: {
    isLoggedIn(value) {
      if (value) {
        // this.io.emit("joinRoom", this.user._id);
        const redirect = this.$route.query.redirect || "dashboard";
        this.$router.replace(`/${redirect}`);
      } else {
        // this.io.emit("leaveRoom", this.$cookies.get("userId"));
        if (this.$route.meta.requiresAuth) {
          this.$router.replace("/login");
        }
        this.$store.dispatch("notifications/clearItems");
      }
    }
  },
  mounted() {
    // this.initSocketMethods();
    this.initToken();
  },
  provide() {
    return {
      io: this.io,
      addNotification: item =>
        this.$store.dispatch("notifications/addItem", item),
      removeNotification: itemId =>
        this.$store.dispatch("notifications/removeItem", itemId)
    };
  }
};
</script>
