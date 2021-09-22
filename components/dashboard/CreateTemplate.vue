<template>
  <PopupModal
    title="Create New Template"
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
        Clone existing template
      </h3>
      <div class="new-challenge-modal__options">
        <div
          class="template-button"
          v-for="template in filteredTemplateOptions"
          :key="template.id"
        >
          <label @click="selectTemplate(template)">
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
        Create empty template
      </BaseButton>
    </div>
    <BaseSpinner v-if="loading" />
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
      selectedLanguage: "English",
      loading: false
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
    isAdmin() {
      return this.user?.accountType === "admin";
    },
    userLanguage() {
      return this.user?.language;
    },
    templateOptions() {
      const filter = this.isAdmin
        ? template => template.isPublic || template.creator === this.user?.id
        : template => template.allowCopies || !template.isPublic;
      return this.$store.getters.templates.filter(filter);
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
    async cloneTemplate(template) {
      this.loading = true;
      const { templateId } = await this.$axios.$post("/xapi", {
        saveTemplate: {
          templateId: null,
          templateData: {
            ...template,
            name: `${template.name} (copy)`
          },
          draftId: null,
          finishEditing: false
        }
      });
      return templateId;
    },
    async selectTemplate(template) {
      if (template) {
        const templateId = await this.cloneTemplate(template);
        this.$cookies.set("selectedTemplate", templateId);
      } else {
        this.$cookies.remove("selectedTemplate");
      }
      this.$cookies.remove("draftId");
      this.$cookies.remove("challengeId");
      this.$router.push({
        path: "/challenge-editor",
        query: { templateOnly: true }
      });
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
