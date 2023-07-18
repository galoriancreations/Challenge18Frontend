<template>
  <Page title="Player" name="players">
    <SectionHeading small>{{ title.userName }}</SectionHeading>
    <!-- <h1>{{ title.players[0] }}</h1> -->
  </Page>
</template>
<script>

export default {

  computed: {
    title() {
      const { item } = this.$route.query;
      return item
    },
  },

}
</script>