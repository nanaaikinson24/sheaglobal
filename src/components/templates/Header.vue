<template>
    <div class="app-header">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow">
            <div class="container">
                <router-link class="navbar-brand" to="/">
                    <img :src="logo" alt="Logo" height="40px">
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item py-md-3">
                            <router-link class="nav-link" to='/' exact>
                                Home <span class="sr-only">(current)</span>
                            </router-link>
                        </li>
                        <li class="nav-item py-md-3">
                            <router-link class="nav-link" to="/about" exact>
                                About
                            </router-link>
                        </li>
                        <li class="nav-item py-md-3">
                            <router-link class="nav-link" to="/products" exact>
                                Products
                            </router-link>
                        </li>
                        
                        <li class="nav-item py-md-3">
                            <router-link class="nav-link" to="/blog" exact>
                                Blog
                            </router-link>
                        </li>
                        
                        <li class="nav-item py-md-3">
                            <router-link class="nav-link" to="/contact" exact>
                                Contact 
                            </router-link>
                        </li>
                        <li class="nav-item dropdown py-md-3" v-if="userData">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="ti-user"></i>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <router-link class="dropdown-item" to="/account/detail">My Profile</router-link>
                                <router-link class="dropdown-item" to="/account/orders">My Orders</router-link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)"
                                    @click="logoutUser"
                                >
                                    Logout
                                </a>
                            </div>
                        </li>
                        <li class="nav-item py-md-3" v-if="!userData">
                            <router-link class="nav-link" to="/account" exact>
                                <i class="ti-user"></i>
                            </router-link>
                        </li>

                        <li class="nav-item py-md-3">
                            <router-link to="/cart" class="nav-link" style="position:relative;" id="cartHeader">
                                <i class="ti-shopping-cart"></i> 
                                <span class="badge badge-success ">
                                    {{ totalCartQuantity }}
                                </span>
                            </router-link>
                        </li>
                        
                    </ul>
                    
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
var _ = require("lodash");
var logo = require("../../assets/img/sheaLogo.png");

export default {
  name: "Header",
  data() {
    return {
      logo: logo
    };
  },
  computed: {
    totalCartQuantity() {
      return this.$store.getters.totalCartQuantity;
    },

    userData() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("LOGOUT_USER");
    }
  }
};
</script>

<style scoped>
</style>
