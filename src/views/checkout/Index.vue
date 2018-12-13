<template>
  <div>
    <hero-banner :title="title"></hero-banner>

    <div class="container my-5">
      <div class="row">
        <div class="col-md-12 col-lg-10 offset-lg-1 checkout-accordion">
          <form-wizard
            @on-complete="onComplete"
            shape="tab"
            color="#43C13E"
            title
            subtitle
            nextButtonText="Continue"
            backButtonText="Previous"
            finishButtonText="Proceed"
            stepSize="lg"
            :startIndex="startIndex"
            error-color="#ff0033"
          >
            <!-- login -->
            <tab-content title="Login" icon="ti-user" :beforeChange="validateLoginTab">
              <div class="row" v-show="!userIsLoggedIn">
                <div class="col-md-8 offset-md-2 my-4">
                  <div class="loginMsg"></div>

                  <form>
                    <div class="form-group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="form-control"
                        placeholder="E-Mail*"
                        v-model="loginData.email"
                      >
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        class="form-control"
                        placeholder="Password*"
                        v-model="loginData.password"
                      >
                    </div>
                    <div class="form-group">
                      <router-link to="/account">Not a member? Sign Up</router-link>
                    </div>
                  </form>
                </div>
              </div>

              <div class v-show="userIsLoggedIn">
                <p class="text-center">You are logged in</p>
              </div>
            </tab-content>

            <!-- delivery -->
            <tab-content title="Delivery Info" icon="ti-truck" :beforeChange="validateShippingTab">
              <div class="mb-5 row">
                <div class="col-md-12 col-lg-8 offset-lg-2">
                  <p>
                    NB: Fields marked
                    <span class="text-danger">*</span> are required
                  </p>
                  <form class="checkout-form">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for>
                            First Name
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            class="form-control"
                            placeholder="First Name *"
                            v-model="shippingData.fname"
                            v-validate="'required'"
                            data-vv-as="full name"
                          >
                          <span class="text-danger">{{ errors.first('firstname') }}</span>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label for>
                            Last Name
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            class="form-control"
                            placeholder="Last Name *"
                            v-model="shippingData.lname"
                            v-validate="'required'"
                            data-vv-as="full name"
                          >
                          <span class="text-danger">{{ errors.first('lastname') }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for>
                        Address
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        class="form-control"
                        placeholder="Address Line 1 *"
                        v-model="shippingData.address"
                        v-validate="'required'"
                        data-vv-as="address line 1"
                      >
                      <span class="text-danger">{{ errors.first('address') }}</span>
                    </div>

                    <div class="form-group">
                      <label for>Address Line 2</label>
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        class="form-control"
                        placeholder="Address Line 2"
                        v-model="shippingData.address2"
                      >
                    </div>

                    <div class="row">
                      <div class="col-lg-12">
                        <label for>
                          Delivery Method
                          <span class="text-danger">*</span>
                        </label>
                        <div class="form-group">
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="deliverymethod2"
                              name="deliverymethod2"
                              class="custom-control-input"
                              value="1"
                              v-model="shippingData.deliverymethod"
                            >
                            <label class="custom-control-label" for="deliverymethod2">Pickup</label>
                          </div>
                          <div class="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="deliverymethod1"
                              name="deliverymethod1"
                              class="custom-control-input"
                              value="2"
                              v-model="shippingData.deliverymethod"
                            >
                            <label
                              class="custom-control-label"
                              for="deliverymethod1"
                            >Home & Office Delivery</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row animated fadeIn" v-if="shippingData.deliverymethod == 2">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for>
                            Country
                            <span class="text-danger">*</span>
                          </label>
                          <select
                            name="country"
                            id="country"
                            class="form-control custom-select"
                            v-model="shippingData.country"
                            v-validate="'required'"
                            data-vv-as="country"
                          >
                            <option value="AE">United Arab Emirates</option>
                          </select>
                          <span class="text-danger">{{ errors.first('country') }}</span>
                        </div>
                      </div>

                      <div class="col-lg-6">
                        <div class="form-group">
                          <label for>
                            City
                            <span class="text-danger">*</span>
                          </label>
                          <select
                            name="city"
                            id="city"
                            class="form-control"
                            v-model.trim="shippingData.city"
                            v-validate="'required'"
                            data-vv-as="city"
                          >
                            <option value>Select city</option>
                            <option
                              v-for="(city, i) in cities"
                              :key="i"
                              :value="city.value"
                            >{{ city.name }}</option>
                          </select>
                          <!-- <input type="text" name="city" id="city" class="form-control"
														v-model.trim="shippingData.city"
														v-validate="'required'"
														data-vv-as="city"
                          >-->
                          <span class="text-danger">{{ errors.first('city') }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for>
                        Phone
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        class="form-control"
                        placeholder="Phone *"
                        v-model="shippingData.phone"
                        v-validate="'required|numeric'"
                        data-vv-as="phone"
                      >
                      <span class="text-danger">{{ errors.first('phone') }}</span>
                    </div>
                  </form>
                </div>
              </div>
            </tab-content>

            <!-- order -->
            <tab-content title="Order Summary" icon="ti-list">
              <div class="row mb-5">
                <div class="col-md-12 col-lg-8">
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">QTY</th>
                        <th scope="col">ITEM</th>
                        <th scope="col">PRICE (AED)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <order-summary-item
                        v-for="(item, i) in orderCartItems"
                        :key="i"
                        :item="item"
                      />
                    </tbody>
                  </table>
                </div>

                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between mb-3">
                        <div></div>
                        <h6>AED</h6>
                      </div>
                      <div class="d-flex justify-content-between mb-3">
                        <div>Subtotal</div>
                        <div>{{ subtotal.toFixed(2) }}</div>
                      </div>

                      <div class="d-flex justify-content-between mb-3">
                        <div>Shipping</div>
                        <div>{{ shipping.toFixed(2) }}</div>
                      </div>

                      <!-- <div class="d-flex justify-content-between">
                        <div>Vat</div>
                        <div>{{ tax.toFixed(2) }}</div>
                      </div>-->
                      <hr>

                      <div class="d-flex justify-content-between">
                        <h6>Total</h6>
                        <h6>{{ total.toFixed(2) }}</h6>
                      </div>
                    </div>
                  </div>

                  <div class="mt-3">
                    <p>
                      <strong>Do you have a voucher?</strong>
                    </p>
                    <div class="input-group">
                      <input
                        type="text"
                        name="voucher"
                        id="voucher"
                        class="form-control"
                        placeholder="Enter voucher"
                        v-model.trim="voucher"
                        ref="voucherinput"
                      >
                      <span class="input-group-append">
                        <button
                          class="btn btn-success"
                          type="button"
                          @click="applyVoucher($event)"
                        >Add</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </tab-content>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var aboutImg = require("@/assets/img/about03.jpg");
import TopHeroBanner from "@/components/TopHeroBanner.vue";
import Shipping from "@/components/checkout/Shipping.vue";
import Login from "@/components/checkout/Login.vue";
import OrderSummaryItem from "@/components/OrderSummaryItem.vue";
import swal from "sweetalert";

import axios from "axios";
import _ from "lodash";
import voucherValidator from "@/coupon.js";

//local registration form-wizard
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  components: {
    heroBanner: TopHeroBanner,
    Shipping,
    FormWizard,
    TabContent,
    Login,
    OrderSummaryItem
  },
  name: "Index",
  data() {
    return {
      title: "Checkout",
      loginData: { email: "", password: "" },
      shippingData: {
        fname: "",
        lname: "",
        address: "",
        address2: "",
        city: "",
        country: "AE",
        phone: "",
        deliverymethod: 1
      },
      paymentType: "",
      voucher: ""
    };
  },
  metaInfo: {
    title: "Checkout",
    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css"
      }
    ]
  },
  computed: {
    cities() {
      return this.$store.getters.citiesGetter;
    },

    //User is logged in
    userIsLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    //Tab index
    startIndex() {
      if (this.$store.getters.isLoggedIn) {
        return 1;
      } else {
        return 0;
      }
    },

    //Cart items
    orderCartItems() {
      return this.$store.getters.cartGetter;
    },

    //Subtotal
    subtotal() {
      return this.$store.getters.subtotalGetter;
    },

    tax() {
      return this.$store.getters.taxGetter;
    },

    shipping() {
      return this.$store.getters.shippingGetter;
    },

    //calculate total
    total() {
      //return this.subtotal + this.shipping + this.tax;
      return this.subtotal + this.shipping;
    }
  },
  watch: {
    "loginData.email"(newVal, oldVal) {
      $(".s-v-em").remove();
    },
    "loginData.password"(newVal, oldVal) {
      $(".s-v-ep").remove();
    },
    voucher(newVal, oldVal) {
      if (newVal) {
        $(".voucher-error").remove();
      }
    }
  },
  methods: {
    // Apply voucher
    applyVoucher(event) {
      const btn = event.currentTarget;

      if (!this.voucher) {
        $(btn)
          .removeAttr("disabled")
          .removeClass("is-loading is-loading-sm");
        $(this.$refs.voucherinput)
          .closest(".input-group")
          .after(
            `<small class="text-danger voucher-error d-block">No voucher code was entered</small>`
          );
        return false;
      }

      $(btn)
        .attr("disabled", "")
        .addClass("is-loading is-loading-sm");
      $(
        ".wizard-footer-right button.wizard-btn, .wizard-footer-left button.wizard-btn"
      ).attr("disabled", "");
      axios
        .get(APIURL + "products/voucher/apply/" + this.voucher)
        .then(response => {
          const res = response.data;
          $(btn)
            .removeAttr("disabled")
            .removeClass("is-loading is-loading-sm");
          $(
            ".wizard-footer-right button.wizard-btn, .wizard-footer-left button.wizard-btn"
          ).removeAttr("disabled");

          if (res.status === 400) {
            $(this.$refs.voucherinput)
              .closest(".input-group")
              .after(
                `<small class="text-danger voucher-error d-block">${
                  res.msg
                }</small>`
              );
            return false;
          }

          const validatedCoupon = voucherValidator(res.code);

          if (validatedCoupon.status == 400) {
            $(this.$refs.voucherinput)
              .closest(".input-group")
              .after(
                `<small class="text-danger voucher-error d-block">${
                  validatedCoupon.msg
                }</small>`
              );
            setTimeout(() => {
              $(".voucher-error").fadeOut(() => {
                $(this).remove();
              });
            }, 2500);
            return false;
          } else {
            // Set shipping
            if (validatedCoupon.shipping) {
              this.$store.dispatch(
                "SET_SHIPPING_DATA",
                validatedCoupon.shipping
              );

              $(this.$refs.voucherinput)
                .closest(".input-group")
                .after(
                  `<small class="text-success voucher-success d-block">${
                    validatedCoupon.msg
                  }</small>`
                );

              return;
            }

            // Set subtotal
            if (validatedCoupon.subtotal) {
              console.log(validatedCoupon.subtotal);
              this.$store.commit("setSubtotalPrice", validatedCoupon.subtotal);

              $(this.$refs.voucherinput)
                .closest(".input-group")
                .after(
                  `<small class="text-success voucher-success d-block">${
                    validatedCoupon.msg
                  }</small>`
                );
              return;
            }
          }
        })
        .catch(err => console.log(err));
    },
    //validate login
    validateLoginTab() {
      $(".s-v-e").remove();
      $(".s-v-ep").remove();
      $(".s-v-em").remove();

      if (this.$store.getters.isLoggedIn) {
        return true;
      }

      let regExEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (this.loginData.email && this.loginData.password) {
        if (regExEmail.test(this.loginData.email)) {
          let params = new URLSearchParams();
          let _res;
          params.append("email", this.loginData.email);
          params.append("password", this.loginData.password);

          $(".wizard-footer-right button.wizard-btn").attr("disabled", "");

          axios
            .post(APIURL + "account/signin", params)
            .then(response => {
              $(".wizard-footer-right button.wizard-btn").removeAttr(
                "disabled"
              );
              let res = response.data;

              if (res.status == 200) {
                let userData = {
                  firstname: res.data.firstname,
                  lastname: res.data.lastname,
                  email: res.data.email,
                  access_token: res.data.access_token,
                  mask: res.data.mask
                };
                this.$store.dispatch("SET_USER_DATA", userData);
                window.localStorage.setItem(
                  "userData",
                  JSON.stringify(userData)
                );

                return true;
              } else {
                if (res.status == 403) {
                  $.each(res.errors, function(k, v) {
                    $("#" + k).after(v);
                  });
                } else if (res.status == 204) {
                  $(".loginMsg").html(
                    '<p class="text-danger text-center" id="loginMsg">' +
                      res.msg +
                      "</p>"
                  );
                  setTimeout(() => {
                    $("#loginMsg").fadeOut(function() {
                      $(this).remove();
                    });
                  }, 5000);
                } else {
                  let html = `<p class="text-info" id="loginMsg">${
                    res.msg
                  }. Click here to </p>`;
                  $(".loginMsg").html(html);
                  setTimeout(() => {
                    $("#loginMsg").fadeOut(function() {
                      $(this).remove();
                    });
                  }, 5000);
                }
                return false;
              }
            })
            .catch(err => {
              console.log(err);
              return false;
            });
          return _res;
        } else {
          $("#email").after(
            '<span class="text-danger s-v-em">Please enter a valid email address</span>'
          );
          return false;
        }
      } else {
        $("#email").after(
          '<span class="text-danger s-v-em">The email field is required</span>'
        );
        $("#password").after(
          '<span class="text-danger s-v-ep">The password field is required</span>'
        );

        return false;
      }
    },

    //Validate tab
    onComplete() {
      swal("Select payment method", {
        buttons: {
          cash: {
            text: "Cash on delivery",
            value: "cash"
          },
          card: {
            text: "Card",
            value: "card"
          },
          cancel: {
            text: "Cancel",
            closeModal: true
          }
        }
      }).then(value => {
        switch (value) {
          case "cash":
            this.proceedWithPayOnDelivery();
            break;

          case "card":
            this.proceedWithCard();
            break;
        }
      });
    },

    //Validate shipping
    validateShippingTab() {
      let shipping = 0;
      if (parseInt(this.shippingData.deliverymethod) === 2) {
        let city = this.shippingData.city;
        if (city.toLowerCase() == "dubai") {
          shipping += 10;
        } else {
          shipping += 25;
        }
      }

      this.$store.dispatch("SET_SHIPPING_DATA", shipping);
      return this.$validator.validateAll();
    },

    proceedWithCard() {
      this.paymentType = "card";
      this.processPayment();
    },

    proceedWithPayOnDelivery() {
      this.paymentType = "cash";
      this.processPayment();
    },

    // Process payment
    processPayment() {
      $(".wizard-footer-right button.wizard-btn").attr("disabled", "");
      $(".wizard-footer-left button.wizard-btn").attr("disabled", "");

      let cart = this.$store.state.cart;

      let user = this.$store.state.userData.mask;
      let voucher = this.$store.state.vouchercode;
      let params = new URLSearchParams();
      params.append("cart", JSON.stringify(cart));
      params.append("shipping", JSON.stringify(this.shippingData));
      params.append("user", user);
      params.append("paymentmethod", this.paymentType);
      params.append("subtotal", this.$store.state.subtotalprice);

      if (voucher) {
        params.append("voucher", voucher);
      }

      $(".site-process-order").css({ display: "block" });

      axios
        .post(APIURL + "pay", params)
        .then(response => {
          let res = response.data;

          if (res.status == 200) {
            this.$store.dispatch("EMPTY_CART");
            window.location.href = "" + res.link;
          } else {
            $(".wizard-footer-right button.wizard-btn").removeAttr("disabled");
            $(".wizard-footer-left button.wizard-btn").removeAttr("disabled");
            $(".site-process-order").hide();

            this.$swal("Error", res.msg, "error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getDeliveryInfo() {
      let delivery = this.$store.getters.getDeliveryInfo;
      if (!_.isEmpty(delivery)) {
        this.shippingData = {
          fname: delivery.firstname,
          lname: delivery.lastname,
          address: delivery.address,
          address2: delivery.address2,
          city: delivery.city,
          country: delivery.country,
          phone: delivery.phone
        };
      }
    }
  },
  created() {
    this.getDeliveryInfo();
  },
  destroyed() {
    this.$store.dispatch("SET_VOUCHER_DATA", "");
  }
};
</script>
