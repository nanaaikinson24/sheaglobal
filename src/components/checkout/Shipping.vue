<template>
    <div class="">
        
            <form class="checkout-form">
                <div class="form-group">
                    <input type="text" name="fullname" id="fullname" class="form-control" placeholder="Name *">
                </div>
                <div class="form-group">
                    <input type="text" name="address" id="address" class="form-control" placeholder="Address Line 1 *">
                </div>

                <div class="form-group">
                    <input type="text" name="address2" id="address2" class="form-control" placeholder="Address Line 2">
                </div>

                <div class="form-group">
                    <input type="text" name="phone" id="phone" class="form-control" placeholder="Phone *">
                </div>
            </form>
        
    </div>
</template>

<script>
    export default {
        name: 'Shipping'
    }
</script>

<style>

</style>
