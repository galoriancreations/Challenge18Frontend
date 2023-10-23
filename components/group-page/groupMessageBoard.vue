<template>
     <div class="my-challenges__table-container">
       <!-- <v-app>
         
         <v-data-table
           :value="selected"
           @input="$emit('input', $event)"
           :search="search"
           :headers="headers"
           :items="items"
           show-select
           class="elevation-2"
           item-key="_id"
         > -->
           <!-- <template v-slot:[`item.actions`]="{ item }"> -->
             <!-- <div class="my-challenges__actions"> -->
               <!-- <groupboardButton
                 v-for="(action, key) in item.actions"
                 :key="key"
                 :type="key"
                 @click="action"
               /> -->
             <!-- </div> -->
           <!-- </template> -->
           <!-- <template v-slot:[`item.edit`]="{ item }">
             <groupboardButton type="edit" @click="item.edit" />
           </template> -->
         <!-- </v-data-table> -->
       <!-- </v-app>  -->
       <!-- <DeleteSelectedButton :disabled="!selected.length" /> -->
       <!-- <div> -->
         <!-- {{ for (let i = 0; i < 20; i++) {
         } }} -->
         <h2 id="h2"></h2>
         <input type="text" placeholder="input" id="input">
         <button @click = 'sendMessage'>Send</button>
         <!-- <v-text-field
           v-model="search"
           append-icon="mdi-magnify"
           label="Input"
           single-line
           hide-details
           class="search-field" -->
         <!-- /> -->
       <!-- </div> -->
   
     </div>
   </template>
   
   <script>
   export default {
     model: {
       prop: "selected",
       event: "input"
     },
     props: {
       selected: Array,
       headers: Array,
       items: Array
     },
     data() {
       return {
         search: "",
       };
     },
     computed: {
       group() {
           return this.$cookies.get("groupId");
       },
     },
     methods: {
       async sendMessage() {
         const groupid = this.group._id
         const response = await this.$axios.$post("/xapi", { sendMessage: {
           message: document.getElementById('input').value,
           _id: groupid
         }});
         document.getElementById('input').value = ''
         document.getElementById('h2').innerHTML = response.msg
       },
     }
   };
   </script>
   
   <style lang="scss">
   .my-challenges {
     &__table-container {
       margin-bottom: 1.5rem;
       width: 100%;
       align-self: flex-start;
       & > .button {
         margin-top: 4rem !important;
         i {
           margin-right: 0.5rem;
         }
       }
       .search-field {
         padding: 0;
         margin: 0 auto 5rem;
         width: 100%;
         max-width: 55rem;
         @include respond(mobile) {
           margin-bottom: 4rem;
         }
       }
     }
     &__actions {
       display: flex;
       & > .dashboard-button {
         margin: 0;
         &:not(:last-child) {
           margin-right: 0.75rem;
         }
       }
     }
   }
   </style>