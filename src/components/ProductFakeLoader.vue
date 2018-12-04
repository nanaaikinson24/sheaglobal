<template>
    <div class="product-fake-item">
        <div class="">
            <div class="fake-item-container">

                <div class="fake-item-img-placeholder animated-background"></div>

                <div class="fake-item-details">
                    <div class="fake-text-header animated-background"></div>
                    <div class="fake-text-subheader mt-2 animated-background"></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProductFakeLoader"
};
</script>

<style lang="scss">
.fake-item-container {
  border-radius: 4px;
  height: 420px;
  position: relative;

  .fake-item-img-placeholder {
    height: 230px;
    border-radius: 4px;
  }

  .fake-item-details {
    padding: 1.2rem 0;

    .fake-text-header {
      height: 9px;
      left: 20px;
      width: 85%;
    }
    .fake-text-subheader {
      height: 9px;
      left: 40px;
      width: 70%;
    }
  }
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
.animated-background {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 40px;
  position: relative;
}
</style>
