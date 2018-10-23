<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row">
                <div class="col-md-12 col-lg-10 offset-lg-1 checkout-accordion">
                    <div class="text-center">
                        <img :src="infoIcon" alt="..." height="30" width="30">
                        <p>Your order is {{ $route.query.p }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var aboutImg = require('@/assets/img/about03.jpg');
var infoIcon = require('@/assets/img/info.svg');
import TopHeroBanner from '@/components/TopHeroBanner.vue';

import axios from 'axios';

export default {
    components: {
        heroBanner: TopHeroBanner
    },
    name: 'Info',
    data() {
        return {
            title: 'Payment Info',
            contentLoaded: false,
            isError: false,
            infoIcon
        };
    },
    computed: {
        //User is logged in
        userIsLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    },
    methods: {}
};
</script>