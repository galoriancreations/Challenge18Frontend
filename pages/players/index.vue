<template>
  <Page title="Players" name="players">
    <SectionHeading small>{{ title }}</SectionHeading>
    <v-app>
      <v-data-table :headers="headers" :items="items" class="elevation-2" hide-default-footer disable-pagination
        item-key="_id">
        <template v-slot:[`item.totalScore`]="{ item }">
          <strong>{{ item.totalScore }}</strong>
        </template>
        <template v-slot:[`item.username`]="{ item }">
          <BaseButton link="players/player">
            <strong>{{ item.userName }}</strong>
          </BaseButton>
        </template>
        <template v-slot:[`item.fullName`]="{ item }">
          <strong>{{ item.fullName }}</strong>
        </template>
      </v-data-table>
    </v-app>
  </Page>
</template>

<script>
export default {
  // inject: ["io"],
  async asyncData({ $axios }) {
    const players = await $axios.$post("/api", { getTopPlayers: true });
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
          sortable: false,
        },
        { text: "Name", value: "fullName" },
        { text: "Username", value: "username" },
      ],
    };
  },
  computed: {
    title() {
      return this.items.length >= 18 ? "Top 18 Players" : "Top Players";
    },
    items() {
      return this.players
        .filter((player) => !!player.userName)
        .map((player, index) => {
          const item = { ...player };
          for (let key in item) {
            if (!item[key] && item[key] !== 0) {
              item[key] = "–";
            }
          }
          item.rank = index + 1;
          return item;
        });
    },
  },
  mounted() {
    // this.io.on("updateTopPlayers", data => {
    //   this.players = data;
    // });
  },
};
</script>
