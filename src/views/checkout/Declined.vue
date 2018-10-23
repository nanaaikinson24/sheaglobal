<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="container my-5">
            <div class="row">
                <div class="col-md-12 col-lg-10 offset-lg-1 checkout-accordion">
                    <div class="text-center">
                        <h3>Your payment was Declined</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var aboutImg = require('@/assets/img/about03.jpg');
var SuccessIcon = require('@/assets/img/success.svg');
import TopHeroBanner from '@/components/TopHeroBanner.vue';

import axios from 'axios';

export default {
    components: {
        heroBanner: TopHeroBanner
    },
    name: 'Declined',
    data() {
        return {
            title: 'Payment Declined',
            contentLoaded: false,
            isError: false,
            SuccessIcon
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