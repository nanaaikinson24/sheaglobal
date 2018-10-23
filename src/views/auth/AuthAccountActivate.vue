<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <div class="card">

                    <div class="card-body">
                        <div class="success" v-if="activationData.status == 200">
                            <h3 class="text-success">Account activation successful</h3>
                            <p><router-link to="/account">Click here</router-link> to login into your account.</p>
                        </div>

                        <div class="invalid" v-if="activationData.status == 400">
                            <h3 class="text-danger">Sorry, the activation link you provided is incorrect or no longer valid.</h3>

                            <p>This might be because:</p>
                            <p>The account link has expired - Accounts must be activated within 3 days from when you received the email.</p>
                            <p><router-link to="/account">Click here</router-link> to request a new activation email.</p>
                            <p>If the link is from an email within the last 3 days, please check it again (sometimes email clients will break links, so try copying it manually and pasting into the browser) </p>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    let moment = require('moment');

    export default {
        name: 'AuthAccountActivate',
        data() {
            return {
                invalidParams: false,
                activationData: {}
            }
        },
        methods: {
            async fetchTokenDetails() {
                let token = this.$route.params.authtoken;
                let uuid = this.$route.params.authuserid;

                if (!token && !uuid) {
                    this.invalidParams = true;
                    return false
                }
                let { data } = await axios.get(APIURL + `account/activate/${uuid}/${token}`);
                this.activationData = data;
            }
        },
        created() {
            this.fetchTokenDetails();
        }
    }
</script>

