<template>
    <Page title="Sharon is Caring" name="sharon-is-caring">
        <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
        <PopupModal :active="active" height="350px" class="popupQuestion">
            <h1 class="popupQuestion__title">{{this.text}}</h1>
            <h3 class="popupQuestion__text" >send the link and share thw question:</h3>
            <NuxtLink :to="{
              name:'QuestionPage',
              params: {ques:text}
            }" 
            class="popupQuestion__text">
              Qlick to answer
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
            text: '',
        }
    },
    props: {
        active: Boolean
    },
    methods: {
      async getQuestion(){
        const res= await this.$axios.$post("/xapi",{
          getQuestion:true
        })
        this.text=res
        // console.log(res);
        this.active = true;
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
    text-decoration: underline;
    color: $color-blue-2;
    transition: color 0.5s;

    &:hover {
      color: $color-gold-3;
    }
  }

  .button {
    width: 20rem;
    margin-top: 3rem;
  }
}
</style>