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
          :key="template._id"
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
      <div class="buttons">
        <BaseButton variant="blue" @click="selectTemplate(null)">
          Create empty template
        </BaseButton>
        <BaseButton variant="blue" @click="createTemplateWithAi">
          Create template with AI
        </BaseButton>
      </div>
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
      return this.$store.getters.isAdmin;
    },
    userLanguage() {
      return this.user?.language;
    },
    templateOptions() {
      const filter = this.isAdmin
        ? template => template.isPublic || template.creator === this.user?._id
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
    async cloneTemplate(templateId) {
      this.loading = true;
      const template = await this.$axios.$post("/xapi", {
        getTemplateData: templateId
      });
      const newTemplate = {
        ...template,
        name: `${template.name || "Unnamed"} (copy)`,
        isPublic: template.isPublic && this.user.isAdmin === true
      };
      const { templateId: newId } = await this.$axios.$post("/xapi", {
        saveTemplate: {
          templateId: null,
          templateData: newTemplate,
          draftId: null,
          finishEditing: false
        }
      });
      return newId;
    },
    async selectTemplate(template) {
      if (template) {
        const newTemplateId = await this.cloneTemplate(template._id);
        this.$cookies.set("selectedTemplate", newTemplateId);
      } else {
        this.$cookies.remove("selectedTemplate");
      }
      this.$cookies.remove("draftId");
      this.$cookies.remove("challengeId");
      this.$router.push({
        path: "/editor",
        query: { templateOnly: true }
      });
    },
    async createTemplateWithAi() {
      this.loading = true;

      // implement popup modal to open for topic input and language selection

      const topic = prompt("Enter a topic for your template");
      if (!topic) {
        this.loading = false;
        return;
      }
      const { template } = await this.$axios.$post("/xapi", {
        createTemplateWithAi: {
          topic,
          language: this.selectedLanguage
        }
      });
      this.$cookies.set("selectedTemplate", template._id);
      this.$cookies.remove("draftId");
      this.$cookies.remove("challengeId");
      this.$router.push({
        path: "/editor",
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

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>