<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="passwordFormMsg"></div>

                <form>
                    <div class="form-group">
                        <label for="">Current Password</label>
                        <input type="password" name="cpassword" id="cpassword" class="form-control"
                            v-validate="'required'" v-model="cpassword"
                        >
                        <span class="text-danger d-block">{{ errors.first('cpassword') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="">New Password</label>
                        <input type="password" name="npassword" id="npassword" class="form-control"
                            v-validate="'required|min:8|max:20'" ref="npassword" v-model="npassword"
                        >
                        <span class="text-danger d-block">{{ errors.first('npassword') }}</span>
                        <small class="text-secondary">Your password must be 8-20 characters long.</small>
                    </div>

                    <div class="form-group">
                        <label for="">Confirm New Password</label>
                        <input type="password" name="cnpassword" id="cnpassword" class="form-control"
                            v-validate="'required|confirmed:npassword'" v-model="cnpassword"
                        >
                        <span class="text-danger d-block">{{ errors.first('cnpassword') }}</span>
                    </div>

                    <div class="form-group">
                        <div class="text-center">
                            <button class="btn btn-success" @click.prevent="updatePassword($event)">
                                Update Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Password',
        props: ['mask'],
        data() {
            return {
                cpassword: '',
                npassword: '',
                cnpassword: ''
            }
        },
        methods: {
            //Update password
            updatePassword(e) {
                let btn = e.currentTarget;
                $('.s-v-e').remove();

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        btn.setAttribute('disabled', '');
                        btn.classList.add('is-loading', 'is-loading-sm');

                        let params = new URLSearchParams();
                        params.append('cpassword', this.cpassword);
                        params.append('npassword', this.npassword);
                        params.append('cnpassword', this.cnpassword);
                        params.append('mask', this.mask);

                        axios.post(APIURL + 'users/update/password', params)
                        .then((response) => {
                            btn.removeAttribute('disabled');
                            btn.classList.remove('is-loading', 'is-loading-sm');

                            let res = response.data;

                            if (res.status == 200) {
                                this.cpassword = '';
                                this.npassword = '';
                                this.cnpassword = '';
                                this.$validator.reset();

                                this.$swal('Success', res.msg, 'success');
                            }
                            else {
                                if (res.status == 400) {
                                    $.each(res.errors, (k, v) => {
                                        $('#'+k).after(v);
                                    })
                                }
                                else {
                                    let html = `<p id="passwordFormMsg" class="s-v-e text-danger text-center">${res.msg}</p>`;
                                    $('.passwordFormMsg').html(html);
                                    setTimeout(() => {
                                        $('#passwordFormMsg').fadeOut();
                                    }, 2500);
                                }
                            }
                        })
                        .catch((err) =>{
                            console.log(err);
                        })
                    }
                })
            }
        }
    }
</script>

<style>

</style>
