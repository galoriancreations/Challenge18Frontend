<template>
  <DashboardSection title="My Drafts" class="my-drafts">
    <div v-if="!hasDrafts" class="my-challenges__empty">
      <p>
        Unpublished drafts of your challenges will appear here.
      </p>
    </div>
    <div v-else class="my-challenges__table-container">
      <vue-good-table
        class="results-table my-challenges__table"
        :columns="columns"
        :rows="drafts"
        theme="polar-bear"
        max-height="46rem"
        :fixed-header="fixedHeader"
      />
    </div>
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject } from "../../assets/util/functions";
import Scrollbar from "smooth-scrollbar";

export default {
  data() {
    return {
      columns: [
        { field: "id", label: "ID", sortable: false },
        { field: "name", label: "Name", sortable: false },
        { field: "language", label: "Language", sortable: false }
      ],
      scrollbar: null,
      fixedHeader: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    drafts() {
      return dataArrayFromObject(this.user.drafts);
    },
    hasDrafts() {
      return this.user?.drafts && this.drafts?.length > 0;
    },
    table() {
      return this.$el.querySelector(".vgt-responsive");
    }
  },
  methods: {
    manageTableScrollbar() {
      if (this.hasDrafts) {
        this.scrollbar = Scrollbar.init(this.table);
      }
    },
    adjustTableHeader() {
      this.fixedHeader = window.innerWidth > 1000;
    }
  },
  mounted() {
    setTimeout(() => {
      this.manageTableScrollbar();
      this.adjustTableHeader();
    }, 100);
    window.addEventListener("resize", this.adjustTableHeader);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.manageTableHeader);
  }
};
</script>
