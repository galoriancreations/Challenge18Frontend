<template>
  <div v-if="user" class="container-player-details">
    <img class="user-image" :src="getImageUrl()" alt="user photo">
    <h1 class="title line padding10">{{ this.user.username }}</h1>
    <h4 class="line padding10">IFERS</h4>
    <h4 class="line padding10">SCORE : {{ this.user.totalScore }}</h4>
    <h4 class="line padding10">Awards</h4>
  </div>
  <p v-else>Loading...</p>
</template>
   
<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    // Call the async function to fetch user data
    await this.asyncData();
  },
  methods: {
    async asyncData() {
      try {
        // Use debugger or console.log to debug and check if this part is reached
        const response = await this.$axios.$post("/api", {
          getUser: true,
          phone: this.$props.item.phone,
        });
        // Set the user data if the response is successful
        this.user = response.user;
        console.log(this.user)
        // Uncomment the following line if you want to log the response
        // console.log(response);
      } catch (error) {
        // Log an error if there's an issue with the API request
        console.error('Error fetching data:', error);
      }
    },
    getImageUrl() {
      // Check if user and user image are available before constructing the URL
      return this.user ? `data:${this.user?.image?.contentType};base64,${this.user?.image?.data}` : '';
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