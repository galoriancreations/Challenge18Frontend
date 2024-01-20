<template>
  <Page title="How to Play" name="how-to-play">
    <!-- <HowToPlayVideo /> -->
    <div class="how-to-play__content">
      <HowToPlaySection
        v-for="section in sections"
        :key="section.title"
        v-bind="section"
      />
      <BaseButton variant="blue" @click="$router.push('/guidelines')">
        Guidelines
      </BaseButton>
    </div>
  </Page>
</template>

<script>
import sections from '~/assets/data/how-to-play';

export default {
  data() {
    return { sections };
  },
};
</script>
