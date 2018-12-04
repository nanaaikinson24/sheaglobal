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
						finishButtonText="Proceed"
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
											<div class="form-group">
												<router-link to="/account">Not a member? Sign Up</router-link>
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
													<select name="city" id="city" class="form-control"
														v-model.trim="shippingData.city"
														v-validate="'required'"
														data-vv-as="city"
													>
														<option value="">Select city</option>
														<option
															v-for="(city, i) in cities" :key="i"
															:value="city.value"
														>
															{{ city.name }}
														</option>
													</select>
													<!-- <input type="text" name="city" id="city" class="form-control"
														v-model.trim="shippingData.city"
														v-validate="'required'"
														data-vv-as="city"
													> -->
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

											<!-- <div class="d-flex justify-content-between">
												<div>Vat</div>
												<div>{{ tax.toFixed(2) }}</div>
											</div> -->

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
import _ from "lodash";

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
            shippingData: {
                fname: "",
                lname: "",
                address: "",
                address2: "",
                city: "",
                country: "",
                phone: ""
            },
            paymentType: ""
        };
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
            //return this.subtotal + this.tax + this.shipping;
            return this.subtotal + this.shipping;
            //return this.subtotal;
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

                    $(".wizard-footer-right button.wizard-btn").attr(
                        "disabled",
                        ""
                    );

                    axios
                        .post(APIURL + "account/signin", params)
                        .then(response => {
                            $(
                                ".wizard-footer-right button.wizard-btn"
                            ).removeAttr("disabled");
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
            this.$swal({
                title: "",
                text: "Select payment method",
                type: "",
                showCancelButton: true,

                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Cash on delivery",
                cancelButtonText: "Card",
                allowOutsideClick: false
            }).then(result => {
                if (result.value) {
                    this.proceedWithPayOnDelivery();
                } else {
                    this.proceedWithCard();
                }
            });
        },

        //Validate shipping
        validateShippingTab() {
            let city = this.shippingData.city;
            let shipping;
            if (city.toLowerCase() == "dubai") {
                shipping = 10;
            } else {
                shipping = 25;
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
            let params = new URLSearchParams();
            params.append("cart", JSON.stringify(cart));
            params.append("shipping", JSON.stringify(this.shippingData));
            params.append("user", user);
            params.append("paymentmethod", this.paymentType);

            $(".site-process-order").css({ display: "block" });

            axios
                .post(APIURL + "pay", params)
                .then(response => {
                    let res = response.data;

                    if (res.status == 200) {
                        this.$store.dispatch("EMPTY_CART");
                        window.location.href = "" + res.link;
                    } else {
                        $(".wizard-footer-right button.wizard-btn").removeAttr(
                            "disabled"
                        );
                        $(".wizard-footer-left button.wizard-btn").removeAttr(
                            "disabled"
                        );
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
        },
        created() {
            this.getDeliveryInfo();
        }
    }
};
</script>
