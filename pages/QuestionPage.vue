<template>
    <Page v-bind:title="this.question.text" name="question-page">
        <AddAnswer :question="this.question" :active="showModal" :challenge="this.challenge" @publish-answer="publishAnswer" />
        <div v-if="!showModal">
            <AllAnswers :id="this.question.id" :answers="this.question.answers" :challenge="this.challenge" />
            <NuxtLink to='/magic' class="btn">share another question</NuxtLink>
        </div>
    </Page>
</template>

<script>
import Page from "~/components/layout/Page.vue";

export default {
    components: { Page },
    meta: {
        requiresAuth: true
    },
    data() {
        return {
            showModal: true,
            question: this.$route.params.question,
            challenge: this.$route.params.challenge
        }
    },
    methods: {
        publishAnswer(answers) {
            this.question.answers = answers
            this.showModal = false;
        },
        async getAnswers() {
            const response = await this.$axios.$post("/magicgame/getQuestion", {
                qId: this.qId,
                challenge: this.challenge
            })
            const { answers, qnum, text, _id } = response.result;

            this.question = {
                questionId: qnum,
                id: _id,
                answers,
                text
            }
            console.log(response)
            return response;
        }
    },
}

</script>

<style lang="scss">
.btn {
    display: block;
    width: 25rem;
    text-transform: uppercase;
    font: inherit;
    font-size: 1.5rem;
    font-weight: 500;
    color: #fff;
    letter-spacing: 1.3px;
    border-radius: 100px;
    border: 1.5px solid transparent;
    transition: all 0.5s;
    text-align: center;
    cursor: pointer;
    padding: 0.85rem 3rem;
    margin: auto;
    background-color: $color-blue-3;
    color: #fff;

    @include respond(mobile) {
        font-size: 1.4rem;
    }


    &:hover {
        background-color: #fff;
        color: $color-azure;
        box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;
    }

    &--white:hover {
        background-color: #cce4fc;
        color: $color-blue-2;
    }

    &--outline {
        background-color: #fff;
        color: $color-blue-3;
        border: 1.5px solid $color-blue-3;

        &:hover {
            background-color: #cce4fc;
            color: $color-blue-2;
            border-color: #cce4fc;
        }
    }

    &:disabled,
    &:disabled:hover {
        background-color: #fff;
        border: 1.5px solid #ccc;
        color: #ccc;
        box-shadow: none;
        cursor: initial;
    }

    &.view-all-button {
        margin-top: 5rem;
        font-size: 1.5rem;
        font-weight: 600;
        width: 22rem;

        @include respond(mobile) {
            margin-top: 4rem;
            font-size: 1.3rem;
        }
    }
}
</style>