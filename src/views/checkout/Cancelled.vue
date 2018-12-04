<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row">
                <div class="col-md-12 col-lg-10 offset-lg-1 checkout-accordion">
                    <div class="text-center">
                        <img :src="cancelledIcon" alt="..." width="50" height="50" class="mb-4">
                        <h5>You have cancelled this order</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var aboutImg = require("@/assets/img/about03.jpg");
var cancelledIcon = require("@/assets/img/error.svg");
import TopHeroBanner from "@/components/TopHeroBanner.vue";

import axios from "axios";

export default {
  components: {
    heroBanner: TopHeroBanner
  },
  name: "Cancelled",
  data() {
    return {
      title: "Payment Cancelled",
      contentLoaded: false,
      isError: false,
      cancelledIcon
    };
  },
  computed: {
    //User is logged in
    userIsLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {}
};
</script>
