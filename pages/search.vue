<template>
     <Page title="Search" name="players">
          <input type="text" class="input" v-model="userInput" @input="sendRequest"
               :placeholder="`Search ${filterType} ...`">
          <select v-model="filterType">
               <option value="courses">Courses</option>
               <option value="players" v-if="user">Players</option>
          </select>

          <v-app>
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

          </v-app>
          <v-app>
               <div v-if="userInput !== '' && filterType === 'courses'">
                    <ul>
                         <li v-for="(item, index) in items" :key="index">
                              <strong>{{ item.name }}</strong>
                         </li>
                    </ul>
               </div>
               <!-- <div v-if="userInput !== '' && filterType === 'players'">
                    <ul>
                         <li v-for="(item, index) in items" :key="index">
                              <strong>{{ item.userName }}</strong>
                         </li>
                    </ul>
               </div> -->
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
                    console.log(this.$store._vm.user);
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
   
<style>
.input {
     background: lightblue;
     padding: 20px;
     color: white;
     display: flex;
     margin: auto;
}
</style>