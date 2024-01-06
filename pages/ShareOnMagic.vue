<template>
  <Page title="Share On Magic" name="share-on-magic">
    <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
    <PopupModal :active="active" height="400px" class="popupQuestion">
      <h1 class="popupQuestion__title">{{ this.question.text }}</h1>
      <NuxtLink :to="{
        name: 'QuestionPage',
        params: { question: question }
      }">
        q-{{ this.question.id }} TO answer
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
        getQuestion: true
      })
      this.question = {
        text: res.text,
        id: res.qnum,
        answers: res.answers
      }
    },
    shareQuestion() {
      const shareUrl = window.location.href +`?qId=${this.question.id}`
      // Create the WhatsApp share URL
      const whatsappUrl = `https://wa.me?text=${encodeURIComponent(shareUrl)}`;
      window.open(whatsappUrl)
    }
  },
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