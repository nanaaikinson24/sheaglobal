<template>
    <div>
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <div>Billing Info</div>
                <div>
                    <button class="btn btn-success px-4 rounded" @click="saveBillingInfo($event)">
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
                                <input type="text" name="bfirstname" id="bfirstname" class="form-control"
                                    v-model.trim="billing.fname"
                                    v-validate="'required'"
                                    data-vv-as="billing first name"
                                >
                                <span class="text-danger">{{ errors.first('bfirstname') }}</span>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">Last Name</label>
                                <input type="text" name="blastname" id="blastname" class="form-control"
                                    v-model.trim="billing.lname"
                                    v-validate="'required'"
                                    data-vv-as="billing last name"
                                >
                                <span class="text-danger">{{ errors.first('blastname') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="">Email </label>
                        <input type="text" name="bemail" id="bemail" class="form-control"
                            v-model="billing.email"
                            v-validate="'required|email'"
                            data-vv-as="billing email"
                        >
                        <span class="text-danger">{{ errors.first('bemail') }}</span>
                    </div>
                    


                    <div class="form-group">
                        <label for="">Address Line 1</label>
                        <input type="text" name="baddress" id="baddress" class="form-control"
                            v-model.trim="billing.address"
                            v-validate="'required'"
                            data-vv-as="billing address line 1"
                        >
                        <span class="text-danger">{{ errors.first('baddress') }}</span>
                    </div>

                    <div class="form-group">
                        <label for="">Address Line 2 (optional)</label>
                        <input type="text" name="baddress2" id="baddress2" class="form-control"
                            v-model.trim="billing.address2"
                        >
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">Country</label>
                                <select name="bcountry" id="bcountry" class="form-control custom-select" 
                                    v-model="billing.country"
                                    v-validate="'required'"
                                    data-vv-as="billing country"
                                >
                                    <option 
                                        v-for="(country, i) in countries"
                                        :key="i"
                                        :value="country.alpha2Code"
                                    >
                                        {{ country.name }}
                                    </option>
                                </select>
                                <span class="text-danger">{{ errors.first('bcountry') }}</span>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="">City</label>
                                <input type="text" name="bcity" id="bcity" class="form-control"
                                    v-model.trim="billing.city"
                                    v-validate="'required'"
                                    data-vv-as="billing city"
                                >
                                <span class="text-danger">{{ errors.first('bcity') }}</span>
                            </div>
                        </div>

                        
                    </div>


                    

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Billing",
  data() {
    return {
      billing: {
        fname: this.$store.state.userBillingInfo.firstname,
        lname: this.$store.state.userBillingInfo.lastname,
        address: this.$store.state.userBillingInfo.address,
        address2: this.$store.state.userBillingInfo.address2,
        city: this.$store.state.userBillingInfo.city,
        country: this.$store.state.userBillingInfo.country,
        email: this.$store.state.userBillingInfo.email
      }
    };
  },
  props: ["countries"],
  methods: {
    saveBillingInfo(e) {
      let btn = e.currentTarget;

      this.$validator.validateAll().then(result => {
        if (result) {
          btn.classList.add("is-loading", "is-loading-sm");
          btn.setAttribute("disabled", "");

          let params = new URLSearchParams();
          params.append("bfname", this.billing.fname);
          params.append("blname", this.billing.lname);
          params.append("baddress", this.billing.address);
          params.append("baddress2", this.billing.address2);
          params.append("bcity", this.billing.city);
          params.append("bcountry", this.billing.country);
          params.append("bemail", this.billing.email);
          params.append("user", this.$store.state.userData.mask);

          axios
            .post(APIURL + "users/update/billing", params)
            .then(response => {
              btn.classList.remove("is-loading", "is-loading-sm");
              btn.removeAttribute("disabled");
              let res = response.data;
              if (res.status == 200) {
                this.$swal("Success", res.msg, "success");
                this.$store.commit("setUserBillingInfo", res.address);
              } else {
                if (res.status == 400) {
                  $.each(res.errors, (k, v) => {
                    $("#" + k).after(v);
                  });
                } else {
                  this.$swal("Error", res.msg, "error");
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
