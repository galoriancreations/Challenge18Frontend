<template>
    <Page title="Singularity Magic" name="singularity-magic">
        <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
        <PopupModal :active="active" height="400px" class="popupQuestion">
            <h1 class="popupQuestion__title">{{ this.question.text }}</h1>
            <div class="popupQuestion__body">
                <BaseButton variant="blue">
                    <NuxtLink :to="{
                        name: 'QuestionPage',
                        params: { question: question, checkPage: checkPage }
                    }" class="popupQuestion__text">
                        q-{{ this.question.id }} TO answer
                    </NuxtLink>
                </BaseButton>
                <img width="100px" height="100px" :src="image" @click="shareQuestion">
            </div>
            <!-- <BaseButton variant="blue" @click="shareQuestion">share WhatsApp</BaseButton> -->
            <BaseButton variant="blue" @click="getQuestion">change question</BaseButton>
        </PopupModal>
    </Page>
</template>
  
<script>
import BaseButton from "~/components/UI/BaseButton.vue";
import Page from "~/components/layout/Page.vue";
import popupModal from "~/mixins/popup-modal";
import image from "~/assets/images/whatsapp.jpg";

export default {
    mixins: [popupModal],
    data() {
        return {
            checkPage: true,
            question: {},
            qId: false,
            image:image,
        }
    },
    props: {
        active: Boolean
    },
    methods: {
        async getQuestion() {
            const queryString = window.location.search;
            console.log(queryString);
            const urlParams = new URLSearchParams(queryString);
            this.qId = urlParams.get('qId')
            console.log(this.qId);
            if (!this.qId) {
                this.qId = false
            }
            this.active = true;
            const res = await this.$axios.$post("/xapi", {
                qId: this.qId,
                getSingularity: true
            })
            this.question = {
                questionId:res._id,
                text: res.text,
                id: res.qnum,
                answers: res.answers
            }
        },
        shareQuestion() {
            const shareUrl = window.location.href + `?qId=${this.question.id}`
            const shareText = 'Want to see some mAGIc? 🪄✨';
            // Create the WhatsApp share URL
            const whatsappUrl = `https://wa.me?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`;
            window.open(whatsappUrl)
        }

    },
    components: { Page, BaseButton }
}
</script>
  
<style lang="scss">
.popupQuestion {

    &__title {
        color: $color-blue-2;
        font-size: 3rem;
        margin-bottom: 3rem;
    }

    &__text {
        text-align: center;
        margin-bottom: 1rem;
    }



    .button {
        width: 20rem;
        margin-top: 3rem;
    }
}
</style>