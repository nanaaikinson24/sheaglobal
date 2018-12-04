import Vue from "vue";
import Router from "vue-router";

import Meta from "vue-meta";
import axios from "axios";
import store from "./store";

Vue.use(Router);
Vue.use(Meta);

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Contact from "./views/Contact.vue";
import Products from "./views/product/Products";
import Category from "./views/product/Category";
import ProductSingle from "./views/product/Single";
import Posts from "./views/blog/Posts";
import Post from "./views/blog/Post";

import Terms from "./views/policy/Terms.vue";
import Privacy from "./views/policy/Privacy.vue";
import Delivery from "./views/policy/Delivery.vue";
import Refund from "./views/policy/Refund.vue";
import Cancellation from "./views/policy/Cancellation.vue";

//Auth
import AuthIndex from "@/views/auth/AuthIndex.vue";
import AuthAccountActivate from "@/views/auth/AuthAccountActivate.vue";

//User
import Account from "@/views/user/Account.vue";
import UserOrders from "@/views/user/Orders.vue";
import UserOrder from "@/views/user/Order.vue";

//Cart
import Cart from "@/views/cart/Cart.vue";

//checkout
import Checkout from "@/views/checkout/Index.vue";
import Cancelled from "@/views/checkout/Cancelled.vue";
import Success from "@/views/checkout/Success.vue";
import Declined from "@/views/checkout/Declined.vue";
import Info from "@/views/checkout/Info.vue";
import Cash from "@/views/checkout/Cash.vue";

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/about", name: "about", component: About },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/blog", name: "posts", component: Posts },
    { path: "/blog/:blogdash/:blogmask", name: "post", component: Post },
    { path: "/products", name: "products", component: Products },
    {
      path: "/category/:catdash/:catmask",
      name: "category",
      component: Category
    },
    {
      path: "/product/:prodash/:promask",
      name: "product",
      component: ProductSingle
    },

    //auth
    { path: "/account", name: "account", component: AuthIndex },
    {
      path: "/account/activate/:authuserid/:authtoken",
      name: "account-activate",
      component: AuthAccountActivate
    },

    //Cart
    { path: "/cart", name: "cart", component: Cart },

    //checkout
    { path: "/checkout", name: "checkout", component: Checkout },
    { path: "/order/success", name: "paymentsuccess", component: Success },
    {
      path: "/order/cancelled",
      name: "paymentcancelled",
      component: Cancelled
    },
    {
      path: "/order/declined",
      name: "paymentdeclined",
      component: Declined
    },
    {
      path: "/order/info",
      name: "paymentinfo",
      component: Info
    },
    {
      path: "/order/cash",
      name: "paymentcash",
      component: Cash
    },

    //Policy
    { path: "/terms-and-conditions", name: "terms", component: Terms },
    { path: "/privacy-policy", name: "privacy", component: Privacy },
    { path: "/refund-policy", name: "refund", component: Refund },
    {
      path: "/cancellation-policy",
      name: "cancellation",
      component: Cancellation
    },
    { path: "/delivery-policy", name: "delivery", component: Delivery },

    //User
    {
      path: "/account/detail",
      name: "userdetail",
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: "/account/orders",
      name: "userorders",
      component: UserOrders,
      meta: { requiresAuth: true }
    },
    {
      path: "/account/orders/:orderno",
      name: "userorder",
      component: UserOrder,
      meta: { requiresAuth: true }
    },

    { path: "/*", name: "error404", component: Home }
  ],
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    //savedPosition
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (store.getters.isLoggedIn) {
    let delivery;
    axios
      .get(APIURL + `users/details/${store.getters.userDetailsGetter.mask}`)
      .then(response => {
        let res = response.data;
        if (res !== null) {
          delivery = {
            firstname: res.firstname,
            lastname: res.lastname,
            address: res.address,
            address2: res.address2,
            city: res.city,
            country: res.country,
            phone: res.phone
          };
          store.commit("setUserDataOnly", {
            firstname: res.fname,
            lastname: res.lname
          });
        } else {
          delivery = {
            firstname: "",
            lastname: "",
            address: "",
            address2: "",
            city: "",
            country: "",
            phone: ""
          };
        }
        store.commit("setUserDeliveryInfo", delivery);
      })
      .catch(err => {
        console.log(err);
      });
  }

  if (to.meta.requiresAuth) {
    let token = JSON.parse(window.localStorage.getItem("userData"));

    if (token !== null) {
      axios
        .get(APIURL + `verifytoken?token=${token.access_token}`)
        .then(response => {
          let res = response.data;
          if (res.status == 400) {
            next("/account");
          }
        })
        .catch(err => {
          next("/account");
        });
    } else {
      next("/account");
    }
  }

  next();
});
export default router;
