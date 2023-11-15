<template>
    <div class="botMessage" >
        <h1>{{ msginfo ? msginfo : botMessage }}</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            botMessage:'bot message',
            
        }
    },
    props: {
    msginfo: String,
  },
}
</script>
<style lang="scss">
.botMessage{
    background-color: #4cc1ff;
    min-height: 100px;
    border-radius: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>






