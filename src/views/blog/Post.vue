<template>
    <div class="app-blog-post">
        <hero-banner :title="bannerTitle"></hero-banner>

        <!-- Main content -->
        <div class="container my-5">
            <div class="row" v-if="contentLoaded">
                <div class="col-md-8 offset-md-2">
                    <div class="post-details">
                        <h6 class="d-block text-secondary mb-2">{{ postData.date_craeted }}</h6>

                        <div class="post-img mb-5">
                            <img :src="postData.image" alt="" class="shadow-lg">
                        </div>

                        <div class="post-content">
                            <div v-html="postData.description"></div>
                        </div>

                        <div class="comment-section">
                            <div class="post-comments my-5">
                                <div class="header">
                                    {{ postComments.length }} Comments
                                </div>

                                <div class="comment-data my-4 pb-4" v-for="(comment, i) in postComments" :key="i">
                                    <div class=" d-flex flex-row">
                                        <h6>{{ comment.name }}</h6>
                                        <small class="ml-auto text-secondary">{{ comment.date_created }}</small>
                                    </div>

                                    <div>
                                        {{ comment.comment }}
                                    </div>
                                </div>
                            </div>

                            <div class="add-post-comment">
                                <div class="text-center mb-5">
                                    <h5>Leave a Comment </h5>
                                </div>

                                <div class="commentFormMsg"></div>

                                <p>NB: Your email address will not be published. All fields are mandatory</p>
                                <form autocomplete="off">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="text" name="name" id="name" class="form-control"
                                                    placeholder="Your Name" v-validate="'required'"
                                                    v-model="userComment.name"
                                                >
                                                <span class="text-danger">{{ errors.first('name') }}</span>
                                            </div>

                                            <div class="col-md-6">
                                                <input type="email" name="email" id="email" class="form-control"
                                                    placeholder="Your Email" v-validate="'required|email'"
                                                    v-model="userComment.email"
                                                >
                                                <span class="text-danger">{{ errors.first('email') }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <textarea name="comment" id="comment" cols="30" rows="6" class="form-control"
                                            placeholder="Your Comment" v-model="userComment.comment" v-validate="'required'"
                                        ></textarea>
                                        <span class="text-danger">{{ errors.first('comment') }}</span>
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6 offset-md-3">
                                                <button class="btn btn-success btn-block" v-on:click.prevent="addComment($event)">
                                                    Post Comment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

            <div class="row" v-if="!contentLoaded">
                <div class="col-md-8 offset-md-2">
                    <div class="fake-post-item">
                        <div class="fake-date animated-background mb-3"></div>

                        <div class="fake-image animated-background mb-3"></div>

                        <div class="fake-content animated-background mb-2"></div>
                        <div class="fake-content animated-background mb-2"></div>
                        <div class="fake-content animated-background mb-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var aboutImg = require('../../assets/img/about03.jpg');
    import TopHeroBanner from '../../components/TopHeroBanner.vue';
    import axios from 'axios';

    export default {
        components: {heroBanner: TopHeroBanner},
        name: 'Post',
        data() {
            return {
                postData: '',
                postTitle: '',
                bannerTitle: '',
                postComments: [],
                aboutImg: aboutImg,
                userComment: {name: '', email: '', comment: ''},
                contentLoaded: true
            }
        },
        metaInfo () {
            return {
                title: this.postTitle
            }
        },
        methods: {
            // Fetch post data
            fetchPostData() {
                var dash = this.$route.params.blogdash;
                var mask = this.$route.params.blogmask;

                if (dash && mask) 
                {
                    this.contentLoaded = false;

                    axios.get(APIURL + 'blog/' + dash + '/' + mask).then((response) => {
                        var res = response.data;

                        if (res.status == 200) 
                        {
                            this.contentLoaded = true;
                            this.postData = res.data;
                            this.postComments = res.data.comments;
                            this.bannerTitle = this.capitalizeEachWord(res.data.title);
                        }
                        else {
                            this.$router.push({name: 'error404'});
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
                else {
                    this.$router.push({ name: 'error404s'});
                }
            },

            //Add post comment
            addComment(e) {
                var btn = e.currentTarget;
                var sve = document.querySelector('.s-v-e');
                if (sve) {
                    sve.remove();
                }
                this.$validator.validateAll().then(result => {
                    if (result) {
                        var mask = this.$route.params.blogmask;
                        var requestData = JSON.stringify(this.userComment);
                        btn.innerHtml = '<span class="fa fa-spin fa-spinner fa-fw"></span>';

                        axios.post(APIURL + 'addcomment/' + mask, requestData).then((response) => {
                            var res = response.data;
                            if (res.status == 200) {
                                btn.innerHtml = 'Post Comment';
                                this.userComment = {email: '', name: '', comment: ''};
                                this.postComments.push(res.comment);
                                this.$validator.reset();
                            }
                            else {
                                if (res.status == 412) {
                                    res.error.forEach((k, v) => {
                                        document.querySelector('#'+ k).after(v);
                                    })
                                }
                                else {
                                    var html = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                    ${res.msg}
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>`;
                                    document.querySelector('.commentFormMsg').classList.add('mb-3');
                                    document.querySelector('.commentFormMsg').innerHtml = html;
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                
            },

            capitalizeEachWord(str) {
                var lower = String(str).toLowerCase();
                return lower.replace(/(^| )(\w)/g, function(x) {
                    return x.toUpperCase();
                });
            }
        },
        created() {
            this.fetchPostData();
        }
    }
</script>
