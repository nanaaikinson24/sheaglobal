<template>
    <div class="app-hero-banner">
        <div class="page-header py-5" :style="{backgroundImage: 'linear-gradient(rgba(36, 111, 99, 0.6), rgba(36, 111, 99, 0.6)), url('+heroBanner+')'}">
            <div class="text-center">
                <h3 class="shea-title" style="color: #fff;">{{ title }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
var heroBanner = require("../assets/img/callback-form.jpg");
export default {
  name: "TopHeroBanner",
  data() {
    return {
      heroBanner: heroBanner
    };
  },
  props: ["title"]
};
</script>
