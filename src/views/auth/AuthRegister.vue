<template>
    <div>
        <div class="mb-3">
            <h4>New Customer?</h4>
            <p class="text-white">Enter your detailsss</p>
        </div>

        <div class="registerMsg mb-3"></div>

        <form id="registerForm">
            <div class="form-group">
                <input type="text" name="firstname" id="firstname" class="form-control"
                    placeholder="First Name" v-model="firstname" v-validate="'required'" data-vv-as="first name"
                >
                <span class="text-danger">{{ errors.first('firstname') }}</span>
            </div>
            <div class="form-group">
                <input type="text" name="lastname" id="lastname" class="form-control"
                    placeholder="Last Name" v-model="lastname" v-validate="'required'" data-vv-as="last name"
                >
                <span class="text-danger">{{ errors.first('lastname') }}</span>
            </div>
            <div class="form-group">
                <input type="email" name="remail" id="remail" class="form-control"
                    placeholder="Email" v-model="remail" v-validate="'required|email'"
                    data-vv-as="email"
                >
                <span class="text-danger">{{ errors.first('remail') }}</span>
            </div>

            <div class="form-group">
                <input type="password" name="rpassword" id="rpassword" class="form-control" ref="rpassword"
                    placeholder="Password" v-model="rpassword" v-validate="'required|min:8|max:20'"
                    data-vv-as="password"
                >
                <small class="text-secondary">Your password must be 8-20 characters long.</small>
                <span class="text-danger d-block">{{ errors.first('rpassword') }}</span>
            </div>

            <div class="form-group">
                <input type="password" name="cpassword" id="cpassword" class="form-control"
                    placeholder="Confirm Password" v-model="cpassword" v-validate="'required|confirmed:rpassword'"
                    data-vv-as="confirm password"
                >
                <span class="text-danger d-block">{{ errors.first('cpassword') }}</span>
            </div>

            <div class="form-group">
                <button class="btn btn-success btn-block mb-2" @click.prevent="register($event)">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AuthRegister",
  data() {
    return {
      remail: "",
      rpassword: "",
      cpassword: "",
      firstname: "",
      lastname: ""
    };
  },
  methods: {
    register(e) {
      var btn = e.currentTarget;
      $(".s-v-e").remove();

      this.$validator.validateAll().then(result => {
        if (result) {
          let params = new URLSearchParams();
          params.append("firstname", this.firstname);
          params.append("lastname", this.lastname);
          params.append("remail", this.remail);
          params.append("rpassword", this.rpassword);
          params.append("cpassword", this.cpassword);

          btn.classList.add("is-loading", "is-loading-sm");
          btn.setAttribute("disabled", "");

          axios
            .post(APIURL + "account/create", params)
            .then(response => {
              btn.classList.remove("is-loading", "is-loading-sm");
              btn.removeAttribute("disabled");

              let res = response.data;

              if (res.status == 200) {
                this.firstname = "";
                this.lastname = "";
                this.remail = "";
                this.rpassword = "";
                this.cpassword = "";
                this.$validator.reset();

                this.$swal("", res.msg, "success");
              } else {
                if (res.status == 403) {
                  $.each(res.errors, (k, v) => {
                    $("#" + k).after(v);
                  });
                } else {
                  this.firstname = "";
                  this.lastname = "";
                  this.remail = "";
                  this.rpassword = "";
                  this.cpassword = "";
                  this.$validator.reset();

                  this.$swal("", res.msg, "error");
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
