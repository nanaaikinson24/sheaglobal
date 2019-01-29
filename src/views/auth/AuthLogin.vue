<template>
  <div class="app-login-comp">
    <div class="mb-3">
      <h4>Returning Customer?</h4>
      <p>Enter your email address and password below to login</p>
    </div>

    <div class="loginMsg mb-3"></div>

    <form id="loginForm">
      <div class="form-group">
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="Email"
          v-model="email"
          v-validate="'required|email'"
        >
        <span class="text-danger">{{ errors.first('email') }}</span>
      </div>

      <div class="form-group">
        <input
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
          v-validate="'required'"
        >
        <span class="text-danger">{{ errors.first('password') }}</span>
      </div>

      <div class="form-group d-flex">
        <a
          href="javascript:void(0)"
          @click="$emit('changeAuthState', 'forget-password')"
        >Forgot Password?</a>
        
        <a
          href="javascript:void(0)"
          class="ml-md-auto"
          @click="$emit('changeAuthState', 'activate-link')"
        >Resend verification email.</a>
      </div>

      <div class="form-group">
        <button class="btn btn-success btn-block" @click.prevent="login($event)">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AuthLogin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login(e) {
      var btn = e.currentTarget;

      this.$validator.validateAll().then(result => {
        if (result) {
          let params = new URLSearchParams();
          params.append("email", this.email);
          params.append("password", this.password);

          btn.classList.add("is-loading", "is-loading-sm");
          btn.setAttribute("disabled", "");

          axios
            .post(APIURL + "account/signin", params)
            .then(response => {
              btn.classList.remove("is-loading", "is-loading-sm");
              btn.removeAttribute("disabled");

              let res = response.data;

              if (res.status == 200) {
                let userData = {
                  firstname: res.data.firstname,
                  lastname: res.data.lastname,
                  email: res.data.email,
                  access_token: res.data.access_token,
                  mask: res.data.mask
                };
                this.$store.dispatch("SET_USER_DATA", userData);
                this.$store.commit("setAccessToken", res.data.access_token);
                window.localStorage.setItem(
                  "userData",
                  JSON.stringify(userData)
                );
                this.$router.replace("/account/detail");
              } else {
                if (res.status == 403) {
                  $.each(res.errors, function(k, v) {
                    $("#" + k).after(v);
                  });
                } else if (res.status == 204) {
                  $(".loginMsg").html(
                    '<p class="text-danger text-center" id="loginMsg">' +
                      res.msg +
                      "</p>"
                  );
                  setTimeout(() => {
                    $("#loginMsg").fadeOut(function() {
                      $(this).remove();
                    });
                  }, 5000);
                } else {
                  let html = `<p class="text-info" id="loginMsg">${
                    res.msg
                  }. Click here to </p>`;
                  $(".loginMsg").html(html);
                  setTimeout(() => {
                    $("#loginMsg").fadeOut(function() {
                      $(this).remove();
                    });
                  }, 5000);
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
