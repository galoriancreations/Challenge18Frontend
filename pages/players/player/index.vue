<template>
  <Page title="Player" name="players">
    <SectionHeading small>{{ title.userName }}</SectionHeading>
    <!-- <h1>{{ title.players[0] }}</h1> -->
    <radarChart/>
  </Page>
</template>
<script>

import radarChart from "../../../components/player/radarChart.vue"
export default {
components:{
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