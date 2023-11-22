export default {
  head: {
    title: "Challenge 18 – Challenge Yourself to the Top",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Challenge 18, conducted by Ting Global, is the most important sustainability and leadership games tournament in the world, in which clubs from all over the world collaborate in acheving the SDG’s."
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Spartan:wght@500;600;700;800&display=swap"
      }
    ],
    script: [
      {
        hid: "fontawesome",
        src: "https://kit.fontawesome.com/5225b7dab1.js",
        crossorigin: "anonymous"
      }
    ]
  },

  css: ["~/assets/sass/main.scss"],

  styleResources: {
    scss: "~/assets/sass/base.scss"
  },

  plugins: [
    "~/plugins/core-components",
    "~/plugins/v-waypoint.client.js",
    "~/plugins/vue-plyr.client.js",
    "~/plugins/axios"
  ],

  components: {
    dirs: [
      "~/components/layout",
      "~/components/UI",
      "~/components/extras",
      "~/components/editor",
      "~/components/about",
      "~/components/auth",
      "~/components/contact",
      "~/components/dashboard",
      "~/components/home",
      "~/components/clubs",
      "~/components/how-to-play",
      "~/components/marketplace",
      "~/components/sharoniscaring",
    ]
  },

  buildModules: ["@nuxtjs/style-resources", "@nuxtjs/vuetify"],

  modules: ["@nuxtjs/axios", "cookie-universal-nuxt", "nuxt-route-meta"],

  build: {
    transpile: ["vue-agile"]
  },

  pageTransition: {
    name: "page",
    mode: "out-in"
  },

  loading: {
    color: "#ffcc04",
    height: "4px"
  },

  router: {
    middleware: ["check-auth", "check-route"]
  },

  axios: {
    progress: false
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: "http://localhost:3000"
    },
    emailjsKey: process.env.EMAILJS_KEY,
    emailjsTemplate: process.env.EMAILJS_TEMPLATE,
    emailjsService: process.env.EMAILJS_SERVICE,
    paypalSandbox: process.env.PAYPAL_SANDBOX,
    paypalLive: process.env.PAYPAL_LIVE
  },

  server: {
    port: 4500
  }
};
