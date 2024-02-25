<template>
    <div id="qa_list_container">
        <div id="qa_header_container">
            <img :src="imageGenerator" alt="QA-Image" draggable="false" id="qaImage">
            <h2>{{ qaContent.header }}</h2>
        </div>
        <template>
            <div v-for="(item, index) in qaContent.questions" :key="index">
                <h3 @click="previewParagraph(index)" class="question_header">- {{ item.question }}</h3>
                <p v-if="showParagraph[index]" class="paragraph_styles">
                    {{ item.answer }}
                    <a v-if="item.questionLink" :href="`${qaContent.questionLink}`" class="link">
                        {{ item.linkText }}
                    </a>
                </p>
            </div>
        </template>

        <hr>
        <div id="footer_warper">
            <p style="color:#00459e; font-weight: 500;">
                {{ qaContent.footer }}
                <a :href="`${qaContent.footerLink}`" class="link">
                    Event
                </a> 🌟
            </p>
            <action-button @click="prevPage" id="prev_page_button" :color="'blue'"> &larr; Go Back </action-button>
        </div>
    </div>
</template>
  
<script>
import Page from '../layout/Page.vue';
import s3AssetsMixin from '~/mixins/s3AssetsMixin';
import ActionButton from '../UI/ActionButton.vue';
import qaContent from '~/assets/data/beneficialAgiQA';

export default {
    mixins: [ s3AssetsMixin ],
    components: { Page, ActionButton },
    data() {
        return {
            showParagraph: [],
            qaContent
        }
    },
    computed: {
        imageGenerator() {
            return this.s3AssetsGenerator('images/beneficialAgiQA.png')
        },
    },
    methods: {
        prevPage() {
            this.$emit('prev-page');
        },
        previewParagraph(index) {
            this.$set(this.showParagraph, index, !this.showParagraph[index]);
        },
    },
}
</script>
  
<style lang="scss">
$primary-color: #00459e;
$secondary-color: #4c9cd4;
$light-gray: lightgray;

#qa_list_container {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 20px 20px;
    box-shadow: 2px 2px 15px 2px $secondary-color;
    gap: 20px;

    @include respond(mobile) {
        text-align: center;
    }

    @include respond(tablet) {
        text-align: center;
    }

    hr {
        border: 1px solid $secondary-color
    }

    #qa_header_container {
        width: fit-content;
        margin: auto;
        display: flex;
        align-items: center;
        color: white;
        background-color: $secondary-color;
        margin-bottom: 20px;
        border-radius: 20px;
        gap: 10px;
        padding: 10px 10px;
        box-shadow: 2px 2px 2px 2px $light-gray;

        #qaImage {
            border-radius: 20px;
            width: 50px;
        }
    }

    .question_header {
        color: $primary-color;
        font-weight: 600;
        border-bottom: 1px solid $light-gray;
        width: 100%;
        border-radius: 20px;
        display: inline-block;
        // background: linear-gradient(to right, white 5%, #4c9cd4 95%);
    }

    .paragraph_styles {
        font-weight: 500;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        padding: 0px 15px 20px 20px;
        border-radius: 20px;
        color: #323233;
        background: #f2f2f2;
        white-space: pre-line;
    }

    .link {
        color: $primary-color;
        text-decoration: underline;
    }

    #prev_page_button {
        width: 200px;
        height: 40px;
        font-weight: 600;
        color: white;
        color: $primary-color;
        background: linear-gradient(to right, white 5%, #4c9cd4 95%);
        animation: scaleInOut 3s infinite ease-in-out;

        @include respond(mobile) {
            margin-top: 20px;
        }

        @include respond(tablet) {
            margin-top: 20px;
        }
    }

    #footer_warper {
        display: flex;
        align-items: center;
        gap: 200px;

        @include respond(mobile) {
            display: block;
            margin: 1rem;
            text-align: center;
        }

        @include respond(tablet) {
            display: block;
            margin: 1rem;
            text-align: center;
        }
    }
}
</style>