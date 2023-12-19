<template>
  <section class="page-headingNET" :id="name" :title="title">
    <popupNET :active="active">
      <button @click="popup" class="exitButton">X</button>

      <!-- <h4><a class="links" href="https://t.me/+5oYug7mEHxhjMGFk ">BGI Challenge on Telegram for AI Developers</a></h4>
      <div @click="sendtolink('https://t.me/+5oYug7mEHxhjMGFk')" class="CLICKHERE">CLICK HERE</div>
      <br> -->
      <h4><a class="links" href="https://t.me/+3wl_XlXXIl4zMmQ0 ">BGI Academy a Telegram Silent Group</a></h4> 
      <div @click="sendtolink('https://t.me/+3wl_XlXXIl4zMmQ0 ')" class="CLICKHERE">CLICK HERE</div>
      <br>
      <!-- <h4>      <a class="links" href="https://chat.whatsapp.com/HQIxHIv8n1NJ1IEhIRtWry ">BGI Challenge on Whatsapp for AI Developers</a> </h4>
      <div @click="sendtolink('https://chat.whatsapp.com/HQIxHIv8n1NJ1IEhIRtWry')"  class="CLICKHERE">CLICK HERE</div>
      <br> -->
      <h4>      <a class="links" href="https://chat.whatsapp.com/INWXWVZhZrPCfENR6sAYiu">BGI Challenge on Whatsapp for AI General Public</a> </h4>
      <div @click="sendtolink('https://chat.whatsapp.com/INWXWVZhZrPCfENR6sAYiu')" class="CLICKHERE">CLICK HERE</div>
      <!-- <BaseButton variant="blue" @click="popup" >close</BaseButton> -->
  </popupNET>
    <!-- <h1 > -->
      <div class="page-headingNET__headingNET">
      <img src="../../assets/images/backgrounds/Logo.svg" alt="" class="page-headingNET__Logo1">
      <img src="../../assets/images/bgi.png" alt="" class="page-headingNET__Logo2">
      <!-- {{ title }} -->
    </div>
    <!-- </h1> -->
      <div class="steps__container" >
        <box :titleAndText=info text="lol" v-for="info in titleAndTexts">
          
        </box>
      </div>
    
  </section>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';

export default {
    inject: ["title"],
    data() {
        return {
            active: false,
            name: 'singularityNet',
            titleAndTexts: [
                { title: 'Action 1.\n SUBSCRIBE to our Newsletter',
                    text: 'Join the SingularityNET to Explore the Next Generation of Decentralized AGI!',
                    id: 'id1',
                    buttontext: 'subscribe',
                    link: 'https://singularitynet.us16.list-manage.com/subscribe?u=d74195510c25bf501caf3011d&id=4cf1391864'
                },
                { title: 'Action 2.\n  Join the Beneficial AGI Challenge to see some mAGIc',
                    text: 'See Some mAGIc? Join the BGI Challenge Groups!',
                    id: 'id2',
                    buttontext: 'join',
                    link: 'popup'
                },
                { title: 'Action 3.\n  Attend the Beneficial AGI Summit & Online Unconference',
                    text: 'Envision a Radically Better Future at a Critical Moment!',
                    id: 'id3',
                    buttontext: 'attend',
                    link: 'https://bgi24.ai/'
                }
            ],
        };
    },
    methods: {
        popup() {
            this.active = !this.active;
        },
        sendtolink(link){
          window.location.href = link
        }
    },
    provide() {
        return {
            popup: this.popup
        };
    },
    components: { BaseButton }
};
</script>

<style lang="scss">
.links{
  color: #263cff;
  // text-decoration: underline;
}
.links:visited{
  color: #d042ff;
  // text-decoration: underline;
}
.page-headingNET {
  height: 45rem;
  position: relative;
  background-color: #4c9cd4;
  background-position: center;
  background-size: cover;
  // padding: 0 2vw;

  @media (hover: hover) {
    background-attachment: fixed;
  }

  @include respond(mobile) {
    height: 35rem;
    padding: 0 ;
  }

  &#singularityNet {
    background-image: 
    linear-gradient(
        to right,
        rgba(#4189bd, 0.3),
        rgba(#4189bd, 0.3)
      ),
      url(../../assets/images/backgrounds/bgi3.png);
      padding-bottom: 923px;
  }


  &__headingNET {
    font-size: 6rem;
    color: #fff;
    font-weight: 800;
    position: absolute;
    top: 20%;
    // top: 33%;
    display: flex;
    left: 50%;
    width: calc(100% - 2 * #{$padding-sides-mobile});
    max-width: 70rem;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 5;
    justify-content: space-between;

    @include respond(mobile) {
      flex-direction: column;
      font-size: 4rem;
      top: 20%;
      max-width: 40rem;
      align-items: center;
      // left: 0px;
    }
  }
  &__Logo1{
        // scale: 150%;
        width: 300px;
        @include respond(mobile) {

        // scale: 100%;

    }
  }
  &__Logo2{
    // margin-left:20%;
        // scale: 20%;
        // resize: 10%;
        width: 100px;
        @include respond(mobile) {




        // margin-left: 0%;
        // scale: 15%;

    }
  }
}
.steps{
    &__container{
      display: flex;
      justify-content: space-between;
      margin-top: 300px;
      position: relative;
      z-index: 20;
      padding: 0px 2%;
      gap: 20px;
      @include respond(mobile) {
        scale: 50%;
      margin-top: 200px;
      width: 30%;


    }

    }
    &__box{
      border-radius: 20px;
      width: 300px;
      height: 488px;
      border: #93e7ff solid 2px;
      transition: 300ms;
      box-shadow: 5px 6px 5px 2px #656565;
      text-align: center;
      white-space: break-spaces;
      @include respond(mobile) {
        // scale: 60%;
      // top: 20%;
      height: 550px;
            min-width: 16rem;
      max-width: 20rem;

    }
    }
    &__box:hover{
      scale: 105%;
      box-shadow: 8px 20px 17px 5px #656565;
    }
    &__bbutton{
      display: block;
    // width: 25rem;
    text-transform: uppercase;
    font: inherit;
    font-size: 1.5rem;
    font-weight: 500;
    color: #fff;
    letter-spacing: 1.3px;
    border-radius: 100px;
    border: 1.5px solid transparent;
    transition: all 0.5s;
    text-align: center;
    cursor: pointer;
    padding: 0.85rem 3rem;
    margin: auto;
    background-color: #0000ff;
    color: #fff;
    }
    &__bbutton:hover{
      background-color: #fff;

    color: #007bff;
    box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;

    }
  }
  .exitButton{
    right: 50%;
    position: relative;
    background-color: blue;
    border-radius: 100px;
    border: 1.5px solid transparent;
    transition: all 0.5s;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin-bottom: 10px;
    color: #fff;
  }
  .exitButton:hover{
    background-color: #fff;

    color: #007bff;
    box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;

  }
  .CLICKHERE{
    left: 40%;
    position: relative;
    background-color: blue;
    border-radius: 100px;
    width: fit-content;
    border: 1.5px solid transparent;
    transition: all 0.5s;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: #fff;
  }
  .CLICKHERE:hover{
    background-color: #fff;

    color: #007bff;
    box-shadow: rgba(62, 57, 107, 0.3) 0px 6px 16px 0px;

  }
</style>
