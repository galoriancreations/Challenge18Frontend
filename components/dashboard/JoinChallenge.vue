<template>
  <PopupModal
    title="Join a Challenge"
    :active="active"
    class="new-challenge-modal join-challenge"
  >
    <div v-if="!link" class="new-challenge-modal__initial">
      <div class="new-challenge-modal__section">
        <h3 class="new-challenge-modal__subheading">Choose a language</h3>
        <VueSelect
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
            :key="template._id"
          >
            <input
              type="radio"
              v-model="selectedTemplate"
              :value="template._id"
              :id="template._id"
            />
            <label :for="template._id">{{ template.name }}</label>
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
  </PopupModal>
</template>

<script>
import languageOptions from "../../assets/data/languages";

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
      const availableLanguages = this.templateOptions.map(
        template => template.language
      );
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
      return this.templateOptions.filter(
        template => template.language === this.selectedLanguage
      );
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
          userID: this.user._id,
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
