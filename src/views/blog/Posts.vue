<template>
    <div class="app-blog">
        <hero-banner :title="bannerTitle"></hero-banner>

        <div class="container my-5">
            <div class="row" v-if="postsContentLoaded">
                <div class="col-md-4 col-sm-6" v-for="(post, i) in blogPosts.posts" :key="i">
                    <div class="blog-card">
                        <div class="blog-card-img" v-on:click="navigateToPost(post.dash, post.mask)">
                            <img :src="post.image" :alt="post.title" class="">
                        </div>

                        <div class="blog-card-content mt-3">
                            <small class="d-block text-secondary mb-2">{{ post.date_craeted }}</small>
                            <h2 class="h5 mb-3">
                                <router-link :to="'/blog/' + post.dash + '/' + post.mask">{{ post.title }}</router-link>
                            </h2>

                            <p v-html="post.description"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" v-if="!postsContentLoaded">
                <div class="col-md-4 col-sm-6" v-for="(items, i) in fakeItems" :key="i">
                    <blog-fake-item></blog-fake-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var aboutImg = require('../../assets/img/about03.jpg');
    import TopHeroBanner from '../../components/TopHeroBanner.vue';
    import BlogPostsfakeItem from '../../components/BlogPostsfakeItem.vue';
    import axios from 'axios';

    export default {
        components: {heroBanner: TopHeroBanner, blogFakeItem: BlogPostsfakeItem},
        name: 'Posts',
        metaInfo: {
            title: 'Blog'
        },
        data() {
            return {
                bannerTitle: 'Blog',
                aboutImg: aboutImg,
                fakeItems: 6,
                postsContentLoaded: false,
                blogPosts: []
            }
        },
        methods: {
            async fetchBlogPosts() {
                let posts = await axios.get(APIURL + 'blog');
                this.blogPosts = posts.data;
                this.postsContentLoaded = true;
            },
            
            navigateToPost(dash, mask) {
                this.$router.push({ path: `/blog/${dash}/${mask}` });
            }
        },
        created() {
            this.fetchBlogPosts();
        }
    }
</script>
