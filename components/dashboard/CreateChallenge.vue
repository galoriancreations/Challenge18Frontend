<template>
  <PopupModal
    title="Create a Challenge"
    :active="active"
    class="new-challenge-modal create-challenge"
  >
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
          :key="template.id"
        >
          <label @click="selectTemplate(template.id)">
            {{ template.name || "(Unnamed)" }}
          </label>
        </div>
      </div>
    </div>
    <div class="new-challenge-modal__section">
      <h3
        class="new-challenge-modal__subheading new-challenge-modal__subheading--big"
      >
        OR
      </h3>
      <BaseButton variant="blue" @click="selectTemplate(null)">
        Create new template
      </BaseButton>
    </div>
  </PopupModal>
</template>

<script>
import languageOptions from "../../assets/data/languages";

export default {
  props: {
    active: Boolean
  },
  inject: ["closeModal"],
  data() {
    return {
      selectedLanguage: "English"
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
      return this.$store.getters.templates.filter(
        template => template.isPublic || template.creator === this.user?.id
      );
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
    selectTemplate(templateId) {
      if (templateId) {
        this.$cookies.set("selectedTemplate", templateId);
      } else {
        this.$cookies.remove("selectedTemplate");
      }
      this.$cookies.remove("draftId");
      this.$cookies.remove("challengeId");
      this.$router.push("/editor");
    }
  },
  watch: {
    userLanguage() {
      this.autoSetLanguage();
    }
  },
  created() {
    this.autoSetLanguage();
  }
};
</script>

<style lang="scss">
.new-challenge-modal {
  &__subheading {
    &--big {
      font-size: 2.2rem;
    }
  }

  &.create-challenge .button {
    width: auto;
  }
}
</style>
