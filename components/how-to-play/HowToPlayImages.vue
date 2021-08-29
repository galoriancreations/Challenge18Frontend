<template>
  <div class="how-to-play__images">
    <img
      v-for="image in images"
      :key="image.src"
      class="how-to-play__img"
      v-bind="image"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          src: require("~/assets/images/how-to-play/learn-reflect-act.png"),
          alt: "Object of the Game"
        },
        {
          src: require("~/assets/images/how-to-play/preparation.png"),
          alt: "Preparation"
        },
        {
          src: require("~/assets/images/how-to-play/how-to-play.png"),
          alt: "How to Play"
        },
        {
          src: require("~/assets/images/how-to-play/specialties.png"),
          alt: "Player Specialties"
        },
        {
          src: require("~/assets/images/how-to-play/bonus-features.png"),
          alt: "Bonus Features"
        },
        {
          src: require("~/assets/images/how-to-play/how-to-win.png"),
          alt: "Winning the Game"
        }
      ]
    };
  }
};
</script>

//
<style lang="scss">
// .how-to-play {
//   &__images {
//     width: 25vw;
//     margin-left: 5rem;
//     flex-shrink: 0;
//   }

//   &__img {
//     display: block;
//     width: 100%;
//     border-radius: 0.8rem;
//     box-shadow: $boxshadow2;

//     &:not(:last-child) {
//       margin-bottom: 3.5rem;
//     }
//   }
// }
//
</style>
