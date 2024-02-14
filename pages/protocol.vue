<template>
  <Page title="Ting Global Protocol" name="protocol">
    <section class="protocol__section">
      <div class="protocol__intro-box">
        <p class="protocol__intro-text">
          🚀 Are you ready to <strong>step outside your comfort zone</strong>?
          Do you want to <strong>make a difference in the world</strong> around
          you? Come be a part of the movement that is raising awareness of
          issues like
          <strong
            >Beneficial AGI, Regenerative Economy, Sustainability and
            Stability</strong
          >. Participation in the challenge helps to bring communities and
          individuals together and to increase understanding of the hot topics
          on the global agenda.
        </p>
        <p class="protocol__intro-name">👤 Sharon Gal-Or</p>
      </div>
    </section>
    <section class="protocol__section">
      <h3 class="protocol__title">📢 Notice:</h3>
      <p class="protocol__notice-text">
        This document is your key to success! It's designed to help you step out
        of your comfort zone and position you for creating cultural and
        political change. Remember, nothing is more important than this change,
        and it begins with us! 💪🌍
      </p>
    </section>
    <section class="protocol__section">
      <h3 class="protocol__title">
        🎯 How to lead your own Challenge group
      </h3>
      <div class="protocol__list-container">
        <ul class="diamond-bullet-list">
          <li>
            <strong>Participate in an Existing Challenge Group:</strong> Before
            diving into leading your own group, join an existing Challenge Group
            to get a feel for how it works.
          </li>
          <li>
            <strong>Log In and Set Up:</strong> 🖥️ Go to the Ting Global
            website, set up a template, and pick a start date for your
            challenge.
          </li>
          <li>
            <strong>Choose Your Topic:</strong> Select a topic that sparks your
            interest, like SDG's, Climate Action, or Beneficial AGI. 🔥
          </li>
          <li>
            <strong>Course Design:</strong> The course design, including topics,
            names, images, videos, tasks, and more, are AI-generated based on
            relevance and popularity. 🤖
          </li>
          <li>
            <strong>Add Personal Touches:</strong> Add your own material, such
            as texts, audio, and visuals. Plus, you have the option to translate
            your challenge into other languages. 🌐
          </li>
          <li>
            <strong>Incorporate Engaging Content:</strong> Feel free to include
            new tasks and TED talks in your challenge. 📹
          </li>
          <li>
            <strong>Virtual Ball Passing Game:</strong> Introduce a fun element
            by passing a virtual ball among players. Record a video presenting
            your daily/weekly goal and nominate the next player to do the same.
            🎥🏐
          </li>
          <li>
            <strong>Run a Simulation:</strong> Make sure everything is perfect
            by running a simulation. 🧪
          </li>
          <li>
            <strong>Form a Support Team:</strong> Gather a group of 3-5 friends
            to help invite people and engage players. Do this at least 8 days
            before starting your challenge. 👥
          </li>
          <li>
            <strong>Utilize Social Media:</strong> Stay connected with players
            using Ting social media and other platforms like Facebook,
            Instagram, or WhatsApp. 📱
          </li>
          <li>
            <strong>Outreach to Organizations:</strong> Reach out to at least
            one organization (company, academia, school) to lead and invite to
            your challenge. Refer to the Email invitation template for guidance.
            📧
          </li>
          <li>
            <strong>Prepare a Motivational Video:</strong> 10 days before
            launch, create a video discussing your motivation for starting the
            Challenge group and the power of group effort in driving
            socio-cultural and political change. 🌟
            <ul class="protocol__notice-text">
              <li>Introduce yourself: name, age, background.</li>
              <li>Discuss your reasons for joining and your expectations.</li>
              <li>Speak clearly and maintain a positive tone. 😊</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
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
          'Are you ready to step outside your comfort zone? Do you want to make a difference in the world around you? Come be a part of the movement that is raising awareness of issues like sustainability and stability. Participation in the challenge helps to bring communities and individuals together and to increase understanding of the hot topics on the global agenda.',
      },
    ],
  },
};
</script>

<style lang="scss">
.protocol {
  &__section {
    text-align: center;
    max-width: 100rem;
    margin: auto;

    &:not(:last-child) {
      margin-bottom: 9.5rem;

      @include respond(mobile) {
        margin-bottom: 6.5rem;
      }
    }
  }

  &__intro-box {
    max-width: 75rem;
    margin: auto;
    border: 0.2rem solid #ccc;
    border-radius: 0.5rem;
    padding: 2.5rem;
    text-align: center;

    @include respond(mobile) {
      padding: 1.75rem;
    }
  }

  &__intro-text {
    margin-bottom: 2rem;

    @include respond(mobile) {
      margin-bottom: 1.5rem;
    }
  }

  &__intro-name {
    font-weight: 600;
  }

  &__title {
    font-size: 2.75rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.1rem;
      margin-bottom: 2.25rem;
    }
  }

  &__notice-text {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    &:last-child {
      font-weight: 700;
    }
  }

  &__list-container {
    text-align: left;

    ul {
      font-size: 1.75rem;
      line-height: 1.6;

      @include respond(mobile) {
        font-size: 1.55rem;
        line-height: 1.7;
      }

      & > li:not(:last-child) {
        margin-bottom: 2rem;

        @include respond(mobile) {
          margin-bottom: 1.25rem;
        }
      }

      strong {
        font-weight: 600;
      }

      a {
        color: $color-blue-3;
        transition: color 0.5s;

        &:hover {
          color: $color-gold-3;
        }
      }

      ul {
        margin-left: 3rem;
        margin-top: 1.25rem;

        @include respond(mobile) {
          margin-left: 1.75rem;
          margin-top: 1rem;
        }

        & > li:not(:last-child) {
          margin-bottom: 1rem;

          @include respond(mobile) {
            margin-bottom: 0.75rem;
          }
        }
      }
    }

    @include respond(mobile) {
      li {
        padding-left: 0.25rem !important;
      }
    }
  }
}
</style>
