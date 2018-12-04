<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="my-5 container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="terms-list">
                        <ul>
                            <li>Shea Global Trading is a registered company licensed and domicile in  United Arab of Emirates and the <b>governing law</b> is the local law of UAE. </li>
                            <li>Shea Global Trading accepts Visa and Master Card in Dirhams. </li>
                            <li>Shea Global Trading will not trade with or provide any services to <b>OFAC and sanctioned countries.</b></li>
                            <li>Customers using the website who are Minor /under the <b>age of 18</b> shall not register as a User of the website and shall not transact on or use the website.</li>
                            <li>Cardholder must retain a copy of <b>transaction records</b> and Merchant policies and rules.</li>
                            <li>User is responsible for maintaining the <b>confidentiality</b> of his/her account.</li>
                            <li>Shea Global General Trading LLC maintains the www.sheaglobaltrading.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopHeroBanner from "@/components/TopHeroBanner.vue";
export default {
  components: { heroBanner: TopHeroBanner },
  name: "Terms",
  data() {
    return {
      title: "Terms and Conditions"
    };
  },
  metaInfo() {
    return {
      title: "Terms and Conditions"
    };
  }
};
</script>
