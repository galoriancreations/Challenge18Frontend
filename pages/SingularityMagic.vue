מפצ <template>
    <Page title="Singularity Magic" name="singularity-magic">
        <BaseButton variant="blue" @click="getQuestion">Pop a random question</BaseButton>
        <PopupModal :active="active" height="400px" class="popupQuestion">
            <h1 class="popupQuestion__title">question {{ this.question.id }}</h1>
            <h1 class="popupQuestion__title">{{ this.question.text }}</h1>
            <h3 class="popupQuestion__text">send the link and share the question:</h3>
            <NuxtLink :to="{
                name: 'QuestionPage',
                params: { question: question }
            }" class="popupQuestion__text">
                <BaseButton variant="blue">Qlick to answer</BaseButton>
            </NuxtLink>
            <BaseButton variant="blue" @click="getQuestion">change question</BaseButton>
        </PopupModal>
    </Page>
</template>
  
<script>
import BaseButton from "~/components/UI/BaseButton.vue";
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
        async getQuestion() {
            this.active = true;
            const res = await this.$axios.$post("/xapi", {
                getSingularity: true
            })
            this.question = {
                text: res.text,
                id: res.qnum,
                answers: res.answers
            }
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