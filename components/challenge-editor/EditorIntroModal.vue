<template>
  <DashboardModal :active="active" class="challenge-editor-intro">
    <h3 class="challenge-editor-intro__title">
      Welcome to the Challenge & Template Editor
    </h3>
    <div class="challenge-editor-intro__text">
      <p>
        On this page you can select which tasks you want to include in your
        challenge, and possibly customize your own challenge template.
      </p>
      <p>You can use this editor to:</p>
      <ul class="diamond-bullet-list">
        <li>Change the name and language of the template.</li>
        <li>Edit the title of each day in the template.</li>
        <li>
          Add/remove days to the template, add/remove tasks on each day, and
          add/remove options on each task.
        </li>
        <li>
          Mark or unmark tasks as a bonus, and choose how many points (between 1
          and 18) to award for each bonus task.
        </li>
        <li>Edit all existing options.</li>
        <li>
          Select which option, for each task, you want to include in the
          challenge.
        </li>
      </ul>
      <p>
        For each task in your template, you have to choose one option that would
        be included in the challenge itself (though you can add as many tasks as
        you want). You can click the Shuffle button at the bottom to pick a
        random option for every task. All other options will remain a part of
        your template, and could be chosen when creating other challenges.
      </p>
      <p>
        All changes you make on this page will be auto-saved as a draft into
        your account (you'll find it under <strong>My Drafts</strong> in
        <RouterLink to="/dashboard">your dashboard</RouterLink>), so you can
        always continue editing right from where you paused, even after logging
        out. In addition, a custom template you build here will be auto-saved
        and added into your stock of available templates, so you can later use
        it to open more challenges.
      </p>
      <p>
        Once you click the <strong>Publish Challenge</strong> button, your draft
        will be published as a live, active challenge, and users will be able to
        join it. You'll receive a link you can use to invite users to the
        challenge.
      </p>
    </div>
    <BaseButton variant="blue" @click="closeModal">Got it</BaseButton>
  </DashboardModal>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  inject: ["closeModal"]
};
</script>

<style lang="scss">
.challenge-editor-intro {
  &__title {
    color: $color-blue-2;
    font-size: 3rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }
  }

  &__text {
    text-align: left;
    margin-bottom: 3rem;

    & > * {
      font-size: 1.6rem;
      line-height: 1.7;

      @include respond(mobile) {
        font-size: 1.45rem;
      }

      &:not(:last-child) {
        margin-bottom: 2rem;

        @include respond(mobile) {
          margin-bottom: 1.5rem;
        }
      }
    }

    ul {
      margin-left: 1rem;
      margin-top: -0.5rem;

      @include respond(mobile) {
        margin-left: 0;
        margin-top: 0;
      }

      & > li {
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  strong {
    font-weight: 600;
  }

  a {
    color: $color-blue-2;
    transition: color 0.5s;

    &:hover {
      color: $color-gold-3;
    }
  }

  .button {
    width: 20rem;
  }
}
</style>
