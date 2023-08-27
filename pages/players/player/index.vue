<template>
  <Page title="Player" name="players">
    <SectionHeading small>{{ item.userName }}</SectionHeading>
    <!-- <h1>{{ title.players[0] }}</h1> -->
    <radarChart :item="{ item }" />
  </Page>
</template>
<script>

import radarChart from "../../../components/player/radarChart.vue"
export default {
  components: {
    radarChart
  },
  computed: {
    item() {
      const { item } = this.$route.query;
      if (item) {
        return item
      }
      return null
    },
  },

}
</script>