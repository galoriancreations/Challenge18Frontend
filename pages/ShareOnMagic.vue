<template>
  <Page title="Share On Magic" name="share-on-magic">
    <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
    <PopupModal :active="active" height="400px" class="popupQuestion">
      <h1 class="popupQuestion__title">{{ this.question.text }}</h1>
      <!-- <h3 class="popupQuestion__text">send the link and share the question:</h3> -->
      <NuxtLink :to="{
        name: 'QuestionPage',
        params: { question: question }
      }">
        <!-- הקישור שנשלח לוואצאפ לא עובד -->
        <!-- <ShareNetwork 
            @open="open"
            network="whatsapp" 
            url="https://ting.global.com/QuestionPage?question=question" 
            title="I would like to invite you to play with me in Share On Magic challenge"
            description="Answer the pop-up question and rate your friends` answers."
            >
            <i :class="'fab fah fa-lg fa-whatsapp'"></i> -->
        <span>q-{{ this.question.id }} TO answer</span>
        <!-- </ShareNetwork> -->
      </NuxtLink>
      <BaseButton variant="blue" @click="shareQuestion">share WhatsApp</BaseButton>
      <BaseButton variant="blue" @click="getQuestion">change question</BaseButton>
    </PopupModal>
  </Page>
</template>

<script>
import Page from "~/components/layout/Page.vue";
import popupModal from "~/mixins/popup-modal";

export default {
  mixins: [popupModal],
  data() {
    return {
      question: {},
      qId:false
    }
  },
  props: {
    active: Boolean
  },
  methods: {
    // checkId(){
    //   const queryString = window.location.search;
    //   console.log(queryString);
    //   const urlParams = new URLSearchParams(queryString);
    //   this.qId = urlParams.get('qId')
    // },
    async getQuestion() {
      const queryString = window.location.search;
      console.log(queryString);
      const urlParams = new URLSearchParams(queryString);
      this.qId = urlParams.get('qId')
      console.log(this.qId);

      this.active = true;
      const res = await this.$axios.$post("/xapi", {
        getQuestion: true
      })
      this.question = {
        text: res.text,
        id: res.qnum,
        answers: res.answers
      }
    },
    shareQuestion() {
      // console.log(window.location.href);
      // Define the content you want to share
      const shareText = 'Check out this awesome content!';
      const shareUrl = window.location.href +`?qId=${this.question.id}`
      // Create the WhatsApp share URL
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)};`
      const share_url = `https://wa.me?text=${encodeURIComponent(shareUrl)}`;
      // const webWhatsappUrl = `https://web.whatsapp.com://send?text=${shareUrl}`
      // console.log(webWhatsappUrl);
      // const whatsappUrl = `intent://scan/#Intent;scheme=whatsapp://send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)};S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.whatsapp;end`
      // Open WhatsApp with the share URL
      // "intent://scan/#Intent;scheme=whatsapp://send?#text=text=some%20text;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.whatsapp;end"
      // <button onclick="window.open('https://web.whatsapp.com://send?text=This is whatsapp sharing example using button')"> Open WhatsApp </button>    
      window.location.href = whatsappUrl
      setTimeout(() => {
        window.open(share_url)
      }, 3000);
      
    }
  },
  // mounted(){
  //   this.checkId()
  // },
  components: { Page }
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

  a {
    padding: 5px;
    border-radius: 5px;
    background-color: #25D366;
    color: white;
    transition: background-color 0.5s;

    &:hover {
      background-color: #128C7E;
    }
  }

  .button {
    width: 20rem;
    margin-top: 3rem;
  }
}
</style>