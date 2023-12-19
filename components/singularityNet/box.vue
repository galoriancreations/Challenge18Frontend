<template>
    <div class="steps__box" :id="titleAndText.id" @click="goToLink">
        <!-- <h1>Action1:</h1> -->
        <h1>{{titleAndText.title}}</h1>
        <div class="images" :id="titleAndText.id">
            <!-- <img src="../../assets/images/mail.jpg" alt=""> -->
        </div>
        <h3>{{ titleAndText.text }}</h3>
        <button class="steps__bbutton">{{ titleAndText.buttontext }}</button>
    </div>
</template>



<script>
import popupModal from '~/mixins/popup-modal';


export default {
    inject:['popup'],
    mixins:[popupModal],
    methods: {
        goToLink() {
            if (this.titleAndText.link === 'popup') {
                this.popup()
                
            }else{
                window.location.href = this.titleAndText.link;
            }
            
        }
    },
    props: {
        titleAndText: Object,
    },

};

</script>
<style>
.steps__box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #cdf0f2;
    padding-top: 30px;
}
.images{
    padding-top: 168px;
    background-size: 150px;
    background-position: center;
    &#id1{
    background-image: url(../../assets/images/brain.png);
    
}
    &#id2{
    background-image: url(../../assets/images/e-learning.png);
}
    &#id3{
    background-image: url(../../assets/images/online-class.png);
}
}



    
</style>