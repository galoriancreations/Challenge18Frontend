<template>
    <Page title="About Us" name="about">
      <section v-for="(section, index) in about" :key="index" class="section">
        <h1 class="about-header">{{ section.title }}</h1>
        <p class="about-content">{{ section.content }}</p>
      </section>
      <Partners />
    </Page>
  </template>
  
  <script>
  import about from '~/assets/data/about';
  
  export default {
    head: {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Ting Global is the international body that conducts the 18 official pre-tournament challenge competitions, and the tournament. 18 days of assignments that raise awareness of sustainability and leadership issues.'
        }
      ]
    },
    data() {
      return {
        about
      };
    }
  };
  </script>
  
  <style lang="scss">
  .about {
    padding: 4rem;
    text-align: center;
  
    .section {
      width: 65%;
      margin: auto;
      margin-bottom: 3rem;
  
      .about-header {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
        background-image: linear-gradient(135deg, #667eea, #764ba2, #6B8E23 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
  
      .about-content {
        font-size: 1.6rem;
        line-height: 1.6;
        font-weight: 500;
        color: #666;
      }
    }
  }
  </style>
  