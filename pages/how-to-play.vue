<template>
  <Page title="How to Play" name="how-to-play">
    <HowToPlayVideo />
    <div class="how-to-play__content">
      <HowToPlaySection
        v-for="section in sections"
        :key="section.title"
        v-bind="section"
      />
    </div>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          title: "Object of the Game",
          items: [
            "Score the most points by completing social impact tasks within 18 days. Tasks involve <strong>learning</strong> about the Global Goals, <strong>reflecting</strong> about those topics, and <strong>acting</strong> towards a positive change in the world.",
            "Winners are the challenge groups with the highest cumulative points, and more points can be attained when groups collaborate on tasks.",
            "Participants learn to commit to changing habits not only for 18 days, but as a lifestyle."
          ]
        },
        {
          title: "Preperation",
          items: [
            "Get a diary to complete challenges in (any physical/digital notebook will do).",
            {
              text:
                "Join a challenge group from the Challenge 18 app, website, or an online invite.",
              subitems: [
                "Registered Clubs: 18 players on each team.",
                "Free Groups - up to 50 independent participants."
              ]
            },
            "Await Day 1 of the challenge to begin."
          ]
        },
        {
          title: "How to Play",
          items: [
            {
              text:
                "Receive challenges from the group host at the same time every day.",
              subitems: [
                "Complete any number of daily tasks within 24 hours.",
                "Complete any number of recurring tasks once per day each."
              ]
            },
            "Mark each completed task with the respective emojis to earn points.",
            "Bonus tasks may be awarded for reaching participation milestones.",
            "Collaborative task completions between separate individuals or teams earn extra points."
          ]
        },
        {
          title: "Player Specialties",
          items: [
            "<strong>Challenge Educator/Group leader</strong>: Leads and encourages their team. [Coach]",
            "<strong>Ideator</strong>: Develops strategies and ideas. [Behind the scenes]",
            "<strong>Technologist</strong>:	Handles technical components. [Camera person, uploader]",
            "<strong>Influencer</strong>: The external face of the team. [In front of the camera]"
          ],
          note: "Player specialities are encouraged but not required."
        },
        {
          title: "Bonus Features",
          items: [
            "Group Zoom meetings or video chats once a week, led by the group leader.",
            "Small groups Zoom meetings or video chats once a week, led by the group mentors.",
            "1-to-1 video chats.",
            "Bonus tasks assigned by the group leader or leading teachers.",
            "Rewards & Coupon system."
          ]
        },
        {
          title: "Winning the Game",
          items: [
            "The 18 top-scoring players in a challenge group win within their group.",
            "The 18 top-scoring club pairings within a calendar year win globally for that season."
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.how-to-play {
  &__content {
    max-width: 95rem;
    margin: auto;
  }
}
</style>
