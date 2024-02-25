import Lottie from 'lottie-web';
import robotAnimation from '~/assets/animations/robot-animation.json'
import bridgesAnimation from '~/assets/animations/bridges-animation.json'
import yourVoiceMatters from '~/assets/animations/your-voice-matters.json'
import shareAnimation from '~/assets/animations/share-animation.json'
import shareAnimation2 from '~/assets/animations/share-animation2.json'
import shareAnimation3 from '~/assets/animations/share-animation3.json'

const animations = {
    robotAnimation,
    bridgesAnimation,
    yourVoiceMatters,
    shareAnimation,
    shareAnimation2,
    shareAnimation3
};

export default class BgiAnimations {

    constructor(animationContainerRef) 
    {
        this.animationContainer = animationContainerRef;
    }

    playAnimation(animationData) {
        Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData
        });
    }

    stepOne() {
        this.playAnimation(animations.robotAnimation);
    };

    stepTwo() {
        this.playAnimation(animations.bridgesAnimation);
    };

    stepThree() {
        this.playAnimation(animations.yourVoiceMatters);
    };

    stepFour() {
        this.playAnimation(animations.shareAnimation);
    };

    stepFive() {
        this.playAnimation(animations.shareAnimation2);
    };

    stepSix() {
        this.playAnimation(animations.shareAnimation3);
    };
}
