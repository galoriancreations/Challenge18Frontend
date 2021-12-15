<template>
  <Page title="Challenge 18 Protocol" name="protocol">
    <section class="protocol__section">
      <div class="protocol__intro-box">
        <p class="protocol__intro-text">
          Are you ready to step outside your comfort zone? Do you want to make a
          difference in the world around you? Come be a part of the movement
          that is raising awareness of issues like sustainability and stability.
          Participation in the challenge helps to bring communities and
          individuals together and to increase understanding of the hot topics
          on the global agenda.
        </p>
        <p class="protocol__intro-name">Sharon Gal-Or</p>
      </div>
    </section>
    <section class="protocol__section">
      <h3 class="protocol__title">Notice:</h3>
      <p class="protocol__notice-text">
        This document gives you the key elements of success to help you to step
        out of your comfort zone and put you into a position to bring cultural
        and political change. Nothing is more important.
      </p>
      <p class="protocol__notice-text">The change begins in us!</p>
    </section>
    <section class="protocol__section">
      <h3 class="protocol__title">
        How to lead your own Challenge 18 group
      </h3>
      <div class="protocol__list-container">
        <ul class="diamond-bullet-list">
          <li>
            Participate in a given Challenge 18 Group.
          </li>
          <li>
            18 days before you start your own Challenge 18 group,
            <NuxtLink to="/login">log into the Ting Global website</NuxtLink>,
            set a template and start date for your challenge.
          </li>
          <li>
            <span>
              Chose a topic of your interest, for example:
              <strong>Climate Action</strong>, <strong>Education</strong> or
              <strong>Cultural Exchange</strong>.
            </span>
            <ul>
              <li>
                Add new material such as text, audio and visuals to your
                challenge, you can also translate your challenge into other
                languages for other people.
              </li>
              <li>
                You can choose to place new tasks and TED talks in your
                challenge.
              </li>
              <li>
                You can choose to place a virtual ball to pass among players,
                e.g. a video whereas you present the daily goal from your point
                of view and then name another player in the group to be the next
                to upload such a video and challenge the next player in turn, so
                once there are 18 players in total to pass the virtual ball, the
                complete group will receive extra 18 points.
              </li>
              <li>
                Run a simulation to make sure all is to your satisfaction.
              </li>
            </ul>
          </li>
          <li>
            <span>
              Organize a group of 3-5 friends to help you invite people to the
              group and get the players engaged.
              <strong>
                10 days before you start your own challenge 18 group.
              </strong>
            </span>
            <ul>
              <li>
                Coordinate and communicate with other players using both Ting
                social media and your own social media such as Facebook,
                Instagram or WhatsApp etc.
              </li>
              <li>
                Contact and invite at least one organization (company/academia/
                school) you wish to lead and invite them to your challenge group
                and make sure to know who and how many are you going to lead.
                See
                <a
                  href="https://docs.google.com/document/d/1IBUJ1HPuGhjUShsYlis_yHpNuUAb7pLm/edit"
                  target="_blank"
                >
                  Email invitation template</a
                >.
              </li>
              <li>
                <span>
                  Prepare a video of yourself talking to your audience about
                  your motivation to start Challenge 18 group and about
                  releasing group power to encourage socio-cultural and
                  political change. <strong>10 days before launch</strong>.
                </span>
                <ul>
                  <li>
                    Say your name, age, the place you came from, where/what you
                    study…
                  </li>
                  <li>Explain why you joined the group.</li>
                  <li>Talk about your expectations.</li>
                  <li>Speak clearly and cheerfully.</li>
                </ul>
              </li>
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
        hid: "description",
        name: "description",
        content:
          "Are you ready to step outside your comfort zone? Do you want to make a difference in the world around you? Come be a part of the movement that is raising awareness of issues like sustainability and stability. Participation in the challenge helps to bring communities and individuals together and to increase understanding of the hot topics on the global agenda."
      }
    ]
  }
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
