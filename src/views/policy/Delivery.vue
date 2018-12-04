<template>
    <div>
        <hero-banner :title="title"></hero-banner>

        <div class="my-5 container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="terms-list">
                        <ul>
                            <li>Shipping of goods will be through a reputable delivery company.</li>
                            <li>Free delivery will be provided for items over 100 Dirhams in the UAE.</li>
                            <li>Delivery will be within 2 days. Express delivery can be requested by the customer for an additional fee.</li>
                        </ul>
                    </div>
                    <p>Shea Global keeps the proof of delivery receipt signed/confirmed by the registered customer.</p>
                    <p>Customer will receive payment confirmation via text and email at the time the payment is received by Shea Global. </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopHeroBanner from "@/components/TopHeroBanner.vue";
export default {
  components: { heroBanner: TopHeroBanner },
  name: "Delivery",
  data() {
    return {
      title: "Delivery Policy"
    };
  },
  metaInfo() {
    return {
      title: "Delivery Policy"
    };
  }
};
</script>
