<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row" v-if="contentLoaded">
                <!-- items -->
                <div class="col-md-8 cart-card px-3 py-4">
                    <order-item 
                        v-for="(orderItem, i) in order.requests" :key="i"
                        :orderItem="orderItem"
                    />
                </div>

                <!-- order details -->
                <div class="col-md-4">
                    <div class="card" style="background-color: #fff; box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);">
                        <div class="card-body">
                            <div class="order-details-container d-flex flex-row mb-3 justify-content-between">
                                <div class="subtotal-title">
                                    Subtotal
                                </div>

                                <div class="subtotal-price">
                                    AED {{ order.subtotal }}
                                </div>
                            </div>

                            <!-- <div class="order-details-container d-flex flex-row mb-3 justify-content-between">
                                <div class="shipping-title">
                                    Estimated Shipping
                                </div>

                                <div class="shipping-price">
                                    AED {{ order.shippingcost }}
                                </div>
                            </div>

                            <div class="order-details-container d-flex flex-row  justify-content-between">
                                <div class="vat-title">
                                    Vat
                                </div>

                                <div class="vat-price">
                                    AED {{ order.tax }}
                                </div>
                            </div> -->

                            <hr class="">

                            <div class="order-details-container d-flex flex-row  mb-4 justify-content-between">
                                <div class="total-title">
                                    <h6>Total</h6>
                                </div>

                                <div class="total-price">
                                    <h6>AED {{ order.totalcost }}</h6>
                                </div>
                            </div>

                            <div class="cart-btn" v-if="payBtn(order.paymentstatus)">
                                <div class="text-center mb-3">
                                    <button class="btn btn-success" @click="completeOrder">
                                        Complete Order 
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>


            <div class="row" style="height: 400px;" v-if="!contentLoaded">
                <div class="col-md-12 text-center">
                    <spinner></spinner>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
var aboutImg = require("@/assets/img/about03.jpg");
import TopHeroBanner from "@/components/TopHeroBanner.vue";
import Spinner from "@/components/Bspinner.vue";
import OrderItem from "@/components/OrderItem.vue";

import axios from "axios";

export default {
  components: { heroBanner: TopHeroBanner, Spinner, OrderItem },
  name: "Order",
  data() {
    return {
      title: "Order #" + this.$route.params.orderno.trim(),
      order: {},
      contentLoaded: false,
      hasError: false
    };
  },
  metaInfo: {
    title: "Order History"
  },
  methods: {
    fetchOrderDetails() {
      let orderno = this.$route.params.orderno.trim();
      if (!orderno) {
        this.hasError = true;
        return;
      }

      axios
        .get(APIURL + "account/user/order/" + orderno)
        .then(response => {
          let res = response.data;

          if (res.status == 200) {
            this.contentLoaded = true;
            this.hasError = false;
            this.order = res.order;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    payBtn(val) {
      if (val == 1) return true;
      if (val == 2) return false;
      if (val == 3) return false;
      if (val == -1) return true;
      if (val == -2) return true;
      if (val == -3) return true;
    },

    completeOrder() {
      $(".site-process-order").show();

      axios.get(APIURL + `order/pay/${this.order.orderno}`).then(response => {
        let res = response.data;

        if (res.status == 200) {
          window.location.href = "" + res.link;
        } else {
          $(".site-process-order").hide();
          this.$swal("Error", res.msg, "error");
        }
      });
    }
  },
  created() {
    this.fetchOrderDetails();
  }
};
</script>
