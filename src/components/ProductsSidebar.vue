<template>
    <div class="app-sidebar">

        <div class="product-categories">
            <ul class="main-list">
                <span v-for="(category, index) in categoryData" :key="index">

                    <span v-if="category.subcategories">
                        <li class="parent">
                            <span>{{ category.name }}</span>
                            <ul class="child-list">
                                
                                <li v-for="(subcategory, i) in category.subcategories" :key="i">
                                    <router-link 
                                        :to="'/category/' + category.dash + '/' + category.mask + '?sub=' + subcategory.dash"
                                    >
                                        {{ subcategory.name }}
                                    </router-link>
                                </li>
                                
                            </ul>
                        </li>
                    </span>

                    <span v-else>
                        <li class="parent">
                            <span>
                                <router-link :to="'/category/' + category.dash + '/' + category.mask">
                                    {{ category.name }}
                                </router-link>
                            </span>
                        </li>
                    </span>

                </span>
                                                                                                                                   
            </ul>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'ProductsSidebar',
        data() {
           return {
               categoryData: []
           }
        },
        methods: {
            fetchCategories() {
                var self = this;
                $.getJSON(APIURL + 'categories', function(data) {
                    self.categoryData = data;
                });    
            }
        },
        mounted() {
            this.fetchCategories();
        }
    }
</script>
