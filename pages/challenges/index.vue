<template>
    <Page title="Challenges" name="challenges">
        <section class="challenges-intro">
            <p>
                Join or create any community below to receive daily tasks that will lead
                you on your journey to change!
            </p>
        </section>
        <h1 style="text-align: center; height: 80px;">Challenges</h1>
        <div class="challenges_container">
            <button @click="scrollLeft" class="scroll_btns">
                 &larr; 
            </button>
            <div class="challenges-grid" ref="challengesGrid">
                <div class="challenges_inner_container">
                    <TopChallengesItem 
                        v-for="item in challenges" 
                        :key="item.popupLessView.title" 
                        :challenge="item" 
                    />
                </div>
            </div>
            <button @click="scrollRight" class="scroll_btns">
                 &#8594; 
            </button>
        </div>
    </Page>
</template>

<script>

import challenges from "~/assets/data/challenges_v2";

export default {
    data() {
        return { challenges };
    },

    methods: {
        scrollRight() {
            const challengesGrid = this.$refs.challengesGrid;
            challengesGrid.scrollLeft += this.mobileMode ? 435 : 935;
        },
        scrollLeft() {
            const challengesGrid = this.$refs.challengesGrid;
            challengesGrid.scrollLeft -= this.mobileMode ? 435 : 935;
        },
    },

    computed: {
        mobileMode() {
            return window.innerWidth <= 767;
        }
    }
};
</script>

<style lang="scss">
.challenges-intro {
    max-width: 80rem;
    margin: auto;
    font-size: 2rem;
    text-align: center;
    line-height: 1.7;
    margin-bottom: 8rem;

    p {
        font-size: inherit;
        line-height: inherit;
    }
}



.challenges-grid {
    display: flex;
    height: 450px;
    align-items: center;
    padding: 50px;
    scroll-behavior: smooth;
    overflow: hidden;

    @include respond(tablet) {

    }

    @include respond(tablet-sm) {

    }

    @include respond(mobile-land) {

    }

    @include respond(mobile) {
        display: flex;
        justify-content: center;
        align-content: center;
        margin-right: -12%;
        margin-left: -12%;
    }
}

.challenges_container {
    display: flex;
    align-items: center;
    gap: 20px;

  
    .challenges_inner_container {
        display: flex;
        align-items: center;
        gap: 6.5rem;
        padding: 20px;

        @include respond(mobile) {
        display: flex;
        gap: 35px;
    }
    }

    .scroll_btns {
        font-size: 40px;

        @include respond(mobile) {
            z-index: 1;
        }
    }

}
</style>
