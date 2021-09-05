<template>
  <div class="top-challenges__item" v-on="$listeners">
    <img :src="challenge.image" :alt="challenge.title" />
  </div>
</template>

<script>
export default {
  props: {
    challenge: Object
  }
};
</script>
