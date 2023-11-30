<template>
    <div class="botMessage" >
        <h1>{{ msginfo ? msginfo : botMessage }}</h1>
        <br>
        <h1>{{ emojiInfo ? send+emojiInfo : emoji }}</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            botMessage:'bot message',
            emoji:'',
            send:'to complete send '
        }
    },
    props: {
    msginfo: String,
    emojiInfo: String,
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
</style>






