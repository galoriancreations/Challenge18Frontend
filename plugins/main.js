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

import Page from "../components/layout/Page";
import BaseButton from "../components/UI/BaseButton";
import ActionButton from "../components/UI/ActionButton";
import IconButton from "../components/UI/IconButton";
import BaseSpinner from "../components/UI/BaseSpinner";
import WhiteSection from "../components/layout/WhiteSection";
import SectionHeading from "../components/layout/SectionHeading";
import DashboardSection from "../components/layout/DashboardSection";
import DashboardModal from "../components/layout/DashboardModal";
import Notifications from "../components/layout/Notifications";
import Notification from "../components/UI/Notification";
import WavePatternBottom from "../components/extras/WavePatternBottom";
import WavePatternTop from "../components/extras/WavePatternTop";
import SectionSeperator from "../components/extras/SectionSeperator";
import ErrorMessage from "../components/UI/ErrorMessage";

Vue.use(VueGoodTable);
Vue.use(VueAgile);
Vue.use(VueYoutube);
Vue.use(Vuescroll);
Vue.directive("linkified", linkify);
Vue.component("v-select", vSelect);
Vue.use(TextareaAutosize);

Vue.component("Page", Page);
Vue.component("BaseButton", BaseButton);
Vue.component("ActionButton", ActionButton);
Vue.component("IconButton", IconButton);
Vue.component("BaseSpinner", BaseSpinner);
Vue.component("WhiteSection", WhiteSection);
Vue.component("SectionHeading", SectionHeading);
Vue.component("DashboardSection", DashboardSection);
Vue.component("DashboardModal", DashboardModal);
Vue.component("Notifications", Notifications);
Vue.component("Notification", Notification);
Vue.component("WavePatternBottom", WavePatternBottom);
Vue.component("WavePatternTop", WavePatternTop);
Vue.component("SectionSeperator", SectionSeperator);
Vue.component("ErrorMessage", ErrorMessage);

Vue.prototype.$vuescrollConfig = {
    bar: { background: "#000c66" }
};
