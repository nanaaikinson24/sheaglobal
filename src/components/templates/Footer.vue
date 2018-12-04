<template>
    <div class="app-footer">
        <footer class="py-5">
            <div class="container">
                <div class="links-section">
                    <div class="row mb-5">

                        <div class="col-md-4">
                            <div class="mb-4">
                                <h5 class="is-header">Get email offers & the latest news from Shea Global</h5>
                            </div>

                            <div class="formSubscribeMsg"></div>

                            <div class="input-group mb-3" id="subscribeEmail">
                                <input type="text" class="form-control" placeholder="Your Email"
                                    aria-label="Your Email" aria-describedby="subscribeFormBtn"
                                    v-model="subscribe" v-validate="'required|email'" name="subscribe-email" 
                                >
                                <div class="input-group-append">
                                    <button class="btn btn-success" type="button" id="subscribeFormBtn" 
                                        v-on:click="subscribeFunction($event)" 
                                    >
                                        SUBMIT
                                    </button>
                                    
                                </div>
                            </div>
                            <span class="text-danger d-block">{{ errors.first('subscribe-email') }}</span>
                        </div>

                        <div class="col-6 col-md-2">
                            <div class="mb-4">
                                <h5 class="is-header">Customer Care</h5>
                            </div>
                            <div class="footer-links">
                                <ul>
                                    
                                    <li>
                                        <router-link to="/contact">Contact Us</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-6 col-md-2">
                            <div class="mb-4">
                                <h5 class="is-header">Discover</h5>
                            </div>

                            <div class="footer-links">
                                <ul>
                                    <li>
                                        <router-link to="/">Home</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/about">About</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/products">Products</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/blog">Blog</router-link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class="col-6 col-md-2">
                            <div class="mb-4">
                                <h5 class="is-header">Policy</h5>
                            </div>
                            <div class="footer-links">
                                <ul>
                                    <li>
                                        <router-link to="/terms-and-conditions">Terms and Conditions</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/privacy-policy">Privacy</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/delivery-policy">Delivery</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/refund-policy">Refund</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/cancellation-policy">Cancellation</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-6 col-md-2">
                            <div class="mb-4">
                                <h5 class="is-header">Follow Us</h5>
                            </div>

                            <div class="social-icons mt-3">
                                <a href="https://www.instagram.com/sheaglobal/" target="_blank">
                                    <i class="fa fa-instagram"></i>

                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="copyright-section py-3 d-flex flex-row">
                    <div>
                        <p>&copy; {{ copyrightDate }} Shea Global. All Rights Reserved.</p>
                    </div>
                    <div class="ml-auto">
                        <p>
                            Designed and developed by
                            <a href="http://tribalhousestudios.com" target="_blank">Tribal House Studios</a>
                        </p>
                    </div>
                </div>

                <div>
                    <div class="row">
                        <div class="col-md-12">
                            <img :src="cards" alt="cards-accepted" width="140px">
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import axios from "axios";
var date = new Date();
let cards = require("@/assets/img/cards.png");
export default {
  name: "Footer",
  data() {
    return {
      copyrightDate: date.getFullYear(),
      subscribe: "",
      cards: cards
    };
  },
  methods: {
    subscribeFunction(e) {
      var btn = e.currentTarget;
      var sve = document.querySelector(".s-v-e");
      if (sve) {
        sve.remove();
      }
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            btn.innerHtml =
              '<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>';
            var subscribedEmail = { subscribeEmail: this.subscribe };
            subscribedEmail = JSON.stringify(subscribedEmail);

            axios
              .post(APIURL + "subscribe", subscribedEmail)
              .then(response => {
                btn.innerHtml = "SUBMIT";
                var res = response.data;
                if (res.status == 200) {
                  var html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                    ${res.msg}
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>`;
                  document
                    .querySelector(".formSubscribeMsg")
                    .classList.add("my-3");
                  document.querySelector(".formSubscribeMsg").innerHTML = html;
                  this.subscribe = "";
                  this.$validator.reset();
                } else {
                  if (res.status === "validation_errors") {
                    res.errors.forEach(function(k, v) {
                      document.getElementById(k).appendChild(v);
                    });
                  } else {
                    var html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                    ${res.msg}
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>`;
                    document
                      .querySelector(".formSubscribeMsg")
                      .classList.add("my-3");
                    document.querySelector(
                      ".formSubscribeMsg"
                    ).innerHTML = html;
                    this.subscribe = "";
                    this.$validator.reset();
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
