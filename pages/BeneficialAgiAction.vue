<template>
    <page title="Beneficial AGI Action">
        <div id="commandos_container">
            <section v-if="currentPageIndex === 0" :key="currentPageIndex">
                <div id="track_pages_container">
                    <div id="current_page"></div>
                    <div class="pages"></div>
                    <div class="pages"></div>
                </div>

                <div class="animation_container">
                    <beneficial-agi-animations :currentIndexAnimation="currentPageIndex" />
                </div>

                <beneficial-agi-steps @next-page="nextPage" @prev-page="prevPage"
                    :currentPageIndex="currentPageIndex" header="Welcome to BGI Action"
                    paragraph="Our mission is to support the strength of the Singularity Network students community by publishing real life facts and events, thereby promoting empathy and sympathy towards Beneficial BGI."
                    skipButtonText="Page" />

            </section>
            <section v-if="currentPageIndex === 1" :key="currentPageIndex">
                <div id="track_pages_container">
                    <div class="pages "></div>
                    <div id="current_page"></div>
                    <div class="pages"></div>
                </div>

                <div class="animation_container">
                    <beneficial-agi-animations :currentIndexAnimation="currentPageIndex" />
                </div>

                <beneficial-agi-steps @next-page="nextPage" @prev-page="prevPage" :currentPageIndex="currentPageIndex"
                    header="Building international bridges"
                    paragraph="Our vision is creating an approachable publicity platform, to allow anyone to take part in the development of Decentralized Open-Source AGI." />
            </section>
            <section v-if="currentPageIndex === 2" :key="currentPageIndex">
                <div id="track_pages_container">
                    <div class="pages "></div>
                    <div class="pages"></div>
                    <div id="current_page"></div>
                </div>
                <div class="animation_container">
                    <beneficial-agi-animations :currentIndexAnimation="currentPageIndex" />
                </div>
                <beneficial-agi-steps @next-page="nextPage" @prev-page="prevPage" :currentPageIndex="currentPageIndex"
                    header="Your voice is important"
                    paragraph="Internationally, any voice is valuable and helps make an impact. The world is filled with fake news and biased propaganda, which leads to ignorance. Join us, help spread the word, every click and share count." />
            </section>
            <section v-if="currentPageIndex === 3" :key="currentPageIndex">
                <div id="track_pages_container">
                    <div id="current_page"></div>
                    <div class="pages"></div>
                    <div class="pages"></div>
                </div>
                <div class="animation_container">
                    <beneficial-agi-animations :currentIndexAnimation="currentPageIndex" />
                </div>
                <beneficial-agi-steps @next-page="nextPage" @prev-page="prevPage" :currentPageIndex="currentPageIndex"
                    @skip-steps="skipButton" header="First Step"
                    paragraph="Click the Share button - which will copy the post and redirect you to a Facebook group."
                    skipButtonText="Skip" :displayButton="true" />
            </section>
            <section v-if="currentPageIndex === 4" :key="currentPageIndex">
                <div id="track_pages_container">
                    <div class="pages "></div>
                    <div id="current_page"></div>
                    <div class="pages"></div>
                </div>
                <div class="animation_container">
                    <beneficial-agi-animations :currentIndexAnimation="currentPageIndex" />
                </div>
                <beneficial-agi-steps @next-page="nextPage" @prev-page="prevPage" :currentPageIndex="currentPageIndex"
                    header="Second Step"
                    paragraph="On the Facebook group page, join the group and paste the copied post from the first step" />
            </section>
            <section v-if="currentPageIndex === 5" :key="currentPageIndex">
                <div id="track_pages_container">
                    <div class="pages "></div>
                    <div class="pages"></div>
                    <div id="current_page"></div>
                </div>
                <div class="animation_container">
                    <beneficial-agi-animations :currentIndexAnimation="currentPageIndex" />
                </div>
                <beneficial-agi-steps @next-page="nextPage" @prev-page="prevPage" :currentPageIndex="currentPageIndex"
                    header="Third Step"
                    paragraph="Hit the share button and that's it! The video will have been posted, and you'll have taken an active part in global propaganda." />
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
import BeneficialAgiAnimations from '../components/beneficialAgiAction/beneficialAgiAnimations.vue';
import BeneficialAgiQA from '../components/beneficialAgiAction/beneficialAgiQA.vue';
import BeneficialAgiSteps from '../components/beneficialAgiAction/beneficialAgiSteps.vue';
import BeneficialAgiVideo from '../components/beneficialAgiAction/beneficialAgiVideo.vue';

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

.pages {
    height: 18px;
    width: 18px;
    border-radius: 20px;
    background-color: #C7D5E6;
}

#current_page {
    height: 20px;
    width: 36px;
    background-color: #00459E;
    border-radius: 20px;
}
</style>