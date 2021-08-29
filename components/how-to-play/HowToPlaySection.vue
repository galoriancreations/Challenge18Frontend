<template>
  <section class="how-to-play__section">
    <h2 class="how-to-play__section-title">{{ title }}</h2>
    <ul class="diamond-bullet-list diamond-bullet-list--nested">
      <li v-for="item in items" :key="item.text || item">
        <span v-html="item.text || item" />
        <ul v-if="item.subitems">
          <li v-for="subitem in item.subitems" :key="subitem">
            <span v-html="subitem" />
          </li>
        </ul>
      </li>
    </ul>
    <p v-if="note" class="how-to-play__section-note">
      <strong>Note:</strong> {{ note }}
    </p>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    items: Array,
    note: String
  }
};
</script>

<style lang="scss">
.how-to-play {
  &__section {
    font-size: 1.75rem;
    line-height: 1.6;

    @include respond(mobile) {
      font-size: 1.55rem;
      line-height: 1.7;
    }

    &:not(:last-child) {
      margin-bottom: 6rem;

      @include respond(mobile) {
        margin-bottom: 4rem;
      }
    }

    & > ul {
      margin-left: 1rem;

      @include respond(mobile) {
        margin-left: 0;
      }
    }
  }

  &__section-title {
    font-size: 3rem;
    color: $color-blue-2;
    margin-bottom: 2rem;

    @include respond(mobile) {
      font-size: 2.4rem;
      margin-bottom: 1.25rem;
    }
  }

  ul {
    & > li {
      &:not(:last-child) {
        margin-bottom: 1rem;

        @include respond(mobile) {
          margin-bottom: 0.75rem;
        }
      }
    }

    ul {
      margin-left: 2.8rem;
      margin-top: 1rem;

      @include respond(mobile) {
        margin-left: 2.4rem;
        margin-top: 0.75rem;
      }
    }

    strong {
      font-weight: 600;
    }
  }

  &__section-note {
    margin-top: 2rem;

    @include respond(mobile) {
      margin-top: 1.25rem;
    }
  }
}
</style>
