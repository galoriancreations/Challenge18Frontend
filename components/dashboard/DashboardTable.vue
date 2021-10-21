<template>
  <div class="my-challenges__table-container">
    <v-app>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="search-field"
      />
      <v-data-table
        :value="selected"
        @input="$emit('input', $event)"
        :search="search"
        :headers="headers"
        :items="items"
        show-select
        class="elevation-2"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div class="my-challenges__actions">
            <DashboardButton
              v-for="(action, key) in item.actions"
              :key="key"
              :type="key"
              @click="action"
            />
          </div>
        </template>
        <template v-slot:[`item.newChallenge`]="{ item }">
          <DashboardButton type="clone" @click="item.newChallenge" />
        </template>
        <template v-slot:[`item.clone`]="{ item }">
          <DashboardButton type="clone" @click="item.clone" />
        </template>
        <template v-slot:[`item.edit`]="{ item }">
          <DashboardButton type="edit" @click="item.edit" />
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <DashboardButton type="delete" @click="item.delete" />
        </template>
      </v-data-table>
    </v-app>
    <DeleteSelectedButton :disabled="!selected.length" />
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
      search: ""
    };
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
