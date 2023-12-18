<template>
    <Page title="Share On Magic" name="share-on-magic">
        <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
        <PopupModal :active="active" height="350px" class="popupQuestion">
          <h1 class="popupQuestion__title">{{this.question.text}}</h1>
          <h3 class="popupQuestion__text" >send the link and share the question:</h3>
          <NuxtLink :to="{
            name:'QuestionPage',
            params: {question: question}
          }" 
          >
          <!-- הקישור שנשלח לוואצאפ לא עובד -->
            <ShareNetwork 
            @open="open"
            network="whatsapp" 
            url="https://ting.global.com/QuestionPage?question=question" 
            title="I would like to invite you to play with me in Share On Magic challenge"
            description="Answer the pop-up question and rate your friends` answers."
            >
            <i :class="'fab fah fa-lg fa-whatsapp'"></i>
            <span>whatsapp {{this.question.id}}</span>
            </ShareNetwork>
          </NuxtLink>
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
        }
    },
    props: {
        active: Boolean
    },
    methods: {
      async getQuestion(){
        this.active = true;
        const res= await this.$axios.$post("/xapi",{
          getQuestion:true
        })
        this.question = {
          text: res.text,
          id: res.qnum,
          answers: res.answers
        }
      }
    },
    components: { Page }
}
</script>

<style lang="scss">
.popupQuestion{

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
    background-color:#25D366;
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