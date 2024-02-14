
import Lottie from 'lottie-web';
import robotAnimation from '../assets/animations/robot-animation.json'
import bridgesAnimation from '../assets/animations/bridges-animation.json'
import yourVoiceMatters from '../assets/animations/your-voice-matters.json'
import shareAnimation from '../assets/animations/share-animation.json'
import shareAnimation2 from '../assets/animations/share-animation2.json'
import shareAnimation3 from '../assets/animations/share-animation3.json'


export default class AnimationSteps {

    constructor(animationContainerRef) 
    {
        this.animationContainer = animationContainerRef;
    }

    stepOne() 
    {
        Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: robotAnimation
      });
    };

    stepTwo() 
    {
        Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: bridgesAnimation
      });
    };

    stepThree() 
    {
        Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: yourVoiceMatters
      });
    };

    stepFour() 
    {
        Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: shareAnimation
      });
    };

    stepFive() 
    {
        Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: shareAnimation2
      });
    };
    stepSix() 
    {
        Lottie.loadAnimation({
            container: this.animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: shareAnimation3
      });
    };
 }