<template>
    <div class="app-products">
        <hero-banner :title="bannerTitle"></hero-banner>

        <div class="container my-5">
            <div class="row" v-if="categoryContentLoaded">
                <div class="col-md-4 col-sm-6 mb-3" v-for="(category, i) in productCategories"  :key="i">
                    <router-link :to="'/category/' + category.dash + '/' + category.mask">
                        <div class="product-category-container" :style="{backgroundImage: 'url('+category.thumb+')'}">
                        
                            <div class="category-detail">
                                <div>
                                    {{ category.name }}
                                </div>
                            </div>              
                        </div>
                    </router-link>
                </div>

                
            </div>

            <div class="row" v-if="!categoryContentLoaded">
                <div class="col-md-4 col-sm-6 mb-3" v-for="(item, i) in fakeContentItems" :key="i">
                    <fake-content></fake-content>
                </div>
            </div>
        </div>

        <!-- Callback component -->
        <app-callback></app-callback>
    </div>
</template>

<script>
    import axios from 'axios';
    import Callback from '../../components/Callback.vue';
    import FakeContent from '../../components/CategoryFakeContent.vue';
    import TopHeroBanner from '../../components/TopHeroBanner.vue';

    export default {
        components: {appCallback: Callback, fakeContent: FakeContent, heroBanner: TopHeroBanner},
        name: 'Products',
        data() {
            return {
                productCategories: [],
                fakeContentItems: 6,
                categoryContentLoaded: false,
                bannerTitle: 'Our Products'
            }
        },
        metaInfo: {
            title: 'Our Products'
        },
        methods: {

            //Fetch product categories
            fetchProductCategories() {

                axios.get(APIURL + 'productcategories').then(response => {

                    this.productCategories = response.data;
                    this.categoryContentLoaded = true;

                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.fetchProductCategories();
        }
    }
</script>
