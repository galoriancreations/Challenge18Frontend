<template>
  <Page title="🌟Challenge Guidelines🌟" name="about" class="guidelines">
    <h1>Welcome to the Beneficial AGI Challenge! ✨</h1>
    <br />
    <h3>
      <p>
        As we embark on this exciting journey together, it’s important to
        establish some ground rules to ensure a positive and productive
        experience for everyone. Please take a moment to read and adhere to the
        following guidelines:
      </p>
    </h3>
    <br />
    <h1>Respect and Professionalism 👥:</h1>
    <br />
    <h3>
      <p>
        Treat all members with respect. No offensive language, bullying, or
        derogatory remarks will be tolerated.
      </p>
    </h3>
    <br />
    <h1>Relevance to the Course 📚:</h1>
    <br />
    <h3>
      <p>
        Keep all discussions and posts relevant to the course material.
        Off-topic conversations should be kept to a minimum.
      </p>
    </h3>
    <br />
    <h1>No Spam or Advertisement 🚫:</h1>
    <br />
    <h3>
      <p>
        Refrain from posting spam, advertisements, or unrelated content. This
        includes forwarding chain messages or promoting external events not
        related to the course.
      </p>
    </h3>
    <br />
    <h1>Confidentiality and Privacy 🔒:</h1>
    <br />
    <h3>
      <p>
        Respect the privacy and confidentiality of all members. Do not share
        personal information or course content without explicit permission.
      </p>
    </h3>
    <br />
    <h1>Active Participation 💬:</h1>
    <br />
    <h3>
      <p>
        Engage actively but thoughtfully. Provide constructive feedback and
        support to fellow participants.
      </p>
    </h3>
    <br />
    <h1>Weekly Challenges 🏆:</h1>
    <br />
    <h3>
      <p>
        Every week, there will be tasks or challenges. Participation is
        encouraged as it enhances learning and increases your chances of winning
        rewards.
      </p>
    </h3>
    <br />
    <h1>Reward System 🎁:</h1>
    <br />
    <h3>
      <p>
        The top 10 players each week will receive AGIX tokens worth 50 USD.
        Winners are determined based on participation quality, creativity, and
        adherence to these guidelines.
      </p>
    </h3>
    <br />
    <h1>Fair Play 🤝:</h1>
    <br />
    <h3>
      <p>
        Any form of cheating or manipulation to gain unfair advantage is
        strictly prohibited and will result in disqualification.
      </p>
    </h3>
    <br />
    <h1>Reporting Issues 📢:</h1>
    <br />
    <h3>
      <p>
        If you encounter any issues or have concerns, please reach out to the
        course administrators directly.
      </p>
    </h3>
    <br />
    <h1>Enjoy and Learn 😊📖:</h1>
    <br />
    <h3>
      <p>
        Most importantly, enjoy the learning process and take this opportunity
        to grow and share knowledge!
      </p>
    </h3>
    <br />
    <h1>
      By remaining in this group, you agree to these guidelines. Failure to
      comply may result in removal from the group and disqualification from the
      challenge.
    </h1>
    <br />
    <br />
    <h1>SingularityNET team</h1>
    <br />
    <br />
    <div
      style="min-height:300px ; border: black 2px solid; border-radius: 30px; margin: auto;"
    >
      <br />
      <h1 style="margin-left: 50px;">
        🎁 Reward System in the Beneficial AGI Challenge 🎁
      </h1>
      <br />
      <br />
      <h1 style="margin-left: 50px;">
        In our challenge, we highly value engagement, creativity, and adherence
        to our guidelines. To appreciate and encourage this, we have a rewarding
        system in place:
      </h1>
      <br />

      <div style="display: flex;flex-direction: column;margin-left: 50px;">
        <h2>Leading Your Own BGI Group (33% of the Evaluation)</h2>
        <ul id="order_list">
          <li class="items">
            Start and lead a BGI group with at least 5 members OR invite 5
            friends to the BGI Group you have joined.
          </li>
          <li class="items">
            Show initiative and leadership in guiding your group.
          </li>
        </ul>
        <br />
        <h2>
          Active Participation in BGI Challenge Groups (33% of the Evaluation)
        </h2>
        <ul>
          <li class="items">
            Be actively involved in discussions and tasks in any BGI challenge
            group.
          </li>
          <li class="items">
            Your consistent participation, interaction, and contribution to the
            group discussions are key.
          </li>
        </ul>
        <br />
        <h2>Participation in Weekly Webinars (33% of the Evaluation)</h2>
        <ul>
          <li class="items">Attend and participate in our weekly webinars.</li>
          <li class="items">
            Engagement and interaction during these sessions are highly valued.
          </li>
        </ul>
      </div>
      <br />
      <h1 style="margin-left: 50px;">Note:</h1>
      <ul>
        <li style="margin-left: 100px;" class="items">
          Winners are selected based on a balanced combination of these three
          criteria.
        </li>
        <li style="margin-left: 100px;" class="items">
          Quality of participation, creativity in contributions, and adherence
          to group guidelines are essential across all activities.
        </li>
      </ul>
      <br />
      <br />
      <h2 style="margin-left: 50px;">Disclaimer:</h2>
      <br />
      <p style="margin-left: 68px;">
        Selection Process: The selection of winners is subjective and based on
        the quality of participation, creativity, and adherence to guidelines.
        Right to Choose: We reserve the right to choose the winners. This
        decision is not solely based on quantitative measures but on a holistic
        evaluation of each participant's contribution to the challenge. Fair
        Evaluation: While we aim for fairness and transparency, participants
        should understand that the selection process involves a degree of
        subjectivity. By participating, you acknowledge and accept these terms.
        We look forward to seeing your innovative contributions and enthusiasm
        in the challenge!
      </p>
      <br />
      <br />
      <h2 style="margin-left: 50px;">
        By participating actively and leading with innovation, you not only
        contribute to the growth of our community but also stand a chance to be
        rewarded for your efforts. Let’s dive in and make the most of this
        opportunity!
      </h2>
      <br />
      <br />
      <h1 style="margin-left: 50px;">SingularityNET team</h1>
      <br />
      <br />
    </div>
    <div class="guidelines__buttons">
      <BaseButton
        variant="blue"
        @click="$router.push('/how-to-play')"
        class="guidelines__buttons-how-to-play"
      >
        How to Play
      </BaseButton>
    </div>
  </Page>
</template>

<script>
export default {
  head: {
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Ting Global is the international body that conducts the 18 official pre-tournament challenge competitions, and the tournament. 18 days of assignments that raise awareness of sustainability and leadership issues.',
      },
    ],
  },
  data() {
    return {
      teams: require('~/assets/data/teams'),
    };
  },
};
</script>

<style lang="scss">
.about > section:not(.team-section) {
  .section-heading-wrapper {
    margin-bottom: 5rem;

    @include respond(mobile) {
      margin-bottom: 3.5rem;
    }
  }
}
.items {
  margin-left: 50px;
  font-size: large;
}

.guidelines {
  .guidelines__buttons {
    margin-top: 5rem;
  }
}
</style>
