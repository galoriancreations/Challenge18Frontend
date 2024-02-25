<template>
    <PopupModal :active="active" height="400px" class="popupAnswer">
      <h1 class="popupAnswer__title">{{question.text}}</h1>
      <textarea
        class="popupAnswer__input"
        v-model="answer"
        placeholder="enter your answer"
      />        
      <BaseButton variant="blue" @click="onPublish">publish</BaseButton>
    </PopupModal>
</template>


<script>
import popupModal from "~/mixins/popup-modal";

export default {
    mixins: [popupModal],  
    data(){
        return{
            answer: '',
            id: this.question.questionId,
            qnumber: this.question.id
        }
    },
    props: {
        active: Boolean,
        question: Object,
        challenge: String
    },
    methods: {
      async onPublish(e){
        e.preventDefault()
        const response = await this.$axios.$post("/magicgame/updateAnswer",{
            challenge: this.challenge,
            question: this.id,
            answer: this.answer
          })
          console.log(this.question)
        if(!this.answer) return alert('Please add a answer');
        
        const { answers } = response.result;
        this.$emit('publish-answer' , answers);
        console.log(answers)
        return response 
        }
    },

}
</script>

<style lang="scss">
.popupAnswer{

 &__title {
    color: $color-blue-2;
    font-size: 3rem;
    margin-bottom: 3rem;
  }

  &__input {
    outline: none;
    border: 2px solid #ccc;
    border-radius: 0.5rem;
    width: 100%;
    padding: 0.75rem 0;
    font: inherit;
    font-size: 2rem;
    text-align: center;
    display: block;
    transition: all 0.5s;

    @include respond(mobile) {
      font-size: 2.8rem;
    }

    &:focus {
      border-color: $color-azure;
    }
  }

  .button {
    width: 20rem;
    margin-top: 3rem;
  }
}
</style>