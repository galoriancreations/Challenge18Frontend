<template>
  <Page title="Why Challenge 18" name="why-challenge-18">
    <div class="why-challenge-18__video">
      <youtube videoId="4wbg9trE07c" />
    </div>
    <div class="why-challenge-18__content">
      <h3 class="why-challenge-18__subtitle">
        WHY Challenge 18?
      </h3>
      <div class="why-challenge-18__text">
        <img class="testimonial__icon" src="../assets/images/icon-quotes.svg" />
        <div class="why-challenge-18__text-content">
          <p>
            The problem is that there is a global crisis for all of humanity and
            it is not yet well assimilated into the education system.
          </p>
          <p>
            The need is in a training program to raise the level of
            understanding, interest and involvement of students in matters
            relate to the SDG's and bring universal values back to fashion.
          </p>
          <p>
            The solution – Challenge 18 is the most important sustainability and
            leadership games tournament in the world, in which clubs from all
            over the world collaborate in achieving the SDG’s.
          </p>
          <p>
            My message to you – prepare your students for a future that is
            already here.
          </p>
        </div>
      </div>
      <div class="why-challenge-18__signature">
        <h4>Sharon Gal-Or</h4>
        <span>Founder of Ting Global</span>
      </div>
    </div>
  </Page>
</template>

<style lang="scss">
.why-challenge-18 {
  &__video {
    margin-bottom: 8rem;

    @include respond(mobile) {
      margin-bottom: 6rem;
    }

    iframe {
      display: block;
      margin: auto;
      border-radius: 0.8rem;
      width: 100%;
      max-width: 70rem;
      height: 30vw;
      min-height: 20rem;

      @include respond(tablet) {
        height: 35vw;
      }
    }
  }

  &__subtitle {
    color: $color-blue-2;
    font-size: 3rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }
  }

  &__content {
    max-width: 80rem;
    margin: auto;
    text-align: center;
  }

  &__text {
    margin-bottom: 4rem;
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
