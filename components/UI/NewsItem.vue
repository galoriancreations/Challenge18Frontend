<template>
  <article class="news-item">
    <a
      class="news-item__img"
      :style="{ backgroundImage: `url(${article.mainImg})` }"
      :href="article.link"
      target="_blank"
    />
    <div class="news-item__content">
      <h3 class="news-item__title">
        <a :href="article.link" target="_blank">
          {{ article.title }}
        </a>
      </h3>
      <p class="news-item__excerpt">
        {{ excerpt }}
      </p>
      <a
        v-if="showButton"
        class="button button--darkblue"
        :href="article.link"
        target="_blank"
      >
        Read More
      </a>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    article: Object,
    showButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    excerpt() {
      return (
        this.article.excerpt
          .split(" ")
          .slice(0, 33)
          .join(" ") + "..."
      );
    }
  }
};
</script>

<style lang="scss">
.news-item {
  text-align: center;

  &__img {
    display: block;
    border-radius: 1rem;
    box-shadow: $boxshadow2;
    background-size: cover;
    background-position: center;
    height: 20vw;
    position: relative;

    @media only screen and (max-width: 750px) {
      height: 40vw;
    }

    @include respond(mobile) {
      height: 55vw;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      transition: all 0.5s;
    }

    &:hover::after {
      background-color: rgba($color-azure, 0.4);
    }
  }

  &__title {
    font-size: 2.2rem;
    font-weight: 600;
    margin: 2.5rem 0 2rem;

    @include respond(mobile) {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  &__excerpt {
    font-size: 1.65rem;
    line-height: 1.7;

    @include respond(mobile) {
      font-size: 1.5rem;
    }
  }

  a:not(.button) {
    transition: color 0.5s;

    &:hover {
      color: $color-azure;
    }
  }

  .button {
    width: 20rem;
    margin-top: 2rem;
    font-size: 1.4rem;

    @include respond(mobile) {
      font-size: 1.2rem;
    }
  }
}
</style>
