<template>
    <div class="app-product">
        <div class="container my-5">

            <!-- Breadcrumb -->
            <div class="row mb-5" v-if="contentLoaded">
                <div class="col-sm-12">

                    <div aria-label="breadcrumb" class="shea-global-breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/">Home</router-link>
                            </li>

                            <li class="breadcrumb-item">
                                <router-link :to="'/category/' + productData.categorydash + '/' + productData.categorymask">
                                    <span class="text-capitalize">
                                        {{ productData.category }}
                                    </span>
                                </router-link>
                            </li>
                            
                            <li class="breadcrumb-item active" aria-current="page">
                                {{ productData.name }}                            
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

            <!-- Product details -->
            <div class="row" v-if="contentLoaded">

                <!-- Product images -->
                <div class="col-md-2 product-image-container d-none d-md-block">
                    <div data-slider-id="1" class="owl-thumbs d-flex flex-column">
                            <button class="owl-thumb-item" v-for="(thumb, i) in productImages" :key="i">
                                <img :src="thumb.image" :alt="productData.name" >
                            </button>
                        </div>
                </div>

                <div class="col-md-4">

                    <div class="product-image-container">
                        <div class="product-carousel owl-carousel" data-slider-id="1">
                            <div class="carousel-img" v-for="(image, i) in productImages" :key="i">
                                <img :src="image.image" :alt="productData.name" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-4">
                        <p style="color: #43C13E" v-if="productData.quantity < 1">Out of Stock</p>
                        <h4>{{ productData.name }}</h4>

                        <h5 class="mt-4">AED {{ productData.price }}</h5>
                    </div>

                    <div class="mb-5">
                        <p>
                            {{ contentToText(productData.description) }}
                        </p>
                    </div>

                    <hr>

                    <div class="mb-3">
                        <div class="row">
                            <div class="col-md-4">
                                <input type="number" name="quantity" :id="'productQuantity-'+productData.mask" class="form-control"
                                    min="1" value="1"
                                >
                            </div>

                            <div class="col-md-4">
                                <button class="btn btn-success" 
                                    @click="addToCart(productData.mask, productData, $event)"
                                    :disabled="productData.quantity < 1"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                        <div class="row" v-if="quantityError.status">
                            <div class="col-md-12">
                                <p class="text-danger">{{ quantityError.msg }}</p>
                            </div>
                        </div>
                    </div>
                    

                    <div class="product-contact py-2 d-flex flex-row px-3 mt-5">
                        <div class="pt-2">
                            Distributer? To get this product, please contact us
                        </div>
                        <div class="ml-auto">
                            <router-link to="/contact" class="btn btn-success">
                            Contact Us</router-link>
                        </div>
                    </div>
                </div>

            </div>

            <!-- related products -->
            <div class="row my-5 " v-if="contentLoaded">
                <div class="col-md-12 pb-3">
                    <div class="header-title-hr-u mb-3 shea-title">
                        <h3><span>Related Products</span></h3>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="owl-carousel" id="relatedProductsCarousel">
                        <div class="product-container" v-for="(product, index) in relatedProducts" :key="index">
                            <router-link :to="'/product/' + product.url_dash + '/' + product.mask">
                                <div class="details">
                                    <div class="product-img text-center">
                                    
                                        <img :src="product.image" :alt="product.name">
                                        
                                    </div>

                                    <div class="related-product-content" >
                                        
                                        <div class="text-center mt-3">
                                            <p>
                                                {{ product.name }}
                                                <small class="d-block text-secondary">{{ product.category }}</small>
                                            </p>
                                            <p>AED {{ product.price }}</p>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div class="ribbon" v-if="product.quantity < 1">
                                    <small>Out of Stock</small>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" v-if="!contentLoaded">
                <div class="col-md-12 text-center">
                    <b-spinner></b-spinner>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import Bspinner from "@/components/Bspinner.vue";

export default {
  name: "Single",
  components: { BSpinner: Bspinner },
  data() {
    return {
      productData: {},
      relatedProducts: [],
      productImages: [],
      show404: false,
      quantityError: {
        status: false,
        msg: ""
      },
      contentLoaded: false
    };
  },
  metaInfo() {
    return {
      title: this.productData.name
    };
  },
  methods: {
    ...mapActions(["ADD_TO_CART"]),

    //Fetch product details
    fetchProductDetails() {
      var dash, mask;
      dash = this.$route.params.prodash;
      mask = this.$route.params.promask;

      axios
        .get(APIURL + "product?dash=" + dash + "&mask=" + mask)
        .then(response => {
          this.contentLoaded = true;

          if (response.data.status == 200) {
            var res = response.data;

            this.relatedProducts = res.data.relatedproducts;
            this.title = res.data.name;
            this.productData = {
              name: res.data.name,
              category: res.data.category,
              categorymask: res.data.categorymask,
              categorydash: res.data.categorydash,
              description: res.data.description,
              mask: res.data.mask,
              price: res.data.price
            };
            this.productImages = res.data.images;

            this.$nextTick(function() {
              $(".product-carousel").owlCarousel({
                loop: true,
                items: 1,
                thumbImage: false,

                // Enable this if you have pre-rendered thumbnails in your html instead of letting this plugin generate them. This is recommended as it will prevent FOUC
                thumbsPrerendered: true,

                // Class that will be used on the thumbnail container
                thumbContainerClass: "owl-thumbs",

                // Class that will be used on the thumbnail item's
                thumbItemClass: "owl-thumb-item"
              });

              $("#relatedProductsCarousel").owlCarousel({
                loop: false,
                autoplay: true,
                margin: 10,
                nav: true,
                responsive: {
                  0: { items: 1, nav: false, dots: true },
                  350: { items: 2, nav: false, dots: true },
                  600: { items: 3, nav: false, dots: true },
                  1000: { items: 4, nav: false, dots: true }
                }
              });
            });
          } else {
            this.show404 = true;
          }
        })
        .catch(err => {});
    },

    //To text
    contentToText(content) {
      return $("<div/>")
        .html(content)
        .text();
    },

    //Add to cart
    addToCart(mask, product, e) {
      var self = this;
      var btn = e.currentTarget;
      var productMask = mask;
      var quantity = document.querySelector("#productQuantity-" + mask).value;
      quantity = Number(quantity);

      if (typeof quantity != "number" || typeof quantity == NaN) {
        this.quantityError.status = true;
        this.quantityError.msg = "Please enter a valid number";
        return false;
      }

      if (quantity < 1) {
        this.quantityError.status = true;
        this.quantityError.msg = "Please enter a quantity greater than 0";
        return false;
      }

      this.quantityError.status = false;

      var productData = {
        name: product.name,
        quantity: quantity,
        category: "",
        mask: mask,
        price: product.price,
        image: this.productImages[0].image,
        totalPrice: (quantity * product.price).toFixed(2)
      };

      $(btn)
        .attr("disabled", "")
        .addClass("is-loading is-loading-sm");

      setTimeout(() => {
        $(btn)
          .removeAttr("disabled")
          .removeClass("is-loading is-loading-sm");
        this.ADD_TO_CART(productData);
        document.querySelector("#productQuantity-" + mask).value = 1;
      }, 500);
    }
  },
  created() {
    this.fetchProductDetails();
  }
};
</script>

<style lang="scss">
.product-contact {
  background-color: #d4d4d4;
}
</style>
