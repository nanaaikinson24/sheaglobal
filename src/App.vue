<template>
    <div id="app">

        <!-- Empty cart loader -->
        <div class="site-empty-cart" style="display: none">
            <div class="child-loader">
                <div class="loader-card pl-3 pt-2 d-flex flex-row">
                    <img :src="loadingIcon" height="30" class="pt-2">
                    <p class="pl-4 pt-2">Emptying cart</p>
                    
                </div>
            </div>
        </div>

        <!-- Update cart loader -->
        <div class="site-update-cart" style="display: none">
            <div class="child-loader">
                <div class="loader-card pl-3 pt-2 d-flex flex-row">
                    <img :src="loadingIcon" height="30" class="pt-2">
                    <p class="pl-4 pt-2">Updating cart</p>
                    
                </div>
            </div>
        </div>

        <!-- Remove from cart loader -->
        <div class="site-remove-cart" style="display: none">
            <div class="child-loader">
                <div class="loader-card pl-3 pt-2 d-flex flex-row">
                    <img :src="loadingIcon" height="30" class="pt-2">
                    <p class="pl-4 pt-2">Removing from cart</p>
                    
                </div>
            </div>
        </div>


        <!-- Process Order -->
        <div class="site-process-order" style="display: none">
            <div class="child-loader">
                <div class="loader-card pl-3 pt-2 d-flex flex-row">
                    <img :src="loadingIcon" height="30" class="pt-2">
                    <p class="pl-4 pt-2">Processing...</p>
                    
                </div>
            </div>
        </div>



        <app-header></app-header>
            <router-view :key="$route.fullPath"/>
        <app-footer></app-footer>

        <to-top></to-top>

    </div>
</template>

<script>
import { mapActions } from "vuex";
var favicon = require("./assets/img/sheaLogo.png");
var loadingIcon = require("./assets/icons/tail-spin.svg");

import Header from "./components/templates/Header";
import Footer from "./components/templates/Footer";
import BackToTop from "./components/BackToTop";

let moment = require("moment");

export default {
  name: "App",
  components: {
    appHeader: Header,
    appFooter: Footer,
    toTop: BackToTop
  },
  data() {
    return {
      loadingIcon
    };
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Shea Global",
    // all titles will be injected into this template
    titleTemplate: "%s | Shea Global",
    link: [{ rel: "icon", href: favicon }]
  },
  methods: {
    ...mapActions([
      "CHECK_FOR_CART_STORAGE",
      "CHECK_FOR_USER_STORAGE",
      "SET_USER_DATA_GLOBAL"
    ])
  },
  created() {
    this.CHECK_FOR_CART_STORAGE();
    this.CHECK_FOR_USER_STORAGE();
    this.SET_USER_DATA_GLOBAL();
  }
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./assets/css/owl.carousel.min.css";
@import "./assets/css/owl.theme.default.min.css";
@import "./assets/fonts.css";
@import "./assets/themify-icons.css";
</style>
