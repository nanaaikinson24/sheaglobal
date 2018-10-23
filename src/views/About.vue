<template>
    <div class="app-about">
        <hero-banner :title="bannerTitle"></hero-banner>

            <div class="container my-5">
                <div class="row pt-4 d-flex flex-md-row">
                    <div class="col-md-2">
                        <h3 class="shea-title pb-5">About <br/>Shea Global</h3>
                    </div>

                    <div class="col-md-9">
                        <div class="">
                            
                            <p>Shea Global General Trading LLC is a Dubai based trading and distribution company focused on introducing natural and eco-friendly products to the United Arab Emirates /Gulf Cooperation Council market. </p>
                            <p>We pride ourselves on offering a unique and broad selection of brands from the USA and Africa. </p>
                            <p>We have carefully selected companies who use only the most natural and environmentally friendly ingredients and process to make their products. </p>
                            <p>Shea Global is the sole distributor of Mitra Bath and Body, USA products in UAE and GCC.</p>
                        </div>
                    </div>
                </div>
            </div>
        <app-callback></app-callback>
    </div>
</template>

<script>
    var aboutImg = require('../assets/img/about03.jpg');
    import Callback from '../components/Callback';
    import TopHeroBanner from '../components/TopHeroBanner.vue';

    export default {
        components: {appCallback: Callback, heroBanner: TopHeroBanner},
        name: 'About',
        metaInfo: {
            title: 'About'
        },
        data() {
            return {
                bannerTitle: 'About Us',
                aboutImg: aboutImg
            }
        }
    }
</script>

<style>

</style>
