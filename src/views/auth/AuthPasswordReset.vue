<template>
    <div>
        <div class="mb-3">
            <h4>Need help with your password?</h4>
            <p>Enter your email, and we’ll help you create a new password.</p>
        </div>
        <div class="resetMsg"></div>
        <form>
            <div class="form-group">
                <input type="email" name="email" id="email" class="form-control"
                    placeholder="E-Mail" v-model="email"
                    v-validate="'required|email'"
                >
                <span class="text-danger">{{ errors.first('email') }}</span>
            </div>

            <div class="form-group">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <button class="btn btn-success btn-block" @click.prevent="passwordReset($event)">
                            Submit
                        </button>
                    </div>

                    <div class="col-12 col-md-6  d-flex">
                        <a href="javascript:void(0)" class="ml-md-auto mt-2" @click="$emit('changeAuthState', 'login')">Return to login</a>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'AuthPasswordReset',
        data() {
            return {
                email: ''
            }
        },
        methods: {
            passwordReset(e) {
                $('.s-v-e').remove();
                let btn = e.currentTarget;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let params = new URLSearchParams();
                        params.append('email', this.email);

                        btn.classList.add('is-loading', 'is-loading-sm');
                        btn.setAttribute('disabled', '');

                        axios.post(APIURL + 'account/passwordreset', params)
                        .then((response) => {
                            btn.classList.remove('is-loading', 'is-loading-sm');
                            btn.removeAttribute('disabled');

                            let res = response.data;
                            if (res.status == 200) {
                                this.email = '';
                                this.$validator.reset();

                                this.$swal('', res.msg, 'sucess');
                            }
                            else {
                                if (res.status == 403) {
                                    $.each(res.errors, (k, v) => {
                                        $('#' + k).after(v);
                                    })
                                }
                                else if (res.status == 203) {
                                    this.email = '';
                                    this.$validator.reset();

                                    this.$swal('', res.msg, 'error');
                                }
                                else {
                                    $('.resetMsg').html('<p class="text-danger text-center s-v-e" id="resetMsg">'+res.msg+'</p>');
                                    
                                    setTimeout(() => {
                                        $('#resetMsg').fadeOut(function() {
                                            $(this).remove();
                                        })
                                    }, 2500);
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    }
                })
            }
        }
    }
</script>
