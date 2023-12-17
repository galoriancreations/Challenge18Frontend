<template>
  <div class="messages" :id="msginfo.index" :style="messageStyle">
    <!-- <div style="display: flex;"> -->
      <h3 >{{ msginfo.msg }}</h3>
    <!-- </div> -->
    <p>user: {{ msginfo.nickname }}</p>
  </div>
</template>
  
<script>
export default {
  props: {
    msginfo: Object,
  },
  meta: {
    requiresAuth: true,
  },
  computed: {
    messageStyle() {
      return {
        // direction: this.msginfo.myMessage ? 'rtl' : 'initial',
        whiteSpace: "pre-line",
        marginRight: this.msginfo.myMessage ? '15px' : 'initial',
        marginLeft: this.msginfo.myMessage ? 'auto' : 'initial',
        backgroundColor: this.msginfo.botMessage ? '#4cc1ff' : '#bababaa8',
      };
    },
  },
};
</script>

<style lang="scss">
.messages {
  background-color: #bababaa8;
  margin: 15px;
  padding: 5px;
  border-radius: 5px;
  min-width: 300px;
  max-width: 85%;
  width: min-content;
  box-shadow: #00000047 -5px 5px 6px 0px;
}
</style>
  