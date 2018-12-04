<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row">
                <div class="col-md-12 col-lg-10 offset-lg-1 checkout-accordion">

                    <form-wizard @on-complete="onComplete" 
                        shape="tab"
                        color="#43C13E"
                        title=""
                        subtitle=""
                        nextButtonText="Continue"
                        backButtonText="Previous"
                        stepSize="lg"
                        :startIndex="startIndex"
                        error-color="#ff0033"
                    >
                        <!-- login -->
                        <tab-content title="Login" icon="ti-user"
                            :beforeChange="validateLoginTab"
                        >
                        
                                <div class="row" v-show="!userIsLoggedIn">
                                    <div class="col-md-8 offset-md-2 my-4">
                                        <div class="loginMsg"></div>

                                        <form>
                                            <div class="form-group">
                                                <input type="email" name="email" id="email" class="form-control"
                                                    placeholder="E-Mail*"
                                                    v-model="loginData.email"
                                                >
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="password" id="password" class="form-control"
                                                    placeholder="Password*"
                                                    v-model="loginData.password"
                                                >
                                            </div>
                                        </form>

                                    </div>
                                </div>

                                <div class="" v-show="userIsLoggedIn">
                                    <p class="text-center">
                                        You are logged in
                                    </p>
                                </div>

                        </tab-content>

                        <!-- delivery -->
                        <tab-content title="Delivery Info" icon="ti-truck"
                            :beforeChange="validateShippingTab"
                        >
                            <div class="mb-5 row">
                                <div class="col-md-12 col-lg-8 offset-lg-2">
                                    <p>NB: Fields marked <span class="text-danger">*</span> are required</p>
                                    <form class="checkout-form">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">First Name <span class="text-danger">*</span></label>
                                                    <input type="text" 
                                                        name="firstname" id="firstname" 
                                                        class="form-control"         
                                                        placeholder="First Name *"
                                                        v-model="shippingData.fname"
                                                        v-validate="'required'" data-vv-as="full name"
                                                    >
                                                    <span class="text-danger">{{ errors.first('firstname') }}</span>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">Last Name <span class="text-danger">*</span></label>
                                                    <input type="text" 
                                                        name="lastname" id="lastname" 
                                                        class="form-control" 
                                                        placeholder="Last Name *"
                                                        v-model="shippingData.lname"
                                                        v-validate="'required'" data-vv-as="full name"
                                                    >
                                                    <span class="text-danger">{{ errors.first('lastname') }}</span>
                                                </div>
                                            </div>



                                        </div>

                                        <div class="form-group">
                                            <label for="">Address <span class="text-danger">*</span></label>
                                            <input type="text" name="address" id="address" class="form-control" placeholder="Address Line 1 *"
                                                v-model="shippingData.address"
                                                v-validate="'required'"  data-vv-as="address line 1"
                                            >
                                            <span class="text-danger">{{ errors.first('address') }}</span>
                                        </div>

                                        <div class="form-group">
                                            <label for="">Address Line 2</label>
                                            <input type="text" name="address2" id="address2" class="form-control" placeholder="Address Line 2"
                                                v-model="shippingData.address2"
                                            >
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label for="">Country <span class="text-danger">*</span></label>
                                                    <select name="country" id="country" class="form-control custom-select" 
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
                                                    <label for="">City <span class="text-danger">*</span></label>
                                                    <input type="text" name="city" id="city" class="form-control"
                                                        v-model.trim="shippingData.city"
                                                        v-validate="'required'"
                                                        data-vv-as="city"
                                                    >
                                                    <span class="text-danger">{{ errors.first('city') }}</span>
                                                </div>
                                            </div>

                                            
                                        </div>

                                        <div class="form-group">
                                            <label for="">Phone <span class="text-danger">*</span></label>
                                            <input type="text" name="phone" id="phone" class="form-control" placeholder="Phone *"
                                                v-model="shippingData.phone"
                                                v-validate="'required|numeric'"  data-vv-as="phone"
                                            >
                                            <span class="text-danger">{{ errors.first('phone') }}</span>
                                        </div>
                                    </form>

                                </div>

                            </div>

                        </tab-content>

                        <!-- order -->
                        <tab-content title="Order Summary" icon="ti-list"
                            
                        >
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
                                            <tr v-for="(item, i) in orderCartItems" :key="i">
                                                <th scope="row" class="is-header">{{ item.quantity }}</th>
                                                <td>{{ item.name }}</td>
                                                <td>{{ (item.quantity * item.price).toFixed(2) }}</td>
                                            </tr>
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

                                            <div class="d-flex justify-content-between">
                                                <div>Vat</div>
                                                <div>{{ tax.toFixed(2) }}</div>
                                            </div>

                                            <hr>

                                            <div class="d-flex justify-content-between">
                                                <h6>Total</h6>
                                                <h6>{{ total.toFixed(2) }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tab-content>

                        <!-- payment -->
                        <tab-content title="Billing Info" icon="ti-credit-card"
                            :beforeChange="validatePaymentTab"
                        >

                        <div class="row">
                            <div class="col-md-12 col-lg-8 offset-lg-2">
                                <form>

                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="">First Name</label>
                                                <input type="text" name="bfirstname" id="bfirstname" class="form-control"
                                                    v-model.trim="billing.fname"
                                                >
                                                <span class="text-danger" v-if="billingErrors.fname.status">{{ billingErrors.fname.msg }}</span>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="">Last Name</label>
                                                <input type="text" name="blastname" id="blastname" class="form-control"
                                                    v-model.trim="billing.lname"
                                                >
                                                <span class="text-danger" v-if="billingErrors.lname.status">{{ billingErrors.lname.msg }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="">Email </label>
                                        <input type="text" name="bemail" id="bemail" class="form-control"
                                            v-model="billing.email"
                                        >
                                        <span class="text-danger" v-if="billingErrors.email.status">{{ billingErrors.email.msg }}</span>
                                        <span class="text-danger" v-if="billingErrors.email.status">{{ billingErrors.email.invalid }}</span>
                                    </div>
                                    


                                    <div class="form-group">
                                        <label for="">Address Line 1</label>
                                        <input type="text" name="baddress" id="baddress" class="form-control"
                                            v-model.trim="billing.address"
                                        >
                                        <span class="text-danger" v-if="billingErrors.address.status">{{ billingErrors.address.msg }}</span>
                                    </div>

                                    <div class="form-group">
                                        <label for="">Address Line 2 (optional)</label>
                                        <input type="text" name="baddress2" id="baddress2" class="form-control"
                                            v-model.trim="billing.address2"
                                        >
                                        
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="">Country</label>
                                                <select name="bcountry" id="bcountry" class="form-control custom-select" 
                                                    v-model="billing.country"
                                                >
                                                    <option 
                                                        v-for="(country, i) in countries"
                                                        :key="i"
                                                        :value="country.alpha2Code"
                                                    >
                                                        {{ country.name }}
                                                    </option>
                                                </select>
                                                <span class="text-danger" v-if="billingErrors.country.status">{{ billingErrors.country.msg }}</span>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="">City</label>
                                                <input type="text" name="bcity" id="bcity" class="form-control"
                                                    v-model.trim="billing.city"
                                                >
                                                <span class="text-danger" v-if="billingErrors.city.status">{{ billingErrors.city.msg }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        </tab-content>

                         <tab-content title="Finish" icon="ti-credit-card"
                            
                        >
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

import axios from "axios";

//local registration form-wizard
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  components: {
    heroBanner: TopHeroBanner,
    Shipping,
    FormWizard,
    TabContent,
    Login
  },
  name: "Index",
  data() {
    return {
      title: "Checkout",
      loginData: { email: "", password: "" },
      berrors: [],
      countries: [],
      billingErrors: {
        fname: { status: false, msg: "" },
        lname: { status: false, msg: "" },
        address: { status: false, msg: "" },
        city: { status: false, msg: "" },
        country: { status: false, msg: "" },
        email: { status: false, invalid: "", msg: "" }
      },
      shippingData: {
        fname: this.$store.state.userDeliveryInfo.firstname,
        lname: this.$store.state.userDeliveryInfo.lastname,
        address: this.$store.state.userDeliveryInfo.address,
        address2: this.$store.state.userDeliveryInfo.address2,
        city: this.$store.state.userDeliveryInfo.city,
        country: this.$store.state.userDeliveryInfo.country,
        phone: this.$store.state.userDeliveryInfo.phone
      },
      billing: {
        fname: this.$store.state.userBillingInfo.firstname,
        lname: this.$store.state.userBillingInfo.lastname,
        address: this.$store.state.userBillingInfo.address,
        address2: this.$store.state.userBillingInfo.address2,
        city: this.$store.state.userBillingInfo.city,
        country: this.$store.state.userBillingInfo.country,
        email: this.$store.state.userBillingInfo.email
      }
    };
  },
  computed: {
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
      return this.orderCartItems.reduce(function(acc, cur) {
        let total = acc + cur.price * cur.quantity;
        return total;
      }, 0);
    },

    tax() {
      return this.$store.getters.taxGetter;
    },

    shipping() {
      return this.$store.getters.shippingGetter;
    },

    //calculate total
    total() {
      return this.subtotal + this.tax + this.shipping;
    }
  },
  watch: {
    "loginData.email"(newVal, oldVal) {
      $(".s-v-em").remove();
    },
    "loginData.password"(newVal, oldVal) {
      $(".s-v-ep").remove();
    }
  },
  methods: {
    validatePaymentTab: function() {
      if (!this.billing.fname) {
        this.billingErrors.fname.status = true;
        this.billingErrors.fname.msg = "The first name field is required";
        this.berrors.push(1);
      }

      if (!this.billing.lname) {
        this.billingErrors.lname.status = true;
        this.billingErrors.lname.msg = "The first name field is required";
        this.berrors.push(1);
      }
      if (!this.billing.city) {
        this.billingErrors.city.status = true;
        this.billingErrors.city.msg = "The first name field is required";
        this.berrors.push(1);
      }
      if (!this.billing.country) {
        this.billingErrors.country.status = true;
        this.billingErrors.country.msg = "The first name field is required";
        this.berrors.push(1);
      }
      if (!this.billing.address) {
        this.billingErrors.address.status = true;
        this.billingErrors.address.msg = "The first name field is required";
        this.berrors.push(1);
      }
      if (!this.billing.email) {
        this.billingErrors.email.status = true;
        this.billingErrors.email.msg = "The first name field is required";
        this.berrors.push(1);
      }
      var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!filter.test(this.billing.email)) {
        this.billingErrors.email.status = true;
        this.billingErrors.email.invalid = "Please enter a valid email address";
        this.berrors.push(1);
      }

      console.log(this.berrors);

      if (this.berrors.length > 0) {
        return false;
      }
      this.berrors = [];

      this.billingErrors.fname.status = false;
      this.billingErrors.lname.status = false;
      this.billingErrors.city.status = false;
      this.billingErrors.address.status = false;
      this.billingErrors.email.status = false;
      this.billingErrors.country.status = false;

      return true;
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

                _res = true;
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
                _res = false;
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
      let cart = this.$store.state.cart;
      let user = this.$store.state.userData.mask;
      let params = new URLSearchParams();
      params.append("cart", JSON.stringify(cart));
      params.append("shipping", JSON.stringify(this.shippingData));
      params.append("billing", JSON.stringify(this.billing));
      params.append("user", user);

      axios
        .post(APIURL + "pay", params)
        .then(response => {})
        .catch(err => {
          console.log(err);
        });
      return true;
    },

    //Validate shipping
    validateShippingTab() {
      return this.$validator.validateAll();
    },

    fetchCountries() {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(response => {
          this.countries = response.data;
          //console.log(this.countries);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.fetchCountries();
  }
};
</script>
