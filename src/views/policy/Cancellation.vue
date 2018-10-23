<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="my-5 container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="terms-list">
                        <ul>
                            <li>The customer has 24 hours from placing the order of goods to report an item, goods or services ordered to be cancelled/replaced and the related conditions.</li>
                            <li>The conditions under which cancellation & replacement will be allowed is if the wrong order was placed on to switch products.</li>
                            
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TopHeroBanner from '@/components/TopHeroBanner.vue';
    export default {
        components: {heroBanner: TopHeroBanner},
        name: 'Cancellation',
        data() {
            return {
                title: 'Cancellation Policy',
            }
        },
        metaInfo() {
            return {
                title: 'Cancellation Policy'
            }
        }
    }
</script>
