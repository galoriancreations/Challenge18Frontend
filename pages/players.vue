<template>
  <Page title="Players" name="players">
    <WhiteSection class="players">
      <div class="players__grid">
        <Player v-for="player in players" :key="player.name" :player="player" />
      </div>
    </WhiteSection>
  </Page>
</template>

<script>
import Player from "../components/UI/Player";

export default {
  components: { Player },
  data() {
    return {
      players: [
        {
          imgSrc: "https://i.imgur.com/MIwbEJr.jpg",
          name: "Nadia Hassona",
          state: "Israel",
          club: "Eroni Yud-Bet",
          score: 1239
        },
        {
          imgSrc: "https://i.imgur.com/y1AcFjw.jpg",
          name: "Mariam Abu Rhima",
          state: "Israel",
          club: "Eroni Yud-Bet",
          score: 5569
        },
        {
          imgSrc: "https://i.imgur.com/tgGlgsM.jpg",
          name: "Fernanda Matsuoka",
          state: "Brazil",
          club: "Brazil - Young Climate Leaders",
          score: 4523
        },
        {
          imgSrc: "https://i.imgur.com/l0tyiBX.jpg",
          name: "Amal Tartir",
          state: "Israel",
          club: "Eroni Yud-Bet",
          score: 3561
        },
        {
          imgSrc:
            "https://i1.wp.com/ting.global/wp-content/uploads/2021/04/1232.jpg?fit=500%2C585&ssl=1",
          name: "Ashni Rungta",
          state: "Nepal",
          club: "Nepal Premier School",
          score: 1234
        },
        {
          imgSrc:
            "https://i2.wp.com/ting.global/wp-content/uploads/2021/04/Inessa-Kraft-fit.jpg?fit=500%2C585&ssl=1",
          name: "Inessa Kraft",
          state: "Cyprus",
          occupation: "Producer & actress",
          score: 1200
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.players__grid {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 5rem;

  @include respond(tablet) {
    gap: 4rem;
  }
}
</style>
