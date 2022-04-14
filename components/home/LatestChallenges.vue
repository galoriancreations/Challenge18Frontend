<template>
  <WhiteSection class="latest-challenges">
    <SectionHeading small>Challenge 18 Board</SectionHeading>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <v-app v-else>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-2"
        hide-default-footer
        disable-pagination
        :mobile-breakpoint="1000"
      >
        <template v-slot:[`item.link`]="{ item }">
          <DashboardButton
            v-if="item.dayDiff <= 0"
            type="join"
            :showLabel="false"
            @click="joinChallenge(item.link)"
          />
          <span v-else>{{ item.ended ? "Ended" : "Active" }}</span>
        </template>
      </v-data-table>
    </v-app>
  </WhiteSection>
</template>

<script>
import moment from "moment";
import WhiteSection from "~/components/layout/WhiteSection";
import DashboardButton from "~/components/dashboard/DashboardButton";
import { getEndDate } from "~/assets/util/functions";

export default {
  components: { WhiteSection, DashboardButton },
  data() {
    return {
      loading: true,
      error: null,
      headers: [
        { text: "Organization", value: "creator" },
        { text: "Challenge", value: "name" },
        { text: "Start date", value: "start" },
        { text: "End date", value: "end" },
        { text: "Join", value: "link", sortable: false, align: "center" }
      ]
    };
  },
  computed: {
    challenges() {
      return this.$store.getters["challenges/latest"];
    },
    items() {
      return this.challenges.map(challenge => ({
        ...challenge,
        start: moment(new Date(challenge.date)).format("ll"),
        end: getEndDate(challenge),
        ended: new Date() > new Date(getEndDate(challenge)),
        link: challenge.platforms.wa.invite
      }));
    }
  },
  methods: {
    async loadChallenges() {
      try {
        await this.$store.dispatch("challenges/loadLatest");
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    },
    joinChallenge(link) {
      window.open(link, "_blank");
    }
  },
  mounted() {
    this.loadChallenges();
  }
};
</script>

<style lang="scss">
.latest-challenges {
  .dashboard-button {
    margin: auto !important;
  }
}
</style>
