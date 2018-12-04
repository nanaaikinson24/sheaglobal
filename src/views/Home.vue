<template>
    <div class="app-home">
        <section class="hero">
            <div class="owl-carousel owl-theme hero-slider" id="home-slider">
                <div v-for="(slider, i) in homeSliders" :key="i">
                    <img :src="slider.image" alt="">
                </div>
            </div>
        </section>

        <!-- About section -->
        <div class="my-5">
            <div class="container">
                <div class="home-about">
                    <div class="card">
                        <div class="row">

                            <div class="col-md-8 ">
                                <div class="mb-4 text-md-left text-center">
                                    <h3 class="shea-title">About Shea Global</h3>
                                </div>

                                <div class="text-justify">

                                    <p>Shea Global General Trading LLC is a Dubai based trading and distribution company focused on introducing natural and eco-friendly products to the United Arab Emirates /Gulf Cooperation Council market. </p>
                                    <p>We pride ourselves on offering a unique and broad selection of brands from the USA and Africa. </p>
                                    <p>We have carefully selected companies who use only the most natural and environmentally friendly ingredients and process to make their products. </p>
                                    <p>Shea Global is the sole distributor of Mitra Bath and Body, USA products in UAE and GCC.</p>
                                
                                </div>

                            </div>

                            <div class="col-md-4 d-none d-md-block">
                                <img :src="aboutImages.about1" class="img-fluid">
                            </div>
                        </div>
                    </div>

                    <div class="card pt-5 mt-5">
                        <div class="row">
                            <div class="col-md-4 d-none d-md-block">
                                <img :src="aboutImages.about2" class="img-fluid">
                            </div>

                            <div class="col-md-8 ">
                                <div class="mb-4 text-center text-md-right ">
                                    <h3 class="shea-title">Why use Natural Products?</h3>
                                </div>

                                <div class="text-justify">
                                    
                                <p>Many of the beauty products today contain ingredients such as nitrosamines, phthalates, parabens and formaldehyde to name a few. </p>
                                <p>These ingredients have been known to cause cancer and other illnesses through prolonged use. </p>
                                <p>In addition, it has been scientifically proven that the chemical components of many products do not break down and accumulate in our ecosystems, resulting in environmental damage With this knowledge going natural and organic is the only way to ensure we are giving our bodies&rsquo; 100% love. </p>
                                <p>After all, the skin is the largest organ on our bodies and it makes sense to protect it by using only the purest ingredients.</p>                                
                            
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Why section -->
        <div class="why-section my-5">
            <div class="container py-5">
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center pb-4">
                            <h3 class="shea-title">What Makes Us Special</h3>
                        </div>
                    </div>

                    <div class="col-md-4 d-flex flex-column flex-center">
                        <div class="row my-4 ">
                            <div class="col-md-4">
                                <div class="home-ico text-center">
                                    <img :src="specialImages.special1" alt="">
                                </div>
                            </div>

                            <div class="col-md-8 my-4 text-center text-md-left">
                                <h4 class="special-title">Organic Prouducts</h4>
                            </div>
                        </div>

                        <div class="row my-4">
                            <div class="col-md-4">
                                <div class="home-ico text-center">
                                    <img :src="specialImages.special2" alt="">
                                </div>
                            </div>

                            <div class="col-md-8 my-4 text-center text-md-left">
                                <h4 class="special-title">Natural & Pure</h4>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-4">
                        <div class="special-image-middle">
                            <img :src="specialImages.specialMiddle" alt="">
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="row my-4">

                            <div class="col-md-8 my-4 text-center text-md-right">
                                <h4 class="special-title">Locally sourced ingredients</h4>
                            </div>

                            <div class="col-md-4">
                                <div class="home-ico text-center">
                                    <img :src="specialImages.special3" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="row my-4">
                            <div class="col-md-8 my-4 text-center text-md-right">
                                <h4 class="special-title">Eco-friendly products</h4>
                            </div>

                            <div class="col-md-4">
                                <div class="home-ico text-center">
                                    <img :src="specialImages.special4" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- New arrival -->
        <div class="my-5 new-arrival-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 py-5">
                        <div class="header-title-hr-u mb-3 shea-title">
                            <h3><span>New Arrivals</span></h3>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div id="newProducts" class="owl-carousel owl-theme">
                            
                            <div class="product-container" v-for="(product, i) in newArrivals" :key="i">
                                <div class="details">
                                    <div class="product-img text-center">
                                        <router-link :to="'/product/' + product.dash + '/' + product.mask">
                                            <img :src="product.productimage" :alt="product.name">
                                        </router-link>
                                    </div>

                                    <div class="related-product-content" >
                                        <router-link :to="'/product/' + product.dash + '/' + product.mask">
                                            <div class="text-center mt-3">
                                                <p>
                                                    {{ product.name }}
                                                    <small class="d-block text-secondary">
                                                        {{ product.category }}
                                                    </small>
                                                </p>
                                                <p>AED {{ product.price }}</p>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>

                                <div class="ribbon" v-if="product.quantity < 1">
                                    <small>Out of Stock</small>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Trusted clients -->
        <div class="clients-section py-5">
            <div class="container">
                <div class="text-center mb-5">
                    <h3 class="shea-title">Our Exclusive Brand</h3>
                </div>

                <div class="d-flex flex-row">
                    <div class="brand mx-auto d-flex flex-row">
                        <div class="py-2 pl-2">
                            <img :src="brands.mitras" height="50px" alt="">
                        </div>

                        <div>
                            <p class="pl-2 pt-3">Mitras Bath & Body</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Blog Posts -->
        <div class="container my-5 py-5">
            <div class="row">
                <div class="col-md-3 mb-sm-4">
                    <h3>Latest Blog Posts</h3>
                    <span class="d-block"><router-link to="/blog">View All</router-link></span>
                </div>

                <div class="col-md-9">
                    <div class="blog-slider">
                        <div class="blog-carousel owl-carousel owl-theme">
                            <div v-for="(post, i) in blogPosts" :key="i">
                                <router-link :to="'/blog/' + post.dash + '/' + post.mask">
                                    <div class="blog-card" :style="{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+ post.image +')'}"
                                    >
                                        <div class="blog-details card-body">
                                            <p class="text-white">{{ post.date_created }}</p>
                                            <h4 class="text-white">
                                                {{ post.title }}
                                            </h4>

                                            <p class="d-block text-white" v-html="post.description"></p>
                                        </div>
                                    </div>
                                </router-link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <app-callback></app-callback>
    </div>
</template>

<script>
var aboutImg1 = require("../assets/img/about1.jpg");
var aboutImg2 = require("../assets/img/about2.jpg");

var specialImg1 = require("../assets/img/special1.svg");
var specialImg2 = require("../assets/img/special2.svg");
var specialImg3 = require("../assets/img/special3.svg");
var specialImg4 = require("../assets/img/special4.svg");

var specialImageMiddle = require("../assets/img/special-middle.png");

var mitras = require("../assets/img/brands/mitras.png");

import axios from "axios";
import Callback from "../components/Callback";

export default {
  name: "home",
  components: {
    appCallback: Callback
  },
  data() {
    return {
      homeSliders: [],
      newArrivals: [],
      blogPosts: [],
      brands: { mitras: mitras },
      aboutImages: { about1: aboutImg1, about2: aboutImg2 },
      specialImages: {
        special1: specialImg1,
        special2: specialImg2,
        special3: specialImg3,
        special4: specialImg4,
        specialMiddle: specialImageMiddle
      }
    };
  },
  metaInfo: {
    title: "Home"
  },
  methods: {
    //Fetch Sliders
    fetchSliderImages() {
      var self = this;

      axios
        .get(APIURL + "sliderindex")
        .then(response => {
          var res = response.data;
          this.homeSliders = res.data;

          //Home slider (init)
          this.$nextTick(function() {
            $("#home-slider").owlCarousel({
              loop: true,
              margin: 0,
              items: 1,
              autoplay: true,
              nav: true,
              responsiveClass: true,
              responsive: {
                0: {
                  items: 1,
                  nav: false,
                  dots: true
                },
                600: {
                  items: 1,
                  nav: false,
                  dots: true
                },
                1120: {
                  items: 1,
                  dots: false,
                  nav: true
                }
              }
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    //New arrivals
    fetchNewArrivals() {
      var self = this;

      axios
        .get(APIURL + "newarrivals")
        .then(response => {
          this.newArrivals = response.data.data;

          //New arrivals
          this.$nextTick(() => {
            var newArrivalOptions = {
              loop: true,
              autoplay: true,
              margin: 10,
              nav: true,
              responsive: {
                0: { items: 1, nav: false, dots: true },
                350: { items: 2, nav: false, dots: true },
                600: { items: 3, nav: false, dots: true },
                1000: { items: 4, nav: false, dots: true }
              }
            };

            $("#newProducts").owlCarousel(newArrivalOptions);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    async fetchBlogPosts() {
      let posts = await axios.get(APIURL + "blog");
      this.blogPosts = posts.data.posts;

      this.$nextTick(() => {
        //Press carousel
        $(".blog-carousel").owlCarousel({
          margin: 20,
          responsive: {
            0: {
              items: 1,
              nav: true,
              dots: false
            },
            600: {
              items: 2,
              nav: true,
              dots: false
            },
            1000: {
              items: 3,
              nav: true,
              dots: false
            }
          }
        });
      });
    }
  },
  created() {
    this.fetchSliderImages();
    this.fetchNewArrivals();
    this.fetchBlogPosts();
  }
};
</script>
