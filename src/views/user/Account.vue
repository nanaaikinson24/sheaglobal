<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        

        <div class="container mb-5 mt-3 details">
            <div v-if="contentLoaded">
                <div class="row">
                    <div class="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb bg-transparent">

                                <li class="breadcrumb-item" @click="accountView = 'general'"
                                    :class="(address == 'general') ? 'active': ''"
                                >
                                    <a href="javascript:void(0)">General Details</a>
                                </li>

                                <li class="breadcrumb-item" @click="accountView = 'addresses'"
                                    :class="(address == 'addresses') ? 'active': ''"
                                >
                                    <a href="javascript:void(0)">Address Details</a>
                                </li>

                            </ol>
                        </nav>
                    </div>
                </div>

                <div class="row" v-if="accountView == 'general'">
                    <div class="col-md-7 col-lg-6">
                        <details-comp 
                            :email="computedUserData.email"
                            :mask="computedUserData.mask"
                            :firstname="userData.firstname"
                            :lastname="userData.lastname"
                        />
                    </div>

                    <div class="col-md-5 col-lg-6">
                        <password 
                            :mask="computedUserData.mask"
                        />
                    </div>
                </div>

                <div v-if="accountView == 'addresses'">
                    <div class="row">
                        <div class="col-md-12 col-lg-8 offset-lg-2 mb-3">
                            <delivery></delivery>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" style="height: 400px;" v-if="!contentLoaded">
                <div class="col-md-12 text-center">
                    <spinner></spinner>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
var aboutImg = require('@/assets/img/about03.jpg');

import TopHeroBanner from '@/components/TopHeroBanner.vue';
import Password from '@/components/user/Password.vue';
import DetailsComp from '@/components/user/Details.vue';
import Delivery from '@/components/user/Delivery.vue';
import Spinner from '@/components/Bspinner.vue';

import axios from 'axios';

export default {
    components: {
        heroBanner: TopHeroBanner,
        Password,
        DetailsComp,
        Spinner,
        Delivery
    },
    name: 'Account',
    data() {
        return {
            title: 'My Profile',
            userData: {
                firstname: '',
                lastname: ''
            },
            address: {},
            contentLoaded: false,
            accountView: 'general'
        };
    },
    metaInfo() {
        return {
            title: this.title
        };
    },
    computed: {
        computedUserData() {
            return this.$store.getters.userDetailsGetter;
        }
    },
    methods: {
        async fetchUserDetails() {
            let { email, mask } = this.$store.state.userData;
            let { data } = await axios.get(
                APIURL + `user/?email=${email}&mask=${mask}`
            );

            if (data.status == 200) {
                this.userData.firstname = data.data.firstname;
                this.userData.lastname = data.data.lastname;

                if (data.data.delivery) {
                    this.$store.commit(
                        'setUserDeliveryInfo',
                        data.data.delivery
                    );
                }

                if (data.data.billing) {
                    this.$store.commit('setUserBillingInfo', data.data.billing);
                }

                this.contentLoaded = true;
            } else {
                this.contentLoaded = true;
            }
        },

        fetchCountries() {
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(response => {
                    this.countries = response.data;
                    //console.log(this.countries);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.fetchUserDetails();
        this.fetchCountries();
    }
};
</script>



