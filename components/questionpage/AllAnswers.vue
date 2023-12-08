<template>
    <DashboardSection title="All Answers" >
        <Answer 
        v-for="item in answers"
        :key="item.member"
        :answer="item"
        />
  </DashboardSection>

</template>

<script>
export default {
    props: {
        answers: Array
    },
}
</script>

<style lang="scss">

</style>