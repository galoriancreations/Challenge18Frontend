<template>
    <div>

        <div id="video_container">
            <iframe ref="iframe" :src="beneficialVideoLinks" height="476" style="border: none;"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
            <div id="btns_container">
                <button class="btns" @click="generateBeneficialVideoLinks"> <i class="fas fa-sync"></i> </button>
            </div>
            <div>
                <a :href="randomFacebookLink" target="_blank">
                    <button @click="generateRandom" id="facebook_btn"> Share ..3..2
                        <i class="fab fa-facebook facebook_btn_icon" dir="ltr"></i>
                    </button>
                </a>
            </div>
            <action-button @click="nextPage" id="qa_button" color="action-button"> &quest; </action-button>
        </div>
    </div>
</template>

<script>

import ActionButton from '../UI/ActionButton.vue';
import beneficialVideoLinks from '~/assets/data/beneficialVideoLinks';
import beneficialFacebookUrl from '~/assets/data/beneficialFacebookUrl'

export default {
    components: { ActionButton },

    data() {
        return {
            beneficialVideoLinks,
            beneficialFacebookUrl,
            randomFacebookLink: '',
        }
    },

    methods: {
        nextPage() {
            this.$emit('next-page');
        },

        generateRandom() {
            const randomLinkIndex = Math.floor(Math.random() * this.beneficialFacebookUrl.length);
            this.randomFacebookLink = this.beneficialFacebookUrl[randomLinkIndex].url;
        },

        generateBeneficialVideoLinks() {
            const randomSourceIndex = Math.floor(Math.random() * this.beneficialVideoLinks.length);
            const randomSource = this.beneficialVideoLinks[randomSourceIndex];
            this.$refs.iframe.src = randomSource;
        }
    },

    mounted() {
        this.generateBeneficialVideoLinks();
    }
}
</script>

<style lang="scss">
#video_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    height: 94vh;
    width: 100%;
    background-color: rgb(231, 229, 229);

    #btns_container {
        height: fit-content;
        display: flex;
        gap: 20px;

        button {
            color: #00459E;
            border: 2px solid #00459E;
            border-radius: 12px;
            padding: 10px 70px;
            font-size: 1.75rem;
            font-weight: bold;
        }
    }

    #facebook_btn {
        display: flex;
        align-items: center;
        color: white;
        padding: 25px 85px;
        border-radius: 20px;
        font-weight: 900;
        font-size: 20px;
        background-color: #00459E;


        .facebook_btn_icon {
            height: fit-content;
            color: white;
            font-size: 25px;
            border-radius: 20px;
            margin-left: 5px;
        }
    }

    #qa_button {
        color: #00459E;
        font-weight: 600;
        font-size: 26px;
        position: absolute;
        right: 10%;
        bottom: 39%;

        @include respond(tablet) {
            bottom: 43.5%;
        }

        @include respond(tablet-land) {
            bottom: 48.5%;
        }
    }
}
</style>