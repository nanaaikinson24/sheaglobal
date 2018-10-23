<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="my-5 container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    
                    <p class="mb-3">Refunds will be made onto the original mode of payment and will be processed within 10 to 45 days depends on the issuing bank of the credit card</p>
                    <p>Refunds will be issued based on the following: </p>
                    <div class="terms-list">
                        <ul>
                            <li>The wrong product was sent by the merchant.</li>
                            <li>The product is defective.</li>
                            <li>The product was damaged in shipping.</li>
                            <li>The product is tampered.</li>
                        </ul>
                    </div>
                    <p>No refund will be issued on opened or used products. </p>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopHeroBanner from '@/components/TopHeroBanner.vue';
    export default {
        components: {heroBanner: TopHeroBanner},
        name: 'Refund',
        data() {
            return {
                title: 'Refund Policy',
            }
        },
        metaInfo() {
            return {
                title: 'Refund Policy'
            }
        }
    }
</script>
