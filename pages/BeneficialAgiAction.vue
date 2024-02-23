<template>
    <page title="Beneficial AGI Action">
        <div id="commandos_container">
            <section v-for="(step, index) in filteredSections" :key="index">
                <div id="track_pages_container">
                    <div v-for="(page, i) in trackPages" :key="i"
                        :class="['pages', { 'current_page': i === currentPageIndex}]"></div>
                </div>

                <div class="animation_container">
                    <beneficial-agi-animations :key="currentPageIndex" :currentIndexAnimation="currentPageIndex" />
                </div>

                <beneficial-agi-steps v-if="index < 6" @next-page="nextPage" @prev-page="prevPage"
                    :currentPageIndex="currentPageIndex" :header="step.header" :paragraph="step.paragraph"
                    :skipButtonText="step.skipButtonText" :displayButton="step.displayButton" @skip-steps="skipButton" />

                <beneficial-agi-video v-else-if="index === 6" @next-page="nextPage" :currentPageIndex="currentPageIndex" />

                <beneficial-agi-qa v-else @prev-page="prevPage" />
            </section>

            <section v-if="currentPageIndex === 6" :key="currentPageIndex">
                <beneficial-agi-video @next-page="nextPage" :currentPageIndex="currentPageIndex" />
            </section>

            <section v-if="currentPageIndex === 7" :key="currentPageIndex">
                <beneficial-agi-qa @prev-page="prevPage" />
            </section>
        </div>
    </page>
</template>

<script>
import Page from '../components/layout/Page.vue';
import steps from '~/assets/data/beneficialAgiAction';
import BeneficialAgiSteps from '../components/beneficialAgiAction/beneficialAgiSteps.vue';
import BeneficialAgiAnimations from '../components/beneficialAgiAction/beneficialAgiAnimations.vue';
import BeneficialAgiVideo from '../components/beneficialAgiAction/beneficialAgiVideo.vue';
import BeneficialAgiQA from '../components/beneficialAgiAction/beneficialAgiQA.vue';

export default {
    components: {
        Page,
        BeneficialAgiSteps,
        BeneficialAgiAnimations,
        BeneficialAgiVideo,
        'beneficial-agi-qa': BeneficialAgiQA,
    },

    data() {
        return {
            maxIndex: 7,
            currentPageIndex: 0,
            steps,
        }
    },

    methods: {
        nextPage() {
            this.currentPageIndex = Math.min(this.currentPageIndex + 1, this.maxIndex);
        },
        prevPage() {
            this.currentPageIndex = Math.max(this.currentPageIndex - 1, 0);
        },
        skipButton() {
            this.currentPageIndex = 6;
        },
    },

    computed: {
        filteredSections() {
            return this.steps.filter((_, index) => index === this.currentPageIndex);
        },
        trackPages() {
            return Array.from({ length: this.maxIndex + 1 - 2 }, (_, i) => i);
        },
    },
}
</script>

<style>
#commandos_container {
    margin-bottom: 200px;
}

.animation_container {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
}

#track_pages_container {
    height: 100px;
    display: flex;
    justify-content: center;
    gap: 15px;
}

.pages  {
    height: 18px;
    width: 18px;
    border-radius: 20px;
    background-color: #C7D5E6;
}

.current_page {
    height: 20px;
    width: 36px;
    background-color: #00459E;
    border-radius: 20px;
}
</style>