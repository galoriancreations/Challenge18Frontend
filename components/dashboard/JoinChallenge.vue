<template>
  <DashboardModal
    title="Join a Challenge"
    :active="active"
    class="new-challenge-modal join-challenge"
  >
    <div v-if="!link" class="new-challenge-modal__initial">
      <div class="new-challenge-modal__section">
        <h3 class="new-challenge-modal__subheading">Choose a language</h3>
        <v-select
          v-model="selectedLanguage"
          :options="languageOptions"
          :reduce="option => option.name"
          class="language-selector"
        />
      </div>
      <div class="new-challenge-modal__section">
        <h3 class="new-challenge-modal__subheading">
          Choose challenge template
        </h3>
        <div class="new-challenge-modal__options">
          <div
            class="template-button"
            v-for="template in filteredTemplateOptions"
            :key="template"
          >
            <input
              type="radio"
              v-model="selectedTemplate"
              :value="template"
              :id="template"
            />
            <label :for="template">{{ template }}</label>
          </div>
        </div>
      </div>
      <BaseButton variant="blue" @click="submitHandler">Join</BaseButton>
      <BaseSpinner v-if="submitting" />
      <ErrorMessage v-else-if="errorSubmitting" :error="errorSubmitting" />
    </div>
    <div v-else class="new-challenge-modal__link-section">
      <h3 class="new-challenge-modal__subheading">
        Click this link to join the challenge
      </h3>
      <a class="new-challenge-modal__link" :href="link" target="_blank">
        {{ link }}
      </a>
    </div>
  </DashboardModal>
</template>

<script>
import { languageOptions } from "../../assets/util/options";

export default {
  props: {
    active: Boolean
  },
  inject: ["closeModal", "io"],
  data() {
    return {
      selectedLanguage: "English",
      selectedTemplate: null,
      submitting: false,
      errorSubmitting: null,
      link: null
    };
  },
  computed: {
    languageOptions() {
      const availableLanguages = Object.keys(this.templateOptions);
      return languageOptions.filter(language =>
        availableLanguages.includes(language.name)
      );
    },
    user() {
      return this.$store.getters.user;
    },
    userLanguage() {
      return this.user?.language;
    },
    templateOptions() {
      return this.$store.getters.templates;
    },
    filteredTemplateOptions() {
      return this.templateOptions[this.selectedLanguage || "English"];
    }
  },
  methods: {
    autoSetLanguage() {
      const isLanguageAvailable = !!this.languageOptions.find(
        language => language.name === this.userLanguage
      );
      if (isLanguageAvailable) {
        this.selectedLanguage = this.userLanguage;
      }
    },
    async submitHandler() {
      this.submitting = true;
      try {
        const { invite } = await this.$axios.$post("/xapi", {
          userID: this.user.id,
          userRequestChallenge: this.selectedTemplate
        });
        this.link = invite;
        this.io.on("myChallenges", this.closeModal);
      } catch (error) {
        this.errorSubmitting = error;
      }
      this.submitting = false;
    }
  },
  watch: {
    active(value) {
      if (value) {
        this.selectedTemplate = this.filteredTemplateOptions[0];
        this.link = null;
      }
    },
    userLanguage() {
      this.autoSetLanguage();
    },
    filteredTemplateOptions(value) {
      this.selectedTemplate = value[0];
    }
  },
  mounted() {
    this.autoSetLanguage();
  }
};
</script>

<style lang="scss">
.new-challenge-modal {
  &__section {
    &:not(:last-child) {
      margin-bottom: 5rem;

      @include respond(mobile) {
        margin-bottom: 4rem;
      }
    }
  }

  &__subheading {
    font-size: 1.9rem;
    margin-bottom: 1.8rem;
    line-height: 1.6;

    @include respond(mobile) {
      font-size: 1.7rem;
    }
  }

  &__options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @include respond(mobile) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  &.join-challenge .button {
    width: 15rem;
  }

  &__link-section,
  .section-heading-wrapper + .error-message {
    position: absolute;
    width: 100%;
    padding: 0 4rem;
    left: 0;
    top: 50%;
    transform: translateY(-30%);
    text-align: center;

    @include respond(mobile) {
      padding: 0 2rem;
    }
  }

  &__link {
    font-size: 2.3rem;
    color: $color-blue-2;
    transition: color 0.5s;

    @include respond(mobile) {
      font-size: 2.1rem;
    }

    &:hover {
      color: $color-gold-3;
    }
  }
}

.template-button {
  input {
    display: none;
  }

  label {
    width: 100%;
    height: 100%;
    cursor: pointer;
    box-shadow: $boxshadow2;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: 0.2rem solid transparent;
    font-weight: 500;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;

    @include respond(mobile) {
      font-size: 1.55rem;
    }

    &:hover {
      background-color: rgba($color-azure-light, 0.8);
    }
  }

  input:checked + label {
    background-color: rgba($color-azure-light, 0.8);
    border: 0.2rem solid $color-azure;
  }
}
</style>
