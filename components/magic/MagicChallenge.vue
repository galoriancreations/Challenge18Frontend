<template>
  <div>
    <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
    <PopupModal :active="localActive" height="400px" class="popupQuestion">
      <h1 class="popupQuestion__title">{{ question.text }}</h1>
      <div class="popupQuestion__body">
        <div class="btn-container">
          <BaseButton class="btn" >
            <NuxtLink :to="{
              name: 'QuestionPage',
              params: { question: question, challenge: challenge }
            }">
            click to answer {{ question.answer }}
            </NuxtLink>
          </BaseButton>
          <BaseButton class="whatsapp-btn">Share on<img width="100px" height="100px" :src="image" @click="shareQuestion"></BaseButton>
          <BaseButton class="btn" @click="getQuestion">change question</BaseButton>
        </div>
      </div>
    </PopupModal>
  </div>
</template>

<script>
import BaseButton from "~/components/UI/BaseButton.vue";
import Page from "~/components/layout/Page.vue";
import popupModal from "~/mixins/popup-modal";
import image from "~/assets/images/whatsapp.jpg";

export default {
  mixins: [popupModal],
  components: { Page, BaseButton },
  data() {
    return {
      question: {},
      qId: false,
      image: image,
      localActive: this.active
    }
  },
  props: {
    active: Boolean,
    challenge: String
  },
  methods: {
    async getQuestion() {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.qId = urlParams.get('qId');

        if (!this.qId) {
          this.qId = false;
        }

        this.localActive = true;
        const response = await this.$axios.$post("/magicgame/getQuestion", {
          qId: this.qId,
          challenge: this.challenge
        });

        const { answers, qnum, text, _id } = response.result;
        this.question = { questionId: qnum, id: _id, answers: answers, text: text };
        return response;
      } catch (err) {
        console.error('Failed To Get Question', err);
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
   
  }

  .whatsapp-btn {
    border-radius: 10%;
    color: green;
    width: 130px;
    padding: 5px
  }

  .btn {
    border-radius: 15%;
    height: 80px;
    width: 100px;
    padding: 5px;
  }

  .btn-container{
    display: flex;
    padding: 0px 20px;
  }
}
</style>
