<template>
  <Page title="Player" name="players">
    <SectionHeading small>{{ title }}</SectionHeading>

  </Page>
</template>
<script>
export default {
  computed: {
    title() {
      return "Player";
    },
  }
}
</script>