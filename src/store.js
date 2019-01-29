import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";
import { cities } from "./config";
import moment from "moment";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    cartCount: 0,
    cartTotalPrice: 0,
    shipping: 0,
    vat: 0.05,
    userData: {},
    userDeliveryInfo: {},
    userBillingInfo: {},
    is_logged_in: false,
    cities: cities,
    expirec: null,
    vouchercode: "",
    subtotalprice: 0,
    access_token: ""
  },

  //Getters
  getters: {
    //Cities getter
    citiesGetter(state) {
      return state.cities;
    },

    //Total Cart count
    totalCartQuantity(state) {
      return state.cartCount;
    },

    // Subtotal calculator
    subtotalCalculator(state) {
      const subtotal = state.cart.reduce(function (acc, cur) {
        const currentPrice = cur.specialoffer
          ? cur.offerprice * cur.quantity
          : cur.price * cur.quantity;

        const total = acc + currentPrice;
        return total;
      }, 0);

      state.subtotalprice = parseFloat(subtotal);
      return state.subtotalprice;
    },

    //Subtotal getter
    subtotalGetter(state, getters) {
      return state.subtotalprice;
    },

    //Cart items
    cartGetter(state) {
      return state.cart;
    },

    //Tax
    taxGetter(state, getters) {
      const tax = getters.subtotalGetter * state.vat;
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
    },

    deliveryInfoGetter(state) {
      return state.userDeliveryInfo;
    }
  },

  //Mutations
  mutations: {
    //Set cart
    checkForCartStorage(state) {
      let sheaglobalCart = JSON.parse(
        window.localStorage.getItem("sheaglobalCart")
      );
      let expires = JSON.parse(
        window.localStorage.getItem("sheaglobalCartExpires")
      );

      if (!_.isEmpty(expires)) {
        let now = moment(new Date());
        if (now.diff(expires, "hours") > 0) {
          this.commit("emptyCart");
          return false;
        }
        state.expirec = expires;

        if (!_.isEmpty(sheaglobalCart)) {
          state.cart = sheaglobalCart;

          //Compute total cart quantity and price
          let quantity = 0;
          let totalCost = 0;

          _.forEach(state.cart, item => {
            quantity += item.quantity;
          });

          const subtotal = state.cart.reduce(function (acc, cur) {
            const currentPrice = cur.specialoffer
              ? cur.offerprice * cur.quantity
              : cur.price * cur.quantity;

            const total = acc + currentPrice;
            return total;
          }, 0);

          state.subtotalprice = parseFloat(subtotal);

          state.cartCount = quantity;
          state.cartTotalPrice = parseFloat(totalCost).toFixed(2);
        }
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
          .get(APIURL + `user/?email=${userData.email}&mask=${userData.mask}`)
          .then(response => {
            let res = response.data;
            if (res.status == 200) {
              this.commit("setUserDeliveryInfo", res.data.delivery);
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

    setUserDataOnly(state, value) {
      state.userData = value;
    },

    setShippingPrice(state, value) {
      state.shipping = value;
    },

    setAccessToken(state, value) {
      state.access_token = value;
    },

    setSubtotalPrice(state, value) {
      state.subtotalprice = value;
      //this.commit("saveCart");
    },
    setVoucherValue(state, value) {
      state.vouchercode = value;
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

      if (!_.isEmpty(state.cart)) {
        //Check for existing item
        const found = _.find(state.cart, product => product.mask === item.mask);

        if (typeof found === "undefined" || found === null) {
          //Add new if not found
          state.cart.push(item);
        } else {
          found.quantity += item.quantity;

          // Set price for item
          if (!_.isEmpty(found.specialoffer)) {
            found.totalPrice = (found.quantity * found.offerprice).toFixed(2);
          } else {
            found.totalPrice = (found.quantity * found.price).toFixed(2);
          }
        }
      } else {
        //Add new if not found
        state.cart.push(item);
      }

      //Computate total cart quantity and price
      _.forEach(state.cart, item => {
        quantity += item.quantity;
      });

      const subtotal = state.cart.reduce(function (acc, cur) {
        const currentPrice = cur.specialoffer
          ? cur.offerprice * cur.quantity
          : cur.price * cur.quantity;

        const total = acc + currentPrice;
        return total;
      }, 0);

      state.subtotalprice = parseFloat(subtotal);

      // Set cart count
      state.cartCount = quantity;
      state.cartTotalPrice = parseFloat(totalCost).toFixed(2);

      // Set cart expiration
      let today = new Date();
      today.setHours(today.getHours() + 8);
      state.expirec = today;

      //Save to storage
      this.commit("saveCart");
      this.commit("saveExpireCart");
    },

    //Update cart
    updateCartItem(state, item) {
      if (!_.isEmpty(state.cart)) {
        //Check for existing item
        const found = _.find(state.cart, product => product.mask === item.mask);

        if (typeof found !== "undefined" || found !== null) {
          found.quantity = Number(item.quantity);

          // Set price for item
          if (found.specialoffer) {
            found.totalPrice = (found.quantity * found.offerprice).toFixed(2);
          } else {
            found.totalPrice = (found.quantity * found.price).toFixed(2);
          }

          let quantity = 0;
          let totalCost = 0;

          //Computate total cart quantity and price
          _.forEach(state.cart, item => {
            quantity += item.quantity;
          });

          const subtotal = state.cart.reduce(function (acc, cur) {
            const currentPrice = cur.specialoffer
              ? cur.offerprice * cur.quantity
              : cur.price * cur.quantity;

            const total = acc + currentPrice;
            return total;
          }, 0);

          state.subtotalprice = parseFloat(subtotal);

          state.cartCount = quantity;
          state.cartTotalPrice = parseFloat(totalCost).toFixed(2);

          let today = new Date();
          today.setHours(today.getHours() + 8);
          state.expirec = today;

          //Save to storage
          this.commit("saveCart");
          this.commit("saveExpireCart");
        }
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
      state.cartTotalPrice = parseFloat(totalCost).toFixed(2);

      this.commit("saveCart");
    },

    //Empty cart
    emptyCart(state) {
      state.cart = [];
      state.cartCount = 0;
      state.subtotalprice = 0;
      state.vouchercode = "";

      window.localStorage.removeItem("sheaglobalCart");
      //window.localStorage.removeItem('sheaglobalCartCount');
      window.localStorage.removeItem("sheaglobalCartExpires");
    },

    //Save cart storage
    saveCart(state) {
      window.localStorage.setItem("sheaglobalCart", JSON.stringify(state.cart));
      //window.localStorage.setItem('sheaglobalCartCount', state.cartCount);
    },

    //expire cart storage
    saveExpireCart(state) {
      window.localStorage.setItem(
        "sheaglobalCartExpires",
        JSON.stringify(state.expirec)
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
    },

    //Set shipping data
    SET_SHIPPING_DATA({ commit }, value) {
      commit("setShippingPrice", value);
    },

    //Set shipping data
    SET_SUBTOTAL_DATA({ commit }, value) {
      commit("setSubtotalPrice", value);
    },

    //Set voucher data
    SET_VOUCHER_DATA({ commit }, value) {
      commit("setVoucherValue", value);
    }
  }
});
