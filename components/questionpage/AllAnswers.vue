<template>
    <DashboardSection title="All Answers">
        <div v-if="answers && answers.length">
            <Answer class="container" v-for="item in answers" :key="item.id" :answer="item" @update-likes="updateLikes" />
        </div>
    </DashboardSection>
</template>
<script>
export default {
    props: {
        answers: Array,
        id: String,
        challenge: String
    },
    methods: {
        async updateLikes(updateAnswer) {
            try
            {
                const response = await this.$axios.$put("/magicgame/updateLikes", {
                    challenge: this.challenge,
                    question: this.id,
                    id: updateAnswer.id,
                    likes: updateAnswer.likes
                });
                return response;
            }
            catch(err) 
            {
                console.error('Error Update Likes:', err);
                return [];
            }
        },
    },

}
</script>
