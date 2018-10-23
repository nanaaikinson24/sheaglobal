<template>
    <div class="app-cart-page">
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row" v-if="orderCartItems.length > 0">
                <!-- items -->
                <div class="col-md-8 cart-card px-3 py-4">

                    <shopping-cart-item v-for="(cartItem, i) in orderCartItems" 
                        :key="cartItem.mask"
                        :cartItem="cartItem"
                        :arrIndex="i"
                        :itemMask="cartItem.mask"
                    />

                    <div class="cart-actions pt-3">
                        <div class="d-flex flex-row">
                            <div class="ml-md-auto">
                                <div class="cart-btn">
                                    <span class="btn-link-danger">
                                        <button class="btn btn-default"  @click="emptyCart($event)">
                                            Empty Cart
                                        </button>
                                    </span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    AED {{ subtotal.toFixed(2) }}
                                </div>
                            </div>

                            <!-- <div class="order-details-container d-flex flex-row mb-3 justify-content-between">
                                <div class="shipping-title">
                                    Estimated Shipping
                                </div>

                                <div class="shipping-price">
                                    AED {{ shipping.toFixed(2) }}
                                </div>
                            </div>

                            <div class="order-details-container d-flex flex-row  justify-content-between">
                                <div class="vat-title">
                                    Vat
                                </div>

                                <div class="vat-price">
                                    AED {{ tax.toFixed(2) }}
                                </div>
                            </div> -->

                            <hr class="">

                            <div class="order-details-container d-flex flex-row  mb-4 justify-content-between">
                                <div class="total-title">
                                    <h6>Total</h6>
                                </div>

                                <div class="total-price">
                                    <h6>AED {{ total.toFixed(2) }}</h6>
                                </div>
                            </div>

                            <div class="cart-btn">
                                <div class="text-center mb-3">
                                    <router-link to="/checkout" class="btn btn-success">
                                        Checkout 
                                    </router-link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty Cart -->
            <div class="row" v-if="orderCartItems.length <= 0">
                <div class="col-md-12 empty-cart">
                    <div class="my-5 card">
                        <div class="card-body py-5">
                            <div class="text-center">
                                <img :src="emptyCartIcon" alt="Empty Cart" class="img-fluid" width="100px">

                                <div class="mt-5">
                                    <h5>Your cart is currently empty</h5>
                                </div>

                                <div class="mt-4">
                                    <router-link to="/products" class="btn btn-success px-5">
                                        Shop Now
                                    </router-link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var _ = require("lodash");
var emptyCartIcon = require("@/assets/icons/shopping-cart-empty.svg");
var aboutImg = require("@/assets/img/about03.jpg");
import TopHeroBanner from "@/components/TopHeroBanner.vue";
import ShoppingCartItem from "@/components/ShoppingCartItem.vue";

import { mapState, mapActions } from "vuex";

export default {
    components: {
        heroBanner: TopHeroBanner,
        ShoppingCartItem: ShoppingCartItem
    },
    name: "Cart",
    data() {
        return {
            title: "Cart",
            aboutImg: aboutImg,
            emptyCartIcon: emptyCartIcon
        };
    },
    metaInfo() {
        return {
            title: this.title
        };
    },

    computed: {
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

        userIsLoggedIn() {
            return this.$store.getters.isLoggedIn;
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
            return this.subtotal;
        }
    },

    methods: {
        ...mapActions(["EMPTY_CART"]),

        //empty cart
        emptyCart(e) {
            let btn = e.currenTarget;
            $(".site-empty-cart").show();

            setTimeout(() => {
                $(".site-empty-cart").hide();
                this.EMPTY_CART();
            }, 1000);
        }
    }
};
</script>
