<template>
     <div class="container-player-details">
          <img class="user-image" :src="getImageUrl()" alt="user photo">
          <h1 class="title line padding10">{{ item.userName }}</h1>
          <h4 class="line padding10">IFERS</h4>
          <h4 class="line padding10">SCORE : {{ item.totalScore }}</h4>
          <h4 class="line padding10">Awards</h4>
     </div>
</template>
   
<script>
export default {
     data() {
          return {
               user: this.$store.getters,
          };
     },
     async created() {
          await this.asyncData();
          console.log('Component created');
     },
     methods: {
          async asyncData() {
               try {
                    const response = await this.$axios.$post("/api", { getUser: true, phone: this.item.phone });
                    this.user = response.user;
                    console.log(this.user?.image?.data);
               } catch (error) {
                    console.error('Error fetching data:', error);
               }
          },
          getImageUrl() {
               return `data:${this.user?.image?.contentType};base64,${this.user?.image?.data}`;
          },
     },
     props: ['item'],
};
</script>
   

<style>
.container-player-details {
     background-color: #85d0f5;
     padding: 10px;
     display: flex;
     width: 100%;
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

.user-image {
     border: 8px solid rgb(28, 117, 166);
     border-radius: 50%;
     /* Creates a circular border */
     width: 200px;
     /* Set the width of the image */
     height: 200px;
     /* Set the height of the image */
     object-fit: cover;
     /* Maintain aspect ratio and cover the container */
     display: block;
     /* Removes extra space below the image */
     margin: 0 auto;
     /* Centers the image horizontally */
}
</style>