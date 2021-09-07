<template>
  <footer class="footer">
    <WavePatternTop />
    <div class="footer__container">
      <div class="footer__column">
        <h3 class="footer__heading">Our Company</h3>
        <ul class="footer__text footer__list">
          <li v-for="item in infoLinks" :key="item.to">
            <NuxtLink class="footer__link" v-bind="item">
              {{ item.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="footer__column">
        <h3 class="footer__heading">Recent Articles</h3>
        <ul class="footer__text footer__list">
          <li v-for="post in recentPosts" :key="post.link">
            <a class="footer__link" :href="post.link" target="_blank">
              {{ post.title }}
            </a>
          </li>
        </ul>
      </div>
      <div class="footer__column">
        <h3 class="footer__heading">
          <NuxtLink
            v-if="$route.name !== 'contact'"
            class="footer__link"
            to="/contact"
          >
            Contact Us
          </NuxtLink>
          <span v-else>Contact Us</span>
        </h3>
        <div class="footer__contact">
          <p class="footer__text"><strong>Tel:</strong> +972-559721123</p>
          <p class="footer__text">
            <strong>Email: </strong>
            <a class="footer__link" href="mailto:support@ting.global">
              support@ting.global
            </a>
          </p>
        </div>
        <img
          class="footer__logo"
          src="../../assets/images/cropped-new-logo-with-300x122.png"
          alt="Ting Global"
        />
      </div>
    </div>
    <p class="footer__copyright">
      &copy; 2021, Ting Global Inc. All rights reserved.
    </p>
  </footer>
</template>

<script>
import articles from "../../assets/data/articles";

export default {
  computed: {
    recentPosts() {
      return articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);
    },
    infoLinks() {
      return [
        { to: "/about", text: "About Us" },
        { to: "/donate", text: "Donate" },
        { to: "/contact", text: "Contact Us" },
        { to: "/terms.pdf", text: "Terms of Service", target: "_blank" },
        { to: "/privacy.pdf", text: "Privacy Policy", target: "_blank" }
      ];
    }
  }
};
</script>

<style lang="scss">
.footer {
  background-color: $color-blue-2;
  background-image: url(../../assets/images/backgrounds/Kissing-Silhouette.svg);
  background-size: cover;
  background-position: center;
  color: #fff;
  position: relative;
  padding: 16rem $padding-sides-desktop 5rem;

  @include respond(mobile) {
    padding: 11rem $padding-sides-mobile 5rem;
  }

  &__container {
    display: flex;
    justify-content: space-between;

    @include respond(tablet) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  &__column {
    max-width: 30rem;
    display: flex;
    flex-direction: column;

    @include respond(mobile) {
      max-width: initial;
    }

    &:not(:last-child) {
      margin-right: 4rem;

      @include respond(tablet) {
        margin-right: 0;
        margin-bottom: 5.5rem;
      }
    }
  }

  &__heading {
    font-size: 2.2rem;
    color: $color-gold-4;
    margin-bottom: 2rem;
    font-weight: 600;

    @include respond(mobile) {
      font-size: 2rem;
    }
  }

  &__text {
    font-size: 1.55rem;
    line-height: 1.6;

    @include respond(mobile) {
      font-size: 1.45rem;
    }
  }

  &__list {
    list-style: none;

    li {
      &:not(:last-child) {
        margin-bottom: 1.25rem;
      }
    }
  }

  &__contact {
    p {
      &:not(:last-child) {
        margin-bottom: 1.25rem;
      }
    }
  }

  &__link {
    transition: color 0.5s;

    &:hover {
      color: $color-azure;
    }
  }

  &__logo {
    margin-top: 6rem;
    width: 25rem;

    @include respond(mobile) {
      margin-top: 4rem;
    }
  }

  &__copyright {
    text-align: center;
    margin-top: 6rem;
    font-size: 1.5rem;
    color: rgba(#fff, 0.8);

    @include respond(mobile) {
      font-size: 1.4rem;
      margin-top: 5rem;
    }
  }
}
</style>
