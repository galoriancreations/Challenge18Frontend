<template>
  <section class="page-headingNET" :id="name" :title="title">
    <popup :active="active"> 
      <h4><a href="https://t.me/+5oYug7mEHxhjMGFk ">BGI Challenge on Telegram for AI Developers</a></h4> 
      <h4><a href="https://t.me/+3wl_XlXXIl4zMmQ0 ">BGI Academy a Telegram Silent Group </a></h4> 
      <h4>      <a href="https://chat.whatsapp.com/HQIxHIv8n1NJ1IEhIRtWry ">BGI Challenge on Whatsapp for AI Developers </a> </h4>
      <h4>      <a href="https://chat.whatsapp.com/INWXWVZhZrPCfENR6sAYiu">BGI Challenge on Whatsapp for AI General Public</a> </h4>
      <BaseButton variant="blue" @click="popup" >confirm</BaseButton>
  </popup>
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
                { title: 'Action 1.\n Subscribe to our Newsletter',
                    text: 'Join the SingularityNET to Explore the Next Generation of Decentralized AI!',
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
                { title: 'Action 3.\n  Attend the Beneficial AGI Summit & Unconference',
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
.page-headingNET {
  height: 45rem;
  position: relative;
  background-color: #4c9cd4;
  background-position: center;
  background-size: cover;
  padding: 0 $padding-sides-desktop;

  @media (hover: hover) {
    background-attachment: fixed;
  }

  @include respond(mobile) {
    height: 35rem;
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

    @include respond(mobile) {
      font-size: 4rem;
      top: 50%;
      max-width: 40rem;
    }
  }
  &__Logo1{
        scale: 150%;
  }
  &__Logo2{
    margin-left:20%;
        scale: 20%;
  }
}
.steps{
    &__container{
      display: flex;
      justify-content: space-between;
      margin-top: 300px;
      position: relative;
      z-index: 20;
      gap: 20px;

    }
    &__box{
      border-radius: 20px;
      width: 300px;
      height: 444px;
      border: #93e7ff solid 2px;
      transition: 300ms;
      box-shadow: 5px 6px 5px 2px #656565;
      text-align: center;
      white-space: break-spaces;
    }
    &__box:hover{
      scale: 105%;
      box-shadow: 8px 20px 17px 5px #656565;
    }
  }
</style>
