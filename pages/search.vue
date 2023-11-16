<template>
     <Page title="Search" name="players">
     <div class="searchSelect">
          <div  >
               <input class="input" type="text" v-model="userInput" @input="sendRequest"
               :placeholder="`Search ${filterType} ...`">
          </div>
          
          <div>
               <select v-model="filterType">
               <option value="courses">Courses</option>
               <option value="players" v-if="user">Players</option    >
          </select>
          </div>
         
     </div>

          <!-- <v-app>
               <v-data-table v-if="userInput !== '' && filterType === 'players'" :headers="filteredHeaders" :items="items"
                    hide-default-footer disable-pagination item-key="_id">
                    <template v-slot:[`item.totalScore`]="{ item }">
                         <strong>{{ item.totalScore }}</strong>
                    </template>
                    <template v-slot:[`item.username`]="{ item }">
                         <BaseButton @click="passData(item)" variant="white">
                              <strong>{{ item.userName }}</strong>
                         </BaseButton>
                    </template>
               </v-data-table>

          </v-app> -->
          <v-app class="list">
               <div v-if="userInput !== '' && filterType === 'courses'">
                    <ul>
                         <li v-for="(item, index) in items" :key="index">
                              <strong>{{ item.name }}</strong>
                         </li>
                    </ul>
               </div>
               <div v-if="userInput !== '' && filterType === 'players'">
                    <ul>
                         <li v-for="(item, index) in items" :key="index">
                              <strong>{{ item.userName }}</strong>
                         </li>
                    </ul>
               </div>
          </v-app>

     </Page>
</template>

<script>
export default {
     data() {
          return {
               user: this.$store.getters.isAuth,
               userInput: '',
               items: [],
               filterType: 'courses',
          };
     },
     computed: {
          filteredHeaders() {
               if (this.filterType === 'players') {
                    return [
                         {
                              text: "Total Score",
                              value: "totalScore",
                              align: "center",
                              sortable: false,
                         },
                         {
                              text: "Username",
                              value: "username",
                              align: "center",
                         },
                    ];
               } else if (this.filterType === 'courses') {
                    return [
                         { text: "Names", value: "names", align: "center" },
                    ];
               }
          },
     },
     watch: {
          filterType() {
               this.userInput = '';
          },
     },
     methods: {
          passData(item) {
               this.$router.push({
                    path: `/players/player/${item.rank}`,
                    query: item,
               });
          },
          async sendRequest() {
               try {
                    const response = await this.$axios.$post("/api", {
                         permissions: this.filterType,
                         search: true,
                         input: this.userInput,
                         
                    });
                    if (Array.isArray(response)) {
                         this.items = response.slice(0, 15)
                    } else {
                         console.error('Response is not an array:', response);
                    }
               } catch (error) {
                    console.error('Error:', error);
               }
          },


     },
};
</script>
<!-- this.$store.getters.isAuth -->
<style>
.input {
     background: lightblue;
     padding: 20px;
     color: white;  
     
}
select{
     margin-left: 10px;
     width: 100px;
     height: 50px;
     text-align: center;
     font-weight: bold;
     border: 3px solid lightblue;
     
}

.searchSelect{
    display: flex; 
    align-items: center;
    margin-left: 35%;
    
}
.list{
  margin-left: 40% ;   
  margin-top: 5%;
}
</style>