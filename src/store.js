import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        cartCount: 0,
        cartTotalPrice: 0,
        shipping: 10,
        vat: 0.05,
        userData: {},
        userDeliveryInfo: {},
        userBillingInfo: {},
        is_logged_in: false
    },

    //Getters
    getters: {
        //Total Cart count
        totalCartQuantity(state) {
            return state.cartCount;
        },

        //Cart items
        cartGetter(state) {
            return state.cart;
        },

        //Tax
        taxGetter(state) {
            let sub = state.cart.reduce(function(acc, cur) {
                let total = acc + cur.price * cur.quantity;
                return total;
            }, 0);
            let tax = sub * state.vat;
            return tax;
        },

        //Shipping
        shippingGetter(state) {
            return state.shipping;
        },

        getSpecificItem: state => mask => {
            let { quantity } = state.cart.find(item => item.mask === mask);
            return quantity;
        },

        userDetailsGetter(state) {
            return state.userData;
        },

        isLoggedIn(state) {
            return state.is_logged_in;
        }
    },

    //Mutations
    mutations: {
        //Set cart
        checkForCartStorage(state) {
            let sheaglobalCart = JSON.parse(
                window.localStorage.getItem("sheaglobalCart")
            );
            if (sheaglobalCart !== null) {
                state.cart = sheaglobalCart;

                //Computate total cart quantity and price
                let quantity = 0;
                let totalCost = 0;

                for (let item of state.cart) {
                    quantity += item.quantity;
                    totalCost += item.quantity * item.price;
                }
                state.cartCount = quantity;
                state.cartTotalPrice = totalCost.toFixed(2);
            }
        },

        //Set user data
        checkForUserStorage(state) {
            let userData = JSON.parse(window.localStorage.getItem("userData"));
            if (userData !== null) {
                axios
                    .get(APIURL + `verifytoken?token=${userData.access_token}`)
                    .then(response => {
                        let res = response.data;
                        if (res.status == 200) {
                            state.userData = userData;
                            state.is_logged_in = true;
                        }
                    })
                    .catch(err => {
                        //
                    });
            }
        },

        // set global user data
        setUserDataGlobal(state) {
            let userData = JSON.parse(window.localStorage.getItem("userData"));
            if (userData !== null) {
                axios
                    .get(
                        APIURL +
                            `user/?email=${userData.email}&mask=${
                                userData.mask
                            }`
                    )
                    .then(response => {
                        let res = response.data;
                        if (res.status == 200) {
                            this.commit(
                                "setUserDeliveryInfo",
                                res.data.delivery
                            );
                            this.commit("setUserBillingInfo", res.data.billing);
                        }
                    })
                    .catch(err => {
                        //
                    });
            }
        },

        setUserData(state, value) {
            state.userData = value;
            state.is_logged_in = true;
        },

        //set delivery address
        setUserDeliveryInfo(state, value) {
            state.userDeliveryInfo = value;
        },

        setUserBillingInfo(state, value) {
            state.userBillingInfo = value;
        },

        //Add to cart
        addToCart(state, item) {
            let quantity = 0;
            let totalCost = 0;

            //Check for existing item
            let found = state.cart.find(product => product.mask == item.mask);

            if (found) {
                found.quantity += item.quantity;
                found.totalPrice = (found.quantity * found.price).toFixed(2);
            } else {
                //Add new if not found
                state.cart.push(item);
            }

            //Computate total cart quantity and price
            for (let item of state.cart) {
                quantity += item.quantity;
                totalCost += item.quantity * item.price;
            }
            state.cartCount = quantity;
            state.cartTotalPrice = totalCost.toFixed(2);

            //Save to storage
            this.commit("saveCart");
        },

        //Update cart
        updateCartItem(state, item) {
            let found = state.cart.find(product => product.mask == item.mask);

            if (found) {
                found.quantity = Number(item.quantity);
                found.totalPrice = (found.quantity * found.price).toFixed(2);

                let quantity = 0;
                let totalCost = 0;

                for (let item of state.cart) {
                    quantity += item.quantity;
                    totalCost += item.quantity * item.price;
                }
                state.cartCount = quantity;
                state.cartTotalPrice = totalCost.toFixed(2);

                this.commit("saveCart");
            }
        },

        //Remove from cart
        removeFromCart(state, itemIndex) {
            state.cart.splice(itemIndex, 1);

            //Computate total cart quantity and price
            let quantity = 0;
            let totalCost = 0;
            for (let item of state.cart) {
                quantity += item.quantity;
                totalCost += item.quantity * item.price;
            }
            state.cartCount = quantity;
            state.cartTotalPrice = totalCost.toFixed(2);

            this.commit("saveCart");
        },

        //Empty cart
        emptyCart(state) {
            state.cart = [];
            state.cartCount = 0;

            window.localStorage.removeItem("sheaglobalCart");
            //window.localStorage.removeItem('sheaglobalCartCount');
            window.localStorage.removeItem("sheaglobalCartExpires");
        },

        //Save cart
        saveCart(state) {
            window.localStorage.setItem(
                "sheaglobalCart",
                JSON.stringify(state.cart)
            );
            //window.localStorage.setItem('sheaglobalCartCount', state.cartCount);
        },

        //logout
        logoutUser(state) {
            (state.userData = {}), (state.is_logged_in = false);
            state.userDeliveryInfo = {};
            state.userBillingInfo = {};

            window.localStorage.removeItem("userData");
            router.replace("/account");
        }
    },
    //actions
    actions: {
        ADD_TO_CART({ commit }, value) {
            commit("addToCart", value);
        },

        //Check for cart storage
        CHECK_FOR_CART_STORAGE({ commit }) {
            commit("checkForCartStorage");
        },

        //Empty cart
        EMPTY_CART({ commit }) {
            commit("emptyCart");
        },

        //Set user data
        SET_USER_DATA({ commit }, value) {
            commit("setUserData", value);
        },

        //Check for existing User
        CHECK_FOR_USER_STORAGE({ commit }) {
            commit("checkForUserStorage");
        },

        //Logout
        LOGOUT_USER({ commit }) {
            commit("logoutUser");
        },

        //SET global user data
        SET_USER_DATA_GLOBAL({ commit }) {
            commit("setUserDataGlobal");
        }
    }
});
