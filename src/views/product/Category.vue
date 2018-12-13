<template>
  <div class="app-category">
    <hero-banner :title="bannerTitle"></hero-banner>

    <div class="container">
      <div class="my-5" v-if="showMainContent">
        <div class="row">
          <div class="col-md-3 d-none d-md-block">
            <products-sidebar></products-sidebar>
          </div>

          <div class="col-md-9">
            <div v-if="contentLoaded">
              <!-- has subcategories -->
              <div
                class="product-subcategory mb-5"
                v-if="subcategoryData"
                v-for="(subcategory, i) in subcategoryData"
                :key="i"
              >
                <h5 class="shea-title pb-4" :id="subcategory.url_dash">{{ subcategory.name }}</h5>
                <p>{{ contentToText(subcategory.description) }}</p>

                <div class="category-product-carousel owl-carousel owl-theme">
                  <product-item
                    :product="product"
                    v-for="(product, index) in subcategory.products"
                    :key="index"
                  />
                </div>
              </div>

              <!-- no subcategories -->
              <div v-if="productsData.length > 0">
                <h5 class="shea-title pb-4">{{ categoryData.name }}</h5>
                <!-- <p>{{ contentToText(categoryData.description) }}</p> -->
                <p v-html="categoryData.description"></p>

                <div class="my-5">
                  <div class="row">
                    <div
                      class="col-md-4 mb-3 pro-cat"
                      v-for="(product, index) in productsData"
                      :key="index"
                    >
                      <product-item :product="product"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fake content -->
            <div v-if="!contentLoaded">
              <div v-for="(fake, i) in fakeItems" :key="i">
                <fake-content></fake-content>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row my-5" v-if="!showMainContent">
        <error404></error404>
      </div>
    </div>
    <app-callback></app-callback>
  </div>
</template>

<script>
import axios from "axios";
import Callback from "../../components/Callback.vue";
import ErrorComponent from "../../components/Error404.vue";
import ProductCategoryFakeLoader from "../../components/ProductCategoryFakeLoader.vue";
import ProductsSidebar from "../../components/ProductsSidebar.vue";
import TopHeroBanner from "../../components/TopHeroBanner.vue";
import ProductItem from "@/components/ProductItem.vue";

export default {
  components: {
    error404: ErrorComponent,
    appCallback: Callback,
    fakeContent: ProductCategoryFakeLoader,
    productsSidebar: ProductsSidebar,
    heroBanner: TopHeroBanner,
    ProductItem
  },
  name: "Category",
  data() {
    return {
      showMainContent: true,
      categoryData: [],
      subcategoryData: [],
      productsData: [],
      hasSubcategory: "",
      contentLoaded: false,
      fakeItems: 3,
      categoriesData: [],
      bannerTitle: "Products"
    };
  },
  metaInfo() {
    return {
      title: this.categoryData.name
    };
  },
  methods: {
    //Fetch category detail
    fetchCategoryDetail() {
      var dash = this.$route.params.catdash;
      var mask = this.$route.params.catmask;

      axios
        .get(APIURL + "category/" + dash + "/" + mask)
        .then(response => {
          if (response.data.status == 200) {
            var res = response.data;

            this.contentLoaded = true;
            this.categoryData = res.data.category;
            this.hasSubcategory = res.data.subcategories;

            if (this.hasSubcategory) {
              this.subcategoryData = res.data.data;
            } else {
              this.productsData = res.data.data;
            }

            this.$nextTick(() => {
              var categoryProductOptions = {
                loop: false,
                autoplay: true,
                margin: 10,
                nav: true,
                responsive: {
                  0: { items: 1, nav: false, dots: true },
                  350: { items: 2, nav: false, dots: true },
                  600: { items: 3, nav: false, dots: true },
                  1000: { items: 3, nav: false, dots: true }
                }
              };

              $(".category-product-carousel").owlCarousel(
                categoryProductOptions
              );
            });
          } else {
            this.showMainContent = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //To text
    contentToText(content) {
      return $("<div/>")
        .html(content)
        .text();
    }

    //Fetch categories
    /*fetchCategories() {
                var response = await axios.get(APIURL + 'categories').then(response => {
                    this.categoriesData = await response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
                    
            }*/
  },
  created() {
    this.fetchCategoryDetail();
    //this.fetchCategories();
  },
  mounted() {
    var self = this;
    setTimeout(() => {
      var queryString = self.$route.query.sub;
      if (queryString) {
        $("html, body").animate(
          {
            scrollTop: $("#" + queryString).offset().top
          },
          1000
        );
      }
    }, 1000);
  }
};
</script>
