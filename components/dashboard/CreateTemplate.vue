<template>
  <PopupModal
    title="Create New Template"
    :active="active"
    class="new-challenge-modal create-challenge"
  >
    <div class="new-challenge-modal__section" v-if="!templateWithAi">
      <h3 class="new-challenge-modal__subheading">Choose a language</h3>
      <VueSelect
        v-model="selectedLanguage"
        :options="templateWithAi ? filteredAiLanguageOptions : languageOptions"
        :reduce="(option) => option.name"
        class="language-selector"
      />
    </div>
    <div class="new-challenge-modal__section" v-if="!templateWithAi">
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
            {{ template.name || '(Unnamed)' }}
          </label>
        </div>
      </div>
    </div>
    <CreateTemplateWithAi v-else />
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
        <BaseButton
          variant="blue"
          @click="templateWithAi = true"
          v-if="!templateWithAi"
        >
          Create template with AI
        </BaseButton>
        <BaseButton variant="blue" @click="templateWithAi = false" v-else>
          Clone existing template
        </BaseButton>
      </div>
    </div>
    <BaseSpinner v-if="loading && !templateWithAi" />
  </PopupModal>
</template>

<script>
import languageOptions from "../../assets/data/languages";

export default {
  props: {
    active: Boolean,
  },
  inject: ["closeModal", "addNotification"],
  data() {
    return {
      selectedLanguage: "English",
      loading: false,
      templateWithAi: false,
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
    },
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
      // clone  template, but not like in "templates-table" component:
      // it gets all data of the template, clones it here, in client
      // and saves cloned templte in DB
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
    // create new or open selected:
    async selectTemplate(template) {
      // if templated id selected clone with cloneTemplate method
      if (template) {
        const newTemplateId = await this.cloneTemplate(template._id);
        this.$cookies.set("selectedTemplate", newTemplateId);
      } else {
        // if the template is new- no cookies
        this.$cookies.remove("selectedTemplate");
      }
      this.$cookies.remove("draftId");
      this.$cookies.remove("challengeId");
      // redirects user to another page:
      this.$router.push({
        path: "/editor",
        query: { templateOnly: true }
      });
    },
  },
  watch: {
    userLanguage() {
      this.autoSetLanguage();
    },
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