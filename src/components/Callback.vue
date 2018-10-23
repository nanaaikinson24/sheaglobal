<template>
    <div class="app-callback">
        <div class="callback-container py-5"
             :style="{backgroundImage: 'linear-gradient( rgba(36, 111, 99, 0.60), rgba(36, 111, 99, 0.60) ),url('+callbackBgImg+')'}"
        >
            <div class="container my-4">
                <div class="row">
                    <!-- Callback text -->
                    <div class="col-md-6">
                        <div class="d-flex callback-flex-container mt-10">
                            <div class="callback-flex-item">
                                <h3 class="text-white mb-3">Talk with a Specialist</h3>
                                <p class="text-white">For more information on our products, or for technical questions regarding a particular ingredient or product, please feel free to contact us, and one of our specialists will be glad to assist you.</p>
                            </div>
                        </div> 
                    </div>

                    <!-- Callback form -->
                    <div class="col-md-5 offset-md-1">
                        <div class="card shadow">
                            <div class="card-body">
                                <div class="callbackFromMsg"></div>

                                <form id="callbackForm">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" name="name" id="name" class="form-control"
                                            v-model="callbackData.name" v-validate="'required'"
                                        >
                                        <span class="text-danger">{{ errors.first('name') }}</span>
                                    </div>

                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" id="email" class="form-control"
                                            v-model="callbackData.email" v-validate="'required|email'"
                                        >
                                        <span class="text-danger">{{ errors.first('email') }}</span>
                                    </div>

                                    <div class="form-group">
                                        <label>Message</label>
                                        <textarea name="message" id="message" cols="30" rows="4" class="form-control"
                                            v-model="callbackData.message" v-validate="'required'"
                                        ></textarea>
                                        <span class="text-danger">{{ errors.first('message') }}</span>
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p id="distributor" >
                                                    <span class="pr-3">Are you a distributor?</span>
                                                    <span class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="distributor" id="distributor1" value="yes"
                                                            v-model="callbackData.distributor" v-validate="'required|included:yes,no'"

                                                        >
                                                        <label class="form-check-label" for="distributor1">Yes</label>
                                                    </span>
                                                    <span class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="distributor" id="distributor2" value="no"
                                                            v-model="callbackData.distributor"

                                                        >
                                                        <label class="form-check-label" for="distributor2">No</label>
                                                    </span>
                                                    <span class="text-danger d-block">{{ errors.first('distributor') }}</span>
                                                </p>
                                                
                                            </div>

                                            <div class="col-md-12">
                                                <button class="btn btn-block btn-success" v-on:click.prevent="callbackSubmitFxn($event)">
                                                    Submit
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
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    var callbackBgImg = require('../assets/img/callback-form.jpg');
    export default {
        name: "Callback",
        data() {
            return {
                callbackBgImg: callbackBgImg,
                callbackData: { name: '', email: '', message: '', distributor: ''}
            }
        },
        methods: {
            callbackSubmitFxn(e) {
                var btn = e.currentTarget;
                var sve = document.querySelector('.s-v-e');
                if (sve) {
                    sve.remove(); 
                }

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let callBackData = {
                            'name' : this.callbackData.name,
                            'email' : this.callbackData.email,
                            'message' : this.callbackData.message,
                            'distributor' : this.callbackData.distributor
                        };

                        callBackData = JSON.stringify(callBackData);

                        axios.interceptors.request.use(function (config) {
                            btn.innerHTML = `<i class="fa fa-spinner fa-spin fa-fw"></i>`;
                            return config;
                        });

                        axios.post(APIURL + 'callback', callBackData).then(response => {
                            var res = response.data;
                            btn.innerHTML = 'Submit';
                            if (res.status === true) {
                                var responseMsg = document.querySelector('.callbackFromMsg');
                                var html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                ${res.msg}
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>`;
                                responseMsg.classList.add('my-3');
                                responseMsg.innerHTML = html;

                                this.callbackData.name = '';
                                this.callbackData.email = '';
                                this.callbackData.message = '';
                                this.callbackData.distributor = '';

                                this.$validator.reset()

                            }
                            else {
                                if (res.status === 'validation_errors') {
                                    res.errors.forEach((k, v) => {
                                        document.querySelector(`#${k}`).appendChild(v);
                                    }); 
                                }
                                else {
                                    var responseMsg = document.querySelector('.callbackFromMsg');
                                    var html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                ${res.msg}
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>`;
                                    responseMsg.classList.add('my-3');
                                    responseMsg.innerHTML = html;

                                    this.callbackData.name = '';
                                    this.callbackData.email = '';
                                    this.callbackData.message = '';
                                    this.callbackData.distributor = '';

                                    this.$validator.reset()
                                }
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>