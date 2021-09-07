import Vue from "vue";

import VueGoodTable from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
import VueAgile from "vue-agile";
import VueYoutube from "vue-youtube";
import Vuescroll from "vuescroll";
import linkify from "vue-linkify";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import TextareaAutosize from "vue-textarea-autosize";

Vue.use(VueGoodTable);
Vue.use(VueAgile);
Vue.use(VueYoutube);
Vue.use(Vuescroll);
Vue.directive("linkified", linkify);
Vue.component("v-select", vSelect);
Vue.use(TextareaAutosize);

Vue.prototype.$vuescrollConfig = {
    bar: { background: "#000c66" }
};
