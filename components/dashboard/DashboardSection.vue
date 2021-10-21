<template>
  <section class="dashboard-section">
    <div class="dashboard-section__container">
      <h2 class="dashboard-section__heading">
        {{ title }}
      </h2>
      <div class="dashboard-section__content">
        <slot />
      </div>
    </div>
    <slot name="button" />
    <slot name="modal" />
  </section>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="scss">
.dashboard-section {
  max-width: 105rem;
  margin: auto;

  &:not(:last-child) {
    margin-bottom: 8rem;

    @include respond(mobile) {
      margin-bottom: 5.5rem;
    }
  }

  &__container {
    border-radius: 1rem;
    box-shadow: $boxshadow2;
  }

  &__heading {
    border-radius: 1rem 1rem 0 0;
    background-color: $color-blue-2;
    color: $color-gold-4;
    text-align: center;
    padding: 1.75rem 1rem 1.5rem;
    font-weight: 700;
    font-size: 2.5rem;

    @include respond(mobile) {
      font-size: 1.9rem;
    }
  }

  &__content {
    padding: 4.5rem 3rem 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30rem;

    @include respond(mobile) {
      padding: 3rem 2rem 5rem;
    }

    .button {
      margin: 0 auto;
      width: auto;
      font-weight: 600;
    }
  }
}

.my-drafts,
.all-users,
.all-templates,
.all-challenges {
  .my-challenges__table-container {
    margin: 0;
  }
}

.my-challenges {
  &__table-container {
    margin-bottom: 1.5rem;
    width: 100%;
    align-self: flex-start;

    & > .button {
      margin-top: 4rem !important;

      i {
        margin-right: 0.5rem;
      }
    }
  }

  &__actions {
    display: flex;

    & > .dashboard-button {
      margin: 0;

      &:not(:last-child) {
        margin-right: 0.75rem;
      }
    }
  }
}
</style>
