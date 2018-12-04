<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row" v-if="contentLoaded">
                <div class="col-md-12">

                    <table class="table table-responsive-sm table-responsive-md ">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, i) in orderItems" :key="i">
                                <td>
                                    #{{ item.orderno }}
                                </td>
                                <td>
                                    {{ item.date_created }}
                                </td>
                                <td>
                                    {{ orderStatus(item.orderstatus) }}
                                </td>

                                <td>
                                    {{ paymentStatus(item.paymentstatus) }}
                                </td>
                                <td>
                                    AED {{ item.totalcost }}
                                </td>
                                <td>
                                    <!-- <button class="btn btn-success btn-sm" v-if="payBtn(item.paymentstatus)">
                                        Pay
                                    </button> -->
                                    <router-link :to="`/account/orders/${item.orderno}`" class="btn btn-success btn-sm ml-2">
                                        View
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                        
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

import axios from "axios";

export default {
  components: { heroBanner: TopHeroBanner, Spinner },
  name: "Orders",
  data() {
    return {
      title: "Order History",
      orderItems: [],
      itemCount: 4,
      contentLoaded: false
    };
  },
  metaInfo() {
    return {
      title: this.title
    };
  },
  methods: {
    fetchUserOrders() {
      let user = JSON.parse(localStorage.getItem("userData"));
      if (user !== null || undefined !== user || user !== "") {
        axios
          .get(APIURL + "account/user/orders/" + user.mask)
          .then(response => {
            this.contentLoaded = true;
            let res = response.data;

            if (res.status == 200) {
              this.orderItems = res.orders;
            }
          });
      }
    },
    orderStatus(val) {
      if (val == 1) {
        return "Delivered";
      }
      if (val == 2) {
        return "Shipped";
      }
      if (val == 3) {
        return "Pending";
      }
      if (val == 4) {
        return "Cancelled";
      }
    },
    paymentStatus(val) {
      if (val == 1) return "Pending";
      if (val == 2) return "On Hold";
      if (val == 3) return "Paid";
      if (val == -1) return "Expired";
      if (val == -2) return "Cancelled";
      if (val == -3) return "Declined";
    },
    payBtn(val) {
      if (val == 1) return true;
      if (val == 2) return false;
      if (val == 3) return false;
      if (val == -1) return true;
      if (val == -2) return true;
      if (val == -3) return true;
    }
  },
  created() {
    this.fetchUserOrders();
  }
};
</script>
