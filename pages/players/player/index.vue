<template>
  <Page title="Player" name="players">
    <SectionHeading small>{{ `${item.userName}` }}</SectionHeading>
    <h1>{{ `rank ${item.rank}` }}</h1>
    <h1>{{ `score ${item.rank}` }}</h1>
  </Page>
</template>
<script>

export default {

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