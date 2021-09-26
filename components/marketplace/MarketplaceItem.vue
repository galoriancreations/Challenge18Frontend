<template>
  <a class="marketplace-item" :href="item.link" target="_blank">
    <img :src="image" :alt="item.title" class="marketplace-item__img" />
    <div class="marketplace-item__content">
      <h3 class="marketplace-item__title">{{ item.title }}</h3>
      <p class="marketplace-item__description">{{ item.description }}</p>
      <p class="marketplace-item__cost">
        <i class="fas fa-coins marketplace-item__icon" />
        <span>{{ cost }} Ting points</span>
      </p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    image() {
      return require(`~/assets/images/marketplace/${this.item.image}`);
    },
    cost() {
      let { cost } = this.item;
      if (cost > 1000) {
        cost = cost / 1000;
        if (cost % 1 !== 0) {
          cost = cost.toFixed(1);
        }
        cost = `${cost}K`;
      }
      return cost;
    }
  }
};
</script>

<style lang="scss">
.marketplace-item {
  box-shadow: $boxshadow2;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: background-color 0.5s;

  @include respond(mobile) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  &:hover {
    background-color: #eee;
  }

  &__img {
    display: block;
    width: 15rem;
    height: 15rem;
    background-color: #fff;

    @include respond(mobile) {
      width: 100%;
      height: auto;
    }
  }

  &__content {
    flex: 1;
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;

    @include respond(mobile) {
      padding: 3rem 1.5rem;
    }
  }

  &__title {
    color: $color-blue-2;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 0.8rem;

    @include respond(mobile) {
      margin-bottom: 1.5rem;
    }
  }

  &__description {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;

    @include respond(mobile) {
      margin-bottom: 1.5rem;
    }
  }

  &__cost {
    font-size: 1.4rem;
    font-weight: 600;
    align-self: flex-end;

    @include respond(mobile) {
      align-self: unset;
    }
  }

  &__icon {
    color: $color-azure;
    margin-right: 0.5rem;
  }
}
</style>
