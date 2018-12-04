<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row">
                <div class="col-md-12 col-lg-10 offset-lg-1 checkout-accordion">
                    <div class="text-center">
                        <img :src="SuccessIcon" alt="..." width="50" height="50" class="mb-4">
                        <h2>Thank You</h2>
                        <h5>Your order has been placed</h5>

                        <p>You'll receive an email containing your order details shortly</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var aboutImg = require("@/assets/img/about03.jpg");
var SuccessIcon = require("@/assets/img/success.svg");
import TopHeroBanner from "@/components/TopHeroBanner.vue";

import axios from "axios";

export default {
  components: {
    heroBanner: TopHeroBanner
  },
  name: "Success",
  data() {
    return {
      title: "Payment Success",
      contentLoaded: false,
      isError: false,
      SuccessIcon
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
