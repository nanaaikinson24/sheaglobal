<template>
    <div>
        <div class="be-spinner">
            <svg width="60px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" stroke-width="4" stroke-linecap="round" cx="33" cy="33" r="30" class="circle"></circle>
            </svg>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Bspinner'
    }
</script>

<style>
    .be-loading .be-spinner {
        display: none;
    }
    .be-loading-active:after {
        visibility: visible;
        opacity: 1;
    }
    .be-loading-active .be-spinner {
        display: block;
    }
    .be-loading .be-spinner {
        position: absolute;
        top: 50%;
        right: 50%;
        margin-top: -20px;
        margin-right: -20px;
        z-index: 3;
    }
    .be-spinner svg {
        -webkit-animation: be-spinner-rotation 1.4s linear infinite;
            -o-animation: be-spinner-rotation 1.4s linear infinite;
                animation: be-spinner-rotation 1.4s linear infinite;
        stroke: #43C13E;
    }
    .be-spinner svg .circle {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        -webkit-transform-origin: center;
            -ms-transform-origin: center;
            -o-transform-origin: center;
                transform-origin: center;
        -webkit-animation: be-spinner-turn 1.4s ease-in-out infinite;
            -o-animation: be-spinner-turn 1.4s ease-in-out infinite;
                animation: be-spinner-turn 1.4s ease-in-out infinite;
    }
    @-webkit-keyframes be-spinner-rotation {
        0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
        }
        100% {
        -webkit-transform: rotate(270deg);
                transform: rotate(270deg);
        }
    }
    @-o-keyframes be-spinner-rotation {
        0% {
            -o-transform: rotate(0deg);
                transform: rotate(0deg);
        }
        100% {
            -o-transform: rotate(270deg);
                transform: rotate(270deg);
        }
    }
    @keyframes be-spinner-rotation {
        0% {
            -webkit-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(270deg);
                -o-transform: rotate(270deg);
                    transform: rotate(270deg);
        }
    }
    @-webkit-keyframes be-spinner-turn {
        0% {
            stroke-dashoffset: 187;
        }
        50% {
            stroke-dashoffset: 46.75;
            -webkit-transform: rotate(135deg);
                    transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: 187;
            -webkit-transform: rotate(450deg);
                    transform: rotate(450deg);
        }
    }
    @-o-keyframes be-spinner-turn {
        0% {
            stroke-dashoffset: 187;
        }
        50% {
            stroke-dashoffset: 46.75;
            -o-transform: rotate(135deg);
                transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: 187;
            -o-transform: rotate(450deg);
                transform: rotate(450deg);
        }
    }
    @keyframes be-spinner-turn {
        0% {
            stroke-dashoffset: 187;
        }
        50% {
            stroke-dashoffset: 46.75;
            -webkit-transform: rotate(135deg);
                -o-transform: rotate(135deg);
                    transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: 187;
            -webkit-transform: rotate(450deg);
                -o-transform: rotate(450deg);
                    transform: rotate(450deg);
        }
    }

</style>

