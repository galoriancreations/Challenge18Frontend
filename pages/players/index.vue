<template>
  <Page title="Players" name="players">
    <SectionHeading small>Top 18 Players</SectionHeading>
    <v-app>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-2"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:[`item.totalScore`]="{ item }">
          <strong class="player-score">{{ item.totalScore }}</strong>
        </template>
      </v-data-table>
    </v-app>
  </Page>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const players = await $axios.$post("/api", { getTopPlayers: true });
    players.forEach(player => {
      for (let key in player) {
        if (!player[key] && player[key] !== 0) {
          player[key] = "–";
        }
      }
    });
    return { players };
  },
  data() {
    return {
      headers: [
        { text: "Rank", value: "rank", align: "center", sortable: false },
        {
          text: "Total Score",
          value: "totalScore",
          align: "center",
          sortable: false
        },
        { text: "Name", value: "fullName" },
        { text: "Phone Number", value: "phone" },
        { text: "Username", value: "username" }
      ]
    };
  },
  computed: {
    items() {
      return this.players.map((player, index) => ({
        ...player,
        rank: index + 1
      }));
    }
  }
};
</script>
