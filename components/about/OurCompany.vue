<template>
  <section class="our-company">
    <SectionHeading small>Our Company</SectionHeading>
    <ImageWithText
      :image="{ src: mainImg, alt: 'Challenge 18 players' }"
      :text="aboutText"
      :button="{ link: '/join', variant: 'gold', text: 'Join Us' }"
    />
  </section>
</template>

<script>
import mainImg from "~/assets/images/about-img.jpg";

export default {
  head: {
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Ting Global is the international body that conducts the 18 official pre-tournament challenge competitions, and the tournament. 18 days of assignments that raise awareness of sustainability and leadership issues."
      }
    ]
  },
  data() {
    return {
      mainImg,
      aboutText:
        "Ting Global is the international body that conducts the 18 official pre-tournament challenge competitions, and the tournament. Teachers and students from across the globe have already completed the Ting Global Sustainability Challenge.\n 18 days of assignments that raise awareness of sustainability and leadership issues – Participation in the challenge solidifies students and raises awareness of the hot topics on the global agenda and allows participants to share their work and form thinking and action groups together."
    };
  }
};
</script>
