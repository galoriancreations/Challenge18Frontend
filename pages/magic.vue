<template>
    <page title="magic" name="magic">
        <GameSection/>
    </page>
</template>




<script>
   import GameSection from '~/components/magic/GameSection.vue';

export default {
    head: {
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Ting Global is the international body that conducts the 18 official pre-tournament challenge competitions, and the tournament. 18 days of assignments that raise awareness of sustainability and leadership issues."
            }
        ]
    },
    data() {
        return {};
    },
    components: { GameSection }
};
</script>


<style lang="scss">
.magic > section:not(.game-section) {
  .section-heading-wrapper {
    margin-bottom: 5rem;

    @include respond(mobile) {
      margin-bottom: 3.5rem;
    }
  }
}
</style>