import Vue from "vue";

import VueAgile from "vue-agile";
import VueYoutube from "vue-youtube";
import Vuescroll from "vuescroll";
import linkify from "vue-linkify";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import TextareaAutosize from "vue-textarea-autosize";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

Vue.use(VueAgile);
Vue.use(VueYoutube);
Vue.use(Vuescroll);
Vue.directive("linkified", linkify);
Vue.component("VueSelect", VueSelect);
Vue.use(TextareaAutosize);

Vue.prototype.$vuescrollConfig = {
    bar: { background: "#000c66" }
};
