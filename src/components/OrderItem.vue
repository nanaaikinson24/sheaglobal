<template>
    <div class="shoppingCartItem py-4">

        <div class="d-flex flex-md-row">
            <div class="col-md-4">
                <div class="cartItem-img text-center">
                    <img :src="orderItem.image" :alt="orderItem.productname">
                </div>
            </div>

            <!-- Product info -->
            <div class="col-md-6">
                <p>
                    {{ orderItem.productname }}
                </p> 

                <h6 class="my-3">AED {{ orderItem.total_cost }} for {{ orderItem.productquantity }} 
                    {{ (orderItem.productquantity > 1) ? 'items' : 'item' }}</h6> 
            </div>
            
        </div>
    </div>
    
</template>

<script>
export default {
  name: "OrderItem",
  props: ["orderItem"]
};
</script>
