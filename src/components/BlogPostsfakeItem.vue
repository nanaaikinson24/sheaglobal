<template>
    <div class="blogPostFakeItem">
        <div class="blog-fake-container">

            <div class="blog-fake-img-placeholder animated-background mb-3"></div>

            <div class="blog-fake-details">
                <div class="fake-blog-date animated-background mb-2"></div>
                <div class="fake-blog-header animated-background mb-3"></div>
                <div class="fake-blog-subheader mt-2 animated-background"></div>
                
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "BlogPostsfakeItem"
};
</script>

<style lang="scss">
.blog-fake-container {
  height: 350px;

  .blog-fake-img-placeholder {
    height: 200px;
  }
  .blog-fake-details {
    .fake-blog-date {
      height: 5px;
      width: 50%;
    }

    .fake-blog-header {
      height: 9px;
      width: 75%;
    }
    .fake-blog-subheader {
      height: 12px;
    }
  }
}
</style>
