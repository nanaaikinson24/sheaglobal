<template>
    <button class="goTop" v-if="isVisible" @click="backToTop">
        <i class="fa fa-angle-up" aria-hidden="true"></i>
    </button>
</template>

<script>
    export default {
        name: 'BackToTop',
        data() {
            return {
                isVisible: false
            }
        },
        methods: {
            initToTopButton: function() {
                let self = this;
				$(document).bind('scroll', function() {
					var backToTopButton = $('.goTop');
					if ($(document).scrollTop() > 250) {
                        backToTopButton.addClass('isVisible');
                        self.isVisible = true;
                    } 
                    else {
                        backToTopButton.removeClass('isVisible');
                        self.isVisible = false;
					}
				}.bind(self));
			},
			backToTop: function() {
				$('html,body').stop().animate({
					scrollTop: 0
				}, 'slow', 'swing');
			}
        },
        mounted() {
            this.$nextTick(function() {
                this.initToTopButton();
            });
        }
    }
</script>

<style lang="scss">
    .goTop {
        border-radius: 5px;
        background-color: rgb(1,14,27);
        background-color: rgba(1, 14, 27, .7);
        position: fixed;
        width: 45px;
        height: 45px;
        display: block;
        right: 15px;
        bottom: 50px;
        border: none;
        opacity: 0;
        z-index: -1;
        cursor: pointer;
        .fa {
                color: white;
                font-size: 22px;
        }
        &:hover {
                opacity: 1;
                background-color: rgb(1,14,27);
                background-color: rgba(1, 14, 27, .9);
        }
    }
    .isVisible {
        opacity: .8;
        z-index: 4;
        transition: all .4s ease-in;
    }
</style>


