<template>
  <section class="page-heading" :id="name" :title="title">
    
    <!-- <h1 > -->
      <div class="page-heading__heading">
      <img src="../../assets/images/backgrounds/Logo.svg" alt="" class="page-heading__Logo1">
      <img src="../../assets/images/bgi.png" alt="" class="page-heading__Logo2">
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
export default {
  inject: ["name", "title"],
  data(){
    return{
      titleAndTexts:[
          {title:'Action 1.\n Subscribe to our Newsletter',
          text:'Join the SingularityNET to Explore the Next Generation of Decentralized AI!',
          id:'id1',
          link:'https://singularitynet.us16.list-manage.com/subscribe?u=d74195510c25bf501caf3011d&id=4cf1391864'
          },
          {title:'Action 2.\n  Join the Beneficial AGI Challenge to see some mAGIc',
          text:'See Some mAGIc? Join the BGI Challenge Groups!',
          id:'id2',
          link:'https://bgi24.ai/'
          },
          {title:'Action 3.\n  Attend the Beneficial AGI Summit & Unconference',
          text:'Envision a Radically Better Future at a Critical Moment!',
          id:'id3',
          link:'https://singularitynet.us16.list-manage.com/subscribe?u=d74195510c25bf501caf3011d&id=4cf1391864'
          }
        ],
    }
  }
};
</script>

<style lang="scss">
.page-heading {
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


  &__heading {
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
      margin-top: 350px;
      position: relative;
      z-index: 20;

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
