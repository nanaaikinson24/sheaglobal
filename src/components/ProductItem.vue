<template>
  <div class="product-container">
    <router-link :to="'/product/' + product.url_dash + '/' + product.mask">
      <div class="details">
        <div class="product-img text-center">
          <img :src="product.image" :alt="product.name">
        </div>

        <div class="related-product-content">
          <div class="text-center mt-3">
            <p>
              {{ product.name }}
              <small class="d-block text-secondary">{{ product.category }}</small>
            </p>
            <p v-if="productHasOffer(product.specialoffer, product.specialofferdateend)">
              <del class="pr-2 text-danger">AED {{ product.price }}</del>
              <span>AED {{ product.specialofferprice }}</span>
            </p>
            <p v-else>AED {{ product.price }}</p>
          </div>
        </div>
      </div>

      <div class="ribbon" v-if="product.quantity < 1">
        <small>Out of Stock</small>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
export default {
  name: "ProductItem",
  props: ["product"],
  methods: {
    // Date difference
    productHasOffer(specialoffer, expiryDate) {
      if (specialoffer) {
        const dateNow = moment();
        const dateExpiresAt = moment(expiryDate);
        if (dateNow.diff(dateExpiresAt, "days") <= 0) {
          return true;
        }
        return false;
      }
      return false;
    }
  }
};
</script>
