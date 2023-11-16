<template>
     <div class="container-player-details">
          <img class="user-image" src="https://www.milkround.com/advice/wp-content/uploads/how-to-take-a-good-linkedin-photo-1024x576.jpg" alt="user photo">
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
     background-color: #85d0f5;
     padding: 10px;
     display: flex;
     width:100%;
     flex-direction: column;
     gap: 8%;
}

.title {
     border-top: 2px solid black;
     text-align: center;
}

.line {
     border-bottom: 2px solid black;
}

.padding10 {
     padding: 10;
}

.user-image{
     border: 8px solid rgb(28, 117, 166);
     border-radius: 50%; /* Creates a circular border */
            width: 200px; /* Set the width of the image */
            height: 200px; /* Set the height of the image */
            object-fit: cover; /* Maintain aspect ratio and cover the container */
            display: block; /* Removes extra space below the image */
            margin: 0 auto; /* Centers the image horizontally */
}
</style>