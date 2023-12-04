<template>
    <div class="container">
        <h3>{{ answer.userName}}</h3>
        <p>{{ answer.text}}</p>
    </div>
</template>

<script>

export default {
    props: {
        answer: Object
    },
}
</script>


<style  lang="scss"> 
.container{
    color: $color-blue-2;
    background: #f4f4f4;
    margin: 5px;
    padding: 10px 20px;
    box-shadow: $boxshadow2;
    width: 500rem;
}
p{
    color: black;
    padding-left: 20px;
}

</style>