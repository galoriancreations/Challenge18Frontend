<template>
  <WhiteSection class="upcoming-challenges">
    <SectionHeading small>Upcoming Games</SectionHeading>
    <client-only>
      <v-app>
        <v-data-table :headers="headers" :items="items" class="elevation-2">
          <template v-slot:[`item.link`]="{ item }">
            <DashboardButton
              type="join"
              :showLabel="false"
              @click="joinChallenge(item.link)"
            />
          </template>
        </v-data-table>
      </v-app>
    </client-only>
  </WhiteSection>
</template>

<script>
import moment from "moment";
import WhiteSection from "~/components/layout/WhiteSection";

const endDate = challenge => {
  const date = new Date(challenge.date);
  date.setDate(date.getDate() + challenge.numOfDays);
  return moment(date).format("LL");
};

export default {
  components: { WhiteSection },
  data() {
    return {
      headers: [
        { text: "Challenge", value: "name" },
        { text: "Start date", value: "start" },
        { text: "End date", value: "end" },
        { text: "Join", value: "link", sortable: false }
      ]
    };
  },
  computed: {
    challenges() {
      return this.$store.getters["challenges/upcoming"];
    },
    items() {
      return this.challenges.map(challenge => ({
        ...challenge,
        start: moment(new Date(challenge.date)).format("LL"),
        end: endDate(challenge),
        link: challenge.platforms.wa.invite
      }));
    }
  },
  methods: {
    joinChallenge(link) {
      window.open(link, "_blank");
    }
  }
};
</script>
