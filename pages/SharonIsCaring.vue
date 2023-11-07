<template>
    <Page title="Sharon is Caring" name="sharon-is-caring">
        <BaseButton @click="randomQuestion">Pop a random question</BaseButton>
        <PopupModal :active="showModal">
            {{questions[i].text}}
            <p>
                share the question
                Link: 
            </p>
        </PopupModal>
    </Page>
</template>

<script>
import questions from "~/assets/data/100questions";
import popupModal from "~/mixins/popup-modal";

export default {
    mixins: [popupModal],
    data() {
        return { 
            questions
        };
    },
    methods:{
        randomQuestion(){
            showModal = true
            let i = Math.floor(Math.random() * 95);
            return i;
        }
    }
}
</script>