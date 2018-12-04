<template>
    <div>
         <hero-banner :title="title"></hero-banner>

         <div class="container my-5">
             <div class="row" v-if="authState == 'login'">
                 <div class="col-md-5">
                     <login v-on:changeAuthState="changeAuthState"/>
                 </div>

                 <div class="col-md-6 offset-md-1">
                     <register v-on:changeAuthState="changeAuthState"/>
                 </div>
             </div>

             <div class="row" v-if="authState == 'forget-password'">
                 <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                     <password-reset v-on:changeAuthState="changeAuthState"></password-reset>
                 </div>
             </div>

             <div class="row" v-if="authState == 'activate-link'">
                 <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                     <activate-link v-on:changeAuthState="changeAuthState"></activate-link>
                 </div>
             </div>
         </div>
    </div>
</template>

<script>
import AuthPasswordReset from "./AuthPasswordReset.vue";
import AuthActivateLink from "./AuthActivateLink.vue";
import TopHeroBanner from "@/components/TopHeroBanner.vue";
import AuthLogin from "./AuthLogin.vue";
import AuthRegister from "./AuthRegister.vue";

export default {
  name: "AuthIndex",
  components: {
    login: AuthLogin,
    register: AuthRegister,
    heroBanner: TopHeroBanner,
    passwordReset: AuthPasswordReset,
    activateLink: AuthActivateLink
  },
  data() {
    return {
      title: "Account",
      authState: "login"
    };
  },
  methods: {
    changeAuthState(value) {
      this.authState = value;
    }
  }
};
</script>
