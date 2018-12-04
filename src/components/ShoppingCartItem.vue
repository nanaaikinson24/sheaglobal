<template>
    <div class="shoppingCartItem py-4">

        <div class="d-flex flex-md-row">
            <div class="col-md-4">
                <div class="cartItem-img text-center">
                    <img :src="cartItem.image" :alt="cartItem.name">
                </div>
            </div>

            <!-- Product info -->
            <div class="col-md-6">
                <p>
                    {{ cartItem.name }}
                    <!-- <small class="d-block" style="color: #878787">Category</small> -->
                </p> 

                <h6 class="my-3">AED {{ cartItem.totalPrice }}</h6>

                <div>
                    <div class="priceupd">
                        <div class="pricebtn">
                            <button class="minus"  :disabled="quantity == 1"
                                :id="itemMask"
                                v-on:click="decreaseQuantity($event, itemMask)"
                            > – </button>

                            <div class="priceval"> 
                                <input type="text" v-model.number="quantity" class="prodqty" name="quantity" 
                                    v-on:keypress="isNumberKey($event)" autocomplete="off"
                                >
                            </div>

                            <button class="plus"
                                :id="itemMask"
                                v-on:click="increaseQuantity($event, itemMask)"
                            > + </button>
                        </div>

                        <div class="remvbtn">
                            <button class="btn btn-link is-danger"
                                @click="removeFromCart(arrIndex)"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>  
            </div>
            
        </div>
    </div>
    
</template>

<script>
let _ = require("lodash");
export default {
  name: "ShoppingCartItem",
  props: ["cartItem", "itemMask", "arrIndex"],
  data() {
    return {
      quantity: this.cartItem.quantity,
      itemId: this.cartItem.mask
    };
  },

  methods: {
    //Increase quantity
    increaseQuantity(e, mask) {
      this.quantity += 1;
      var btn = e.currentTarget;
      var item = {
        mask: mask,
        quantity: this.quantity
      };

      $(".site-update-cart").show();
      setTimeout(() => {
        $(".site-update-cart").hide();
        this.$store.commit("updateCartItem", item);
      }, 500);
    },

    //Decrease quantity
    decreaseQuantity(e, mask) {
      this.quantity -= 1;
      var btn = e.currentTarget;
      var item = {
        mask: mask,
        quantity: this.quantity
      };
      $(".site-update-cart").show();
      setTimeout(() => {
        $(".site-update-cart").hide();
        this.$store.commit("updateCartItem", item);
      }, 500);
    },

    //Remove from cart
    removeFromCart(index) {
      $(".site-remove-cart").show();
      setTimeout(() => {
        $(".site-remove-cart").hide();
        this.$store.commit("removeFromCart", index);
      }, 500);
    },

    isNumberKey(e) {
      let character;
      let charCode = e.which ? e.which : e.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      }

      this.debouncedGetQuantity();
      return true;
    },

    //Get quantity
    getQuantity() {
      let quantity = this.quantity;
      quantity = String(quantity);
      if (parseInt(quantity.charAt(0)) < 1 || quantity == "") {
        this.quantity = this.$store.getters.getSpecificItem(this.itemId);
        this.$store.commit("updateCartItem", this.quantity);
        return;
      }
      var item = {
        mask: this.itemId,
        quantity: this.quantity
      };

      $(".site-update-cart").show();
      setTimeout(() => {
        $(".site-update-cart").hide();
        this.$store.commit("updateCartItem", item);
      }, 500);
    }
  },
  created() {
    this.debouncedGetQuantity = _.debounce(this.getQuantity, 500);
  }
};
</script>
