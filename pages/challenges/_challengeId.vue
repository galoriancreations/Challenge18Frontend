<template>
  <div>{{ $route.params.challengeId }}</div>
</template>

<script>
export default {
  async asyncData({ $axios, route, error }) {
    try {
      const challenge = await $axios.$post("/api", {
        getChallengeData: route.params.challengeId
      });
      return { challenge };
    } catch (err) {
      error(err);
    }
  }
};
</script>
