<template>
    <div>
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <div>Delivery Info</div>
                <div>
                    <button class="btn btn-success px-4 rounded" @click="saveDeliveryInfo($event)">
                        <i class="ti-save"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">First Name</label>
                                <input type="text" name="dfirstname" id="dfirstname" class="form-control"
                                    v-model.trim="delivery.fname"
                                    v-validate="'required'"
                                    data-vv-as="delivery first name"
                                >
                                <span class="text-danger">{{ errors.first('dfirstname') }}</span>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">Last Name</label>
                                <input type="text" name="dlastname" id="dlastname" class="form-control"
                                    v-model.trim="delivery.lname"
                                    v-validate="'required'"
                                    data-vv-as="delivery last name"
                                >
                                <span class="text-danger">{{ errors.first('dlastname') }}</span>
                            </div>
                        </div>
                    </div>
                    


                    <div class="form-group">
                        <label for="">Address Line 1</label>
                        <input type="text" name="daddress" id="daddress" class="form-control"
                            v-model.trim="delivery.address"
                            v-validate="'required'"
                            data-vv-as="delivery address line 1"
                        >
                        <span class="text-danger">{{ errors.first('daddress') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="">Address Line 2 (optional)</label>
                        <input type="text" name="daddress2" id="daddress2" class="form-control"
                            v-model.trim="delivery.address2"
                        >
                    </div>

                    <div class="row">

                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">Country</label>
                                <select name="dcountry" id="dcountry" class="form-control custom-select" 
                                    v-model="delivery.country"
                                    v-validate="'required'"
                                    data-vv-as="delivery country"
                                >
                                    <option value="AE">United Arab Emirates</option>
                                </select>
                                <span class="text-danger">{{ errors.first('dcountry') }}</span>
                            </div>
                        </div>
                        
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">City</label>
                                <input type="text" name="dcity" id="dcity" class="form-control"
                                    v-model.trim="delivery.city"
                                    v-validate="'required'"
                                    data-vv-as="delivery city"
                                >
                                <span class="text-danger">{{ errors.first('dcity') }}</span>
                            </div>
                        </div>

                        
                    </div>


                    <div class="form-group">
                        <label for="">Phone</label>
                        <input type="text" name="dphone" id="dphone" class="form-control"
                            v-model="delivery.phone"
                            v-validate="'required|numeric|min:10'"
                            data-vv-as="delivery phone"
                        >
                        <span class="text-danger">{{ errors.first('dphone') }}</span>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Delivery',
    data() {
        return {
            delivery: {
                fname: this.$store.state.userDeliveryInfo.firstname,
                lname: this.$store.state.userDeliveryInfo.lastname,
                address: this.$store.state.userDeliveryInfo.address,
                address2: this.$store.state.userDeliveryInfo.address2,
                city: this.$store.state.userDeliveryInfo.city,
                country: this.$store.state.userDeliveryInfo.country,
                phone: this.$store.state.userDeliveryInfo.phone
            }
        };
    },
    methods: {
        saveDeliveryInfo(e) {
            let btn = e.currentTarget;

            this.$validator.validateAll().then(result => {
                if (result) {
                    btn.classList.add('is-loading', 'is-loading-sm');
                    btn.setAttribute('disabled', '');

                    let params = new URLSearchParams();
                    params.append('dfname', this.delivery.fname);
                    params.append('dlname', this.delivery.lname);
                    params.append('daddress', this.delivery.address);
                    params.append('daddress2', this.delivery.address2);
                    params.append('dcity', this.delivery.city);
                    params.append('dcountry', this.delivery.country);
                    params.append('dphone', this.delivery.phone);
                    params.append('user', this.$store.state.userData.mask);

                    axios
                        .post(APIURL + 'users/update/delivery', params)
                        .then(response => {
                            btn.classList.remove('is-loading', 'is-loading-sm');
                            btn.removeAttribute('disabled');
                            let res = response.data;
                            if (res.status == 200) {
                                this.$swal('Success', res.msg, 'success');
                                this.$store.commit(
                                    'setUserDeliveryInfo',
                                    res.address
                                );
                            } else {
                                if (res.status == 400) {
                                    $.each(res.errors, (k, v) => {
                                        $('#' + k).after(v);
                                    });
                                } else {
                                    this.$swal('Error', res.msg, 'error');
                                }
                            }
                        })
                        .catch(err => {
                            //
                        });
                }
            });
        }
    }
};
</script>

