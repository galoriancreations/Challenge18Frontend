<template>
  <div class="card__container">
    <div class="card__body">
      <div class="image__container">
        <div class="elementor-widget-container">
          <figure class="wp-caption">
            <img :src="player.imgSrc" :alt="player.name" loading="eager" />
            <figcaption class="caption-tittle">
              {{ player.name }}
            </figcaption>
          </figure>
        </div>
      </div>
      <div class="text__wrapper">
        <div class="text__container">
          <p v-for="field in infoFields" :key="field.key">
            <strong>{{ field.key }}:</strong> {{ field.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    player: Object
  },
  computed: {
    infoFields() {
      const fields = [];
      for (let key in this.player) {
        if (key !== "imgSrc" && key !== "name") {
          fields.push({ key: _.capitalize(key), value: this.player[key] });
        }
      }
      return fields;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/base.scss";

.card__container {
  border-radius: 1rem;
  box-shadow: $boxshadow2;
  overflow: hidden;
  text-align: center;
  max-width: 40rem;
  margin: 0 auto;

  img {
    width: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }
}

.wp-caption {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.caption-tittle {
  width: 100%;
  background-color: $color-blue-2;
  color: #fff;
  font-size: 2.3rem;
  font-family: "Spartan", sans-serif;
  font-weight: 600;
  padding: 1.3rem 1rem 0.9rem;

  @include respond(mobile) {
    font-size: 1.9rem;
    padding: 1.5rem 1rem 1.1rem;
  }
}

.text__wrapper {
  padding: 3rem 1.5rem;

  @include respond(mobile) {
    padding: 2.5rem 1.5rem;
  }

  p {
    line-height: 1.5;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  strong {
    font-weight: 600;
  }
}
</style>
