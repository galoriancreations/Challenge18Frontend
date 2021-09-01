<template>
  <Page title="Marketplace" name="marketplace">
    <section class="marketplace__intro">
      <p>You can be rewarded for Ting coins with either:</p>
      <ul class="diamond-bullet-list">
        <li>Cash</li>
        <li>
          Discounts on a wide selection of products and in various businesses
        </li>
        <li>A donation to a charity of their choice</li>
      </ul>
    </section>
    <SectionSeperator />
    <section class="marketplace__cta">
      <p>
        Want to become our partner and have your products featured in our
        marketplace?
      </p>
      <BaseButton link="/contact" variant="blue">Contact Us</BaseButton>
    </section>
  </Page>
</template>

<style lang="scss">
.marketplace {
  &__intro {
    font-size: 1.75rem;
    line-height: 1.6;
    margin: auto;
    max-width: 65rem;

    @include respond(mobile) {
      font-size: 1.55rem;
      line-height: 1.7;
    }

    p {
      margin-bottom: 1.75rem;
    }

    ul {
      margin-left: 1rem;

      li {
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  &__cta {
    text-align: center;
    max-width: 55rem;
    margin: auto;

    p {
      margin-bottom: 3rem;
    }
  }
}
</style>
