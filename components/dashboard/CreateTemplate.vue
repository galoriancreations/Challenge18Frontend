<template>
  <PopupModal
    title="Create New Template"
    :active="active"
    class="new-challenge-modal create-challenge"
  >
  <div ref="topDiv" class="topDiv"/>
    <div class="new-challenge-modal__section" v-if="!templateWithAi">
      <h3 class="new-challenge-modal__subheading">Choose a language</h3>
      <VueSelect
        v-model="selectedLanguage"
        :options="
          templateWithAi
            ? filteredAiLanguageOptions
            : languageOptions
        "
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
    <div class="new-challenge-modal__section" v-else>
      <h3 class="new-challenge-modal__subheading">
        Create template with AI
      </h3>
      <Progress
        v-if="loading"
        :preMessage="progress.preMessage"
        :postMessage="progress.postMessage"
        :percentDuration="progress.type === 'images' ? 10000 : 50000"
        :bufferDuration="progress.type === 'images' ? 5000 : 20000"
        @type-changed="handleProgressTypeChanged"
      />
      <form class="form" @submit.prevent>
        <div class="form__field">
          <label for="language" class="form__label">Choose a language</label>
          <VueSelect
            :disabled="loading"
            v-model="selectedLanguage"
            :options="
              templateWithAi
                ? languageOptions.filter(
                    (language) => language.name === 'English'
                  )
                : languageOptions
            "
            :reduce="(option) => option.name"
            class="language-selector"
          />
        </div>
        <div class="form__field">
          <label for="topic" class="form__label">
            What is the topic of the challenge?
          </label>
          <input
            :disabled="loading"
            v-model="template.topic"
            id="topic"
            required
            class="form__input"
            placeholder="Topic"
          />
        </div>
        <div class="form__field">
          <label for="targetAudience" class="form__label">
            What is the target audience of the challenge?
          </label>
          <input
            :disabled="loading"
            v-model="template.targetAudience"
            id="targetAudience"
            required
            class="form__input"
            placeholder="For example: elementary school, high school, university, ..."
          />
        </div>
        <div class="form__field">
          <label for="days" class="form__label">
            How many days?
          </label>
          <client-only>
            <NumberInput
              :disabled="loading"
              v-model="template.days"
              id="days"
              :min="1"
              :max="30"
              :center="true"
              size="large"
              controls
            />
          </client-only>
        </div>
        <div class="form__field">
          <label for="tasks" class="form__label">
            How many tasks per day?
          </label>
          <client-only>
            <NumberInput
              :disabled="loading"
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
        <div class="form__field">
          <label for="messages" class="form__label">
            How many messages per day?
          </label>
          <client-only>
            <NumberInput
              :disabled="loading"
              v-model="template.messages"
              id="messages"
              :min="0"
              :max="10"
              :center="true"
              size="large"
              controls
            />
          </client-only>
        </div>
        <div class="aiFormInline">
          <div class="form__field">
            <label for="preDays" class="form__label">
              How many days for pre messages?
            </label>
            <client-only>
              <NumberInput
                :disabled="loading"
                v-model="template.preDays"
                id="preDays"
                :min="0"
                :max="10"
                :center="true"
                size="large"
                controls
              />
            </client-only>
          </div>
          <div class="form__field">
            <label for="preMessagesPerDay" class="form__label">
              How many pre messages per day?
            </label>
            <client-only>
              <NumberInput
                :disabled="loading || template.preDays === 0"
                v-model="template.preMessagesPerDay"
                id="preMessagesPerDay"
                :min="template.preDays === 0 ? 0 : 1"
                :max="10"
                :center="true"
                size="large"
                controls
              />
            </client-only>
          </div>
        </div>
        <BaseButton
          variant="blue"
          @click="createTemplateWithAi"
          :disabled="loading"
        >
          Create With AI
        </BaseButton>
      </form>
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
      template: {
        topic: "",
        days: 3,
        tasks: 1,
        messages: 1,
        preDays: 1,
        preMessagesPerDay: 1,
        targetAudience: "",
      },
      progress: {
        preMessage: `AI is working on your template.<br/>Attempt <strong>`,
        postMessage: `</strong>to create template.<br/>This may <strong>take a few minutes</strong>.<br/>You will be <strong>redirected</strong> to the editor when we <strong>done</strong>.`,
        type: 'template',
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
    },
    filteredAiLanguageOptions() {
      return this.languageOptions.filter(
        language => language.name === "English"
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
    async createTemplateWithAi() {
      if (!this.template.topic) {
        return;
      }
      this.loading = true;
      this.addNotification(
        `Creating template with AI. This may <strong>take a few minutes</strong>.
          You will be <strong>redirected</strong> to the editor when it's <strong>done</strong>.`,
      );

      // go to top of modal by going to topDiv
      this.$refs.topDiv.scrollIntoView();
            
      const { template } = await this.$axios.$post("/xapi", {
        createTemplateWithAi: {
          topic: this.template.topic,
          language: this.selectedLanguage,
          days: this.template.days,
          tasks: this.template.tasks,
          messages: this.template.messages,
          preDays: this.template.preDays,
          preMessagesPerDay: this.template.preMessagesPerDay,
          targetAudience: this.template.targetAudience,
          creator: this.user._id,
        }
      });
      this.$cookies.set("selectedTemplate", template._id);
      this.$cookies.remove("draftId");
      this.$cookies.remove("challengeId");
      this.$router.push({
        path: "/editor",
        query: { templateOnly: true }
      });
    },
    handleProgressTypeChanged(type) {
      if (type === "images") {
        this.progress.preMessage = `Preparing your template...<br/>Generating image<strong>`;
        this.progress.postMessage = `</strong><br/>This may <strong>take a few minutes</strong>.<br/>You will be <strong>redirected</strong> to the editor when we <strong>done</strong>.`;
      }
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
    "template.preDays"(newValue) {
      if (newValue === 0) {
        this.template.preMessagesPerDay = 0;
      }
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
.aiFormInline {
  display: flex;
  justify-content: space-between;
}
.topDiv {
  position: absolute;
  top: 0;
}
</style>