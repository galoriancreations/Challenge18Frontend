<template>
  <DashboardModal
    title="Create a Challenge"
    :active="active"
    class="new-challenge-modal create-challenge"
  >
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
          <label @click="selectTemplate(template)">
            {{ template }}
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
  </DashboardModal>
</template>

<script>
import { languageOptions } from "../../assets/util/options";

export default {
  props: {
    active: Boolean
  },
  inject: ["closeModal"],
  data() {
    return {
      selectedLanguage: "English",
      templateOptions: {}
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
    filteredTemplateOptions() {
      return this.templateOptions[this.selectedLanguage];
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
    selectTemplate(template) {
      this.$store.dispatch("selectTemplate", template);
      this.$router.push("/challenge-options");
    }
  },
  watch: {
    userLanguage() {
      this.autoSetLanguage();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

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
