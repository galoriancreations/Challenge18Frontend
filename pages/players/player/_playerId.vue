<template>
  <Page title="Player" name="players">
    <SectionHeading small>{{ item.userName }}</SectionHeading>
    <div class="container">
      <playerDetails :item="item" />
      <radarChart :item="item" />
    </div>
  </Page>
</template>
<script>

import radarChart from "../../../components/player/radarChart.vue"
import playerDetails from "../../../components/player/playerDetails.vue"

export default {

  components: {
    radarChart,
    playerDetails
  },
  computed: {
    item() {
      const item = this.$route.query;
      console.log(this.$route)
      if (item) {
        return item
      }
      return null
    },
  },


}
</script>
<style>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>