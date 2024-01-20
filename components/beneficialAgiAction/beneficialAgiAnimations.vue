<template>
        <div id="animation1" ref="lottieContainer1" style="width: 350px; height: 350px;"></div>
</template>

<script>


import AnimationSteps from '../../utilities/animations';


export default {

    props: {
        currentIndexAnimation: Number,
    },

    methods: {
        loadAnimation() {
            const animationContainerRef = this.$refs.lottieContainer1;
            const animationSteps = new AnimationSteps(animationContainerRef);

            switch (this.currentIndexAnimation) {
                case 0:
                    animationSteps.stepOne();
                    break;
                case 1:
                    animationSteps.stepTwo();
                    break;
                case 2:
                    animationSteps.stepThree();
                    break;
                case 3:
                    animationSteps.stepFour();
                    break;
                case 4:
                    animationSteps.stepFive();
                    break;
                case 5:
                    animationSteps.stepSix();
                    break;
                default:
                    break;
            }
        },
    },

    mounted() {
        this.loadAnimation();
    }

}

</script>

<style>

</style>