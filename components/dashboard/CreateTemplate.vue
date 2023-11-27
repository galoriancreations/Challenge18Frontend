<template>
  <PopupModal
    :title="`Create New Template${templateWithAi ? ' With AI' : ''}`"
    :active="active"
    class="new-challenge-modal create-challenge"
  >
    <div class="new-challenge-modal__section" v-if="!templateWithAi">
      <h3 class="new-challenge-modal__subheading">Choose a language</h3>
      <VueSelect
        v-model="selectedLanguage"
        :options="templateWithAi ? languageOptions.filter(language => language.name === 'English') : languageOptions"
        :reduce="option => option.name"
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
            {{ template.name || "(Unnamed)" }}
          </label>
        </div>
      </div>
    </div>
  <form class="form new-challenge-modal__section" @submit.prevent v-else>
    <div class="form__field">
      <label for="language" class="form__label">Choose a language</label>
      <VueSelect
        v-model="selectedLanguage"
        :options="templateWithAi ? languageOptions.filter(language => language.name === 'English') : languageOptions"
        :reduce="option => option.name"
        class="language-selector"
      />
    </div>
      <div class="form__field">
        <label for="topic" class="form__label">
          What is the topic of the challenge?
        </label>
        <input
          v-model="template.topic"
          id="topic"
          required
          class="form__input"
          placeholder="Topic"
        />
      </div>
      <div class="form__field">
        <label for="days" class="form__label">
          How much days should be in the challenge?
        </label>
        <client-only>
          <NumberInput
          v-model="template.days"
          id="days"
          :min="1"
          :max="5"
          :center="true"
          size="large"
          controls
          />
        </client-only>
      </div>
      <div class="form__field">
        <label for="tasks" class="form__label">
          How much tasks should be in the challenge?
        </label>
        <client-only>
          <NumberInput
          v-model="template.tasks"
          id="tasks"
          :min="1"
          :max="10"
          :center="true"
          size="large"
          controls
          />
        </client-only>
      </div>
      <div class="buttons">
        <BaseButton variant="blue" @click="createTemplateWithAi">
          Create With AI
        </BaseButton>
        <BaseButton variant="white" @click="templateWithAi = false">
          Clone existing template
        </BaseButton>
      </div>
    </form>
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
      </div>
    </div>
    <BaseSpinner v-if="loading" />
  </PopupModal>
</template>

<script>
import languageOptions from "../../assets/data/languages";

export default {
  props: {
    active: Boolean,
  },
  inject: ["closeModal"],
  data() {
    return {
      selectedLanguage: "English",
      loading: false,
      templateWithAi: false,
      template: {
        topic: "",
        days: 2,
        tasks: 5,
      }
    };
  },
  components: {
    NumberInput: () =>
      process.client ? import("@chenfengyuan/vue-number-input") : null
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
      if (!this.template.topic) {
        return;
      }
      this.loading = true;
      const { template } = await this.$axios.$post("/xapi", {
        createTemplateWithAi: {
          topic: this.template.topic,
          language: this.selectedLanguage,
          days: this.template.days,
          tasks: this.template.tasks
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
    },
    templateWithAi() {
      if (this.templateWithAi) {
        this.selectedLanguage = "English";
      }
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