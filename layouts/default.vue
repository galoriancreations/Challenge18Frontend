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
      io: socket(this.$config.axios.baseURL)
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    user() {
      return this.$store.getters.user;
    },
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    initSocketMethods() {
      this.io.on("allBoards", ({ challenges }) =>
        this.$store.dispatch("results/updateResults", challenges)
      );
      this.io.on("updateUser", userData =>
        this.$store.commit("updateUser", userData)
      );
      this.io.on("myTemplates", templates =>
        this.$store.commit("setTemplates", templates)
      );
      if (this.isLoggedIn) {
        this.io.emit("joinRoom", this.user.id);
      }
    },
    restartSocket() {
      this.io.disconnect();
      this.io = socket(this.$config.axios.baseURL);
      this.initSocketMethods();
    },
    initToken() {
      if (this.isLoggedIn) {
        this.$setAxiosDefaults(this.token, this.user.id);
      }
    }
  },
  watch: {
    isLoggedIn(value) {
      if (value) {
        this.io.emit("joinRoom", this.user.id);
        const redirect = this.$route.query.redirect || "dashboard";
        this.$router.replace(`/${redirect}`);
      } else {
        this.restartSocket();
        if (this.$route.meta.requiresAuth) {
          this.$router.replace("/");
        }
      }
    }
  },
  mounted() {
    this.initSocketMethods();
    this.initToken();
    this.io.on("updateCounter", data => console.log(data));
  },
  provide() {
    return {
      io: this.io
    };
  }
};
</script>
