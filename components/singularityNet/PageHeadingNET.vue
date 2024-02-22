<template>
  <section class="page-headingNET" :id="name" :title="title">
    <popupNET :active="active">
      <button @click="popup" class="exitButton">X</button>

      <h4><a class="links" href="https://t.me/+5oYug7mEHxhjMGFk ">BGI Challenge on Telegram</a></h4>
      <div @click="sendToLink('https://t.me/+5oYug7mEHxhjMGFk')" class="CLICKHERE">CLICK HERE</div>
      <br>
      <h4><a class="links" href="https://t.me/+3wl_XlXXIl4zMmQ0 ">BGI Academy a Telegram Silent Group</a></h4> 
      <div @click="sendToLink('https://t.me/+3wl_XlXXIl4zMmQ0 ')" class="CLICKHERE">CLICK HERE</div>
      <br>
      <!-- <h4>      <a class="links" href="https://chat.whatsapp.com/HQIxHIv8n1NJ1IEhIRtWry ">BGI Challenge on Whatsapp for AI Developers</a> </h4>
      <div @click="sendToLink('https://chat.whatsapp.com/HQIxHIv8n1NJ1IEhIRtWry')"  class="CLICKHERE">CLICK HERE</div>
      <br> -->
      <h4>      <a class="links" href="https://chat.whatsapp.com/INWXWVZhZrPCfENR6sAYiu">BGI Challenge on Whatsapp for AI</a> </h4>
      <div @click="sendToLink('https://chat.whatsapp.com/INWXWVZhZrPCfENR6sAYiu')" class="CLICKHERE">CLICK HERE</div>
      <!-- <BaseButton variant="blue" @click="popup" >close</BaseButton> -->
  </popupNET>
    <!-- <h1 > -->
      <div class="page-headingNET__headingNET">
      <img :src="this.s3AssetsGenerator('images/backgrounds/Logo.svg')" alt="" class="page-headingNET__Logo1">
      <img :src="this.s3AssetsGenerator('images/bgi.png')" alt="" class="page-headingNET__Logo2">
      <!-- {{ title }} -->
    </div>
    <!-- </h1> -->
      <div class="steps__container" >
        <box :titleAndText=info text="lol" v-for="info in titleAndTexts" :key="info.id">
          
        </box>
      </div>
    
  </section>
</template>

<script>
import s3AssetsMixin from '~/mixins/s3AssetsMixin';

export default {
    mixins: [ s3AssetsMixin ],
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
                    link: 'https://forms.gle/5HSgxPjnvwcvCqyd6'
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
        sendToLink(link) {
          if (this.isExternalLink(link)) {
              window.open(link, '_blank').focus();
          } else {
              this.$router.push(link);
          }
        },
        isExternalLink(link) {
            return link.startsWith('http://') || link.startsWith('https://');
        }
    },
    provide() {
        return {
            popup: this.popup
        };
    },
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
  position: relative;
  background-color: #4c9cd4;
  background-position: center;
  background-size: cover;
  height: 100vh;

  @include respond(tablet) {
    height: auto;
  }

  @media (hover: hover) {
    background-attachment: fixed;
  }

  &#singularityNet {
    background-image: 
    linear-gradient(
        to right,
        rgba(#4189bd, 0.3),
        rgba(#4189bd, 0.3)
      ),
      url(../../assets/images/backgrounds/bgi3.png);
  }


  &__headingNET {
    font-size: 6rem;
    color: #fff;
    font-weight: 800;
    position: relative;
    display: flex;
    text-align: center;
    justify-content: space-around;
    top: 15rem;

    @include respond(mobile) {
      flex-direction: column;
      align-items: center;
    }
  }
  &__Logo1{
        // scale: 150%;
        width: 300px;
        @include respond(mobile) {
          width: 70vw;
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
      margin-top: 20rem;
      position: relative;
      margin-inline: 5rem;
      
      @include respond(tablet) {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      @include respond(mobile) {
        font-size: 1.25rem;
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
      margin: 1rem;

      @include respond(mobile) {
        height: 400px;
        width: 250px;
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
    
    @include respond(tablet) {
      font-size: 1.25rem;
    }
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
