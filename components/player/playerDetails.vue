<template>
     <div class="container-player-details">
          <h1 class="title line padding10">{{ item.userName }}</h1>
          <h4 class="line padding10">IFERS</h4>
          <h4 class="line padding10">SCORE : {{ item.totalScore }}</h4>
          <h4 class="line padding10">Awards</h4>
     </div>
</template>

<script>
export default {
     props: ['item'],
}
</script>

<style>
.container-player-details {
     background-color: #41B4EE;
     padding: 10px;
     width: 100%;
     display: flex;
     flex-direction: column;
     gap: 20%;
}

.title {
     border-top: 2px solid black;
}

.line {
     border-bottom: 2px solid black;
}

.padding10 {
     padding: 10;
}
</style>