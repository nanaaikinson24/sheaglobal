import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import VueSweetalert2 from "vue-sweetalert2";

//jQuery & bootstrap
window.$ = window.jQuery = require("jquery");
import "bootstrap";

var owlCarousel = require("@/assets/js/owl.carousel.min.js");
var owlCarouselThumb = require("@/assets/js/owl.carousel2.thumbs.min.js");

//App scss
import "@/assets/scss/app.scss";

//Globals
global.APIURL = "https://sheaglobaltrading.com/sheaglobal/admin/api/";

//Vue use
Vue.use(VeeValidate);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
