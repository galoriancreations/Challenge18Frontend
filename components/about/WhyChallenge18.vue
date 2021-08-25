<template>
  <section class="why-challenge-18">
    <SectionHeading small>Why Challenge 18?</SectionHeading>
    <div class="why-challenge-18__container">
      <div class="why-challenge-18__video">
        <youtube videoId="4wbg9trE07c" />
      </div>
      <div class="why-challenge-18__content">
        <div class="why-challenge-18__text">
          <img src="../../assets/images/icon-quotes.svg" />
          <div class="why-challenge-18__text-content">
            <p>
              The problem is that there is a global crisis for all of humanity
              and it is not yet well assimilated into the education system. The
              need is in a training program to raise the level of understanding,
              interest and involvement of students in matters relate to the
              SDG's and bring universal values back to fashion.
            </p>
            <p>
              The solution – Challenge 18 is the most important sustainability
              and leadership games tournament in the world, in which clubs from
              all over the world collaborate in achieving the SDG’s. My message
              to you – prepare your students for a future that is already here.
            </p>
          </div>
        </div>
        <div class="why-challenge-18__signature">
          <h4>Sharon Gal-Or</h4>
          <span>Founder of Ting Global</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.why-challenge-18 {
  margin-top: 9.5rem;

  @include respond(mobile) {
    margin-top: 7rem;
  }

  &__container {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    @include respond(tablet-land) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__video {
    margin-left: 6rem;
    width: 42.5%;
    max-width: 51rem;

    @include respond(tablet-land) {
      margin-left: 0;
      margin-bottom: 4.5rem;
      width: 100%;
      max-width: 50rem;
    }

    iframe {
      display: block;
      margin: auto;
      border-radius: 0.8rem;
      width: 100%;
      height: 29vw;
      min-height: 39rem;
      max-height: 42rem;
      box-shadow: $boxshadow2;

      @include respond(tablet-land) {
        height: 65vw;
        min-height: initial;
        max-height: 36rem;
      }
    }
  }

  &__content {
    flex: 1;
  }

  &__text {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include respond(mobile) {
      margin-bottom: 3.5rem;
    }
  }

  &__text-content {
    margin-top: -2.5rem;

    p {
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }
  }

  &__signature {
    text-align: center;

    h4 {
      color: $color-blue-2;
      font-size: 1.9rem;
      margin-bottom: 0.5rem;

      @include respond(mobile) {
        font-size: 1.7rem;
      }
    }

    span {
      font-size: 1.55rem;

      @include respond(mobile) {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
