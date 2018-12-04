<template>
    <div class="category-fake-item">
        <div class="category-fake-item-container mb-5">
            <div class="fake-item-header mb-5 animated-background"></div>

            <div class="fake-item-content animated-background"></div>
            <div class="fake-item-content animated-background"></div>
            <div class="fake-item-content animated-background mb-5"></div>
        </div>

        <div class="row">
            <div class="col-md-4 col-sm-6" v-for="(item, index) in items" :key="index">
                <div class="fake-item-product mb-5">
                    <div class="fake-item-img animated-background"></div>
                    <div class="fake-text-content animated-background mt-4"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "ProductCategoryFakeLoader",
  data() {
    return {
      items: 3
    };
  }
};
</script>

<style lang="scss" scoped>
.category-fake-item-container {
  .fake-item-header {
    height: 40px;
    width: 200px;
  }

  .fake-item-content {
    height: 15px;
    width: 100%;
    margin-bottom: 16px;
  }
}
.fake-item-product {
  .fake-item-img {
    width: 100%;
    height: 250px;
  }

  .fake-text-content {
    height: 9px;
    left: 20px;
    width: 85%;
  }
}
</style>
