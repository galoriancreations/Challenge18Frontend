<template>
    <DashboardSection title="All Answers">
        <div >
            <Answer class="container"
            v-for="item in answers"
            :key="item.id"
            :answer="item"
            @update-likes="updateLikes"
            />
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
        async updateLikes(updateAnswer){
            console.log(updateAnswer);
            
            await this.$axios.$post("/magicgame/updateLikes",{
                    qnum: this.id,
                    id: updateAnswer.id,
                    likes: updateAnswer.likes
            })
      }
    }
}
</script>

<style lang="scss">
.container{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 75rem;
}
</style>