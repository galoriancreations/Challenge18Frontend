<template>
    <Page title="Sharon is Caring" name="sharon-is-caring">
<<<<<<< HEAD
       
        <button class="btn" @click="randomQuestion">Question</button>
        <p>{{ }}</p>
        <button>share your question</button> <br>
        <label>your answer:</label> <br>
        <input type="text" placeholder="enter your answer" v-model="answer">
        <br>
        <button>click to show more answers</button>
=======
        <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
        <PopupModal :active="active" height="350px" class="popupQuestion">
            <h1 class="popupQuestion__title">{{this.text}}</h1>
            <h3 class="popupQuestion__text" >send the link and share thw question:</h3>
            <NuxtLink to='/questionpage' class="popupQuestion__text">question{{this.id}}</NuxtLink>
            <BaseButton variant="blue" @click="getQuestion">change question</BaseButton>
        </PopupModal>
>>>>>>> 8c0b05903812175f18cc06165e7bc56890d445f0
    </Page>
</template>

<script>
import questions from "~/assets/data/100questions";
import Page from "~/components/layout/Page.vue";
import popupModal from "~/mixins/popup-modal";

export default {
    mixins: [popupModal],
    data() {
        return {
            questions,
            text: '',
            id: ''
        }
    },
    props: {
        active: Boolean
    },
    methods: {
        getQuestion(){
            this.active = true;
            let i = Math.floor(Math.random() * 94);

            this.text = this.questions[i].text,
            this.id = this.questions[i].id
        }
    },
    components: { Page }
}

</script>

<<<<<<< HEAD
<style scoped>

=======
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
>>>>>>> 8c0b05903812175f18cc06165e7bc56890d445f0
</style>