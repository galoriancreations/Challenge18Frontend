<template>
    <DashboardSection title="All Answers">
        <div>
            <Answer class="container" v-for="item in answers" :key="item.id" :answer="item" @update-likes="updateLikes" />
        </div>
    </DashboardSection>
</template>
<script>
export default {
    props: {
        answers: Array,
        id: String
    },
    methods: {
        async updateLikes(updateAnswer) {
            try
            {
                const response = await this.$axios.$put("/magicgame/updateLikes", {
                    qnum: this.id,
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

        async getAnswers() {
            try 
            {
                const response = await this.$axios.$post("/magicgame/getQuestion", {
                    qnum: this.id
                });
                const { answers } = response.result;
                console.log(response)
                return answers;
            } 
            catch (err) 
            {
                console.error("Error fetching answers:", err);
                return [];
            }
        }
    },

    async mounted() {
        const res = await this.getAnswers();
        console.log(res);
    }
}
</script>
