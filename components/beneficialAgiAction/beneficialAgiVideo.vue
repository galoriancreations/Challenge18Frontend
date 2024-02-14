<template>
    <div>

        <div id="video_container">
                <iframe ref="iframe" :src="iframeSources" height="476" style="border: none;"  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            <div id="btns_container">
                <!-- <button class="btns">Additional Actions</button> -->
                <!-- <button class="btns"> &quest; </button> -->
                
                <!-- <button class="btns">?What are we doing here </button> -->
                <button class="btns" @click="generateIframeSources"> <i class="fas fa-sync"></i> </button>
            </div>
            <div>
                <a :href="randomFacebookLink" target="_blank">
                    <button @click="generateRandomLinks" id="facebook_btn"> Share ..3..2
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
import {iframeSources} from '../../utilities/video-links';
import links from '../../mock/Facebook-Groups-Mock-Url.json'
// download xlsx package to excel.

export default {
  components: { ActionButton },

    data() {
        return {
            iframeSources: iframeSources,
            srcLinks: links,
            randomFacebookLink: '',
        }
    },

    methods: {
        nextPage() {
            this.$emit('next-page');
        },

        generateRandomLinks() {
            const randomLinkIndex = Math.floor(Math.random() * this.srcLinks.length);
            this.randomFacebookLink = this.srcLinks[randomLinkIndex].url;
        },

        generateIframeSources() {
            const randomSourceIndex = Math.floor(Math.random() * this.iframeSources.length);
            const randomSource = this.iframeSources[randomSourceIndex];
            this.$refs.iframe.src = randomSource;
        }
    },

    mounted() {
        this.generateIframeSources();
    }
}
</script>

<style>
#video_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    height: 94vh;
    width: 100%;
    background-color: rgb(231, 229, 229);
}

#btns_container {
    height: fit-content;
    display: flex;
    gap: 20px;
}

.btns {
    color: #00459E;
    border: 2px solid #00459E;
    border-radius: 12px;
    padding: 10px 102px;
    font-size: 1.75rem;
    font-weight: bold;
}

#facebook_btn {
    display: flex;
    align-items: center;
    color: white;
    padding: 25px 150px;
    border-radius: 20px;
    font-weight: 900;
    font-size: 20px;
    background-color: #00459E;
}

.facebook_btn_icon {
    height: fit-content;
    color: white;
    font-size: 25px;
    border-radius: 20px;
    margin-left: 5px;
}

#qa_button {
    color: #00459E;
    font-weight: 600;
    font-size: 26px;
    position: absolute;
    right: 10%;
    bottom: 39%;
}
</style>