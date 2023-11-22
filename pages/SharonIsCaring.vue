<template>
    <Page title="Sharon is Caring" name="sharon-is-caring">
       
        <button @click="randomQuestion">Question</button>
        <p>{{ }}</p>
        <button>share your question</button> <br>
        <label>your answer:</label> <br>
        <input type="text" placeholder="enter your answer" v-model="answer">
        <br>
        <button>click to show more answers</button>
        
       
    </Page>
    <!-- <Page title="Sharon is Caring" name="sharon-is-caring"> -->
        <!-- <BaseButton @click="randomQuestion">Pop a random question</BaseButton>
        <PopupModal :active="showModal">
            {{ questions[i].text }}
            <div> // לענות תשובה
                <label for="answer">
                    your answer
                    <input type="text" placeholder="enter your answer" v-model="answer">
                </label>
                <button @click="addAnswer" >share your answer</button>
            </div>
            <div> // אם עניתי יש אפשרות לראות עוד תשובות
                <button @click="getAnswers" >more answers</button>
                <ul>
                    <li v-for="x in answers" showAnswer="false">{{ x }}</li>
                </ul>
            </div>
            <div>
                <p>
                    share the question
                    Link:
                </p>
            </div>
        </PopupModal> -->
    <!-- </Page> -->
</template>

<script>
import questions from "~/assets/data/100questions";
import BaseButton from "~/components/UI/BaseButton.vue";
import Page from "~/components/layout/Page.vue";
import PopupModal from "~/components/layout/PopupModal.vue";
import popupModal from "~/mixins/popup-modal";

export default {
    mixins: [popupModal],
    data() {
        return {
            questions,
            answer: "",
            answers: [],
            showAnswer: false
        };
    },
    methods: {
        randomQuestion() {
            showModal = true;
            let i = Math.floor(Math.random() * 95);
            return i;
        },
        addAnswer() {
            this.answers.push(this.answer),
                this.answer = "";
        },
        getAnswers() {
            this.showAnswer = !this.showAnswer;
        }
    },
    components: { Page, BaseButton, PopupModal }
}

</script>

<style>
</style>