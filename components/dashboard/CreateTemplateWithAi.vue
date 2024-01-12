<template>
  <div>
    <div ref="topDiv" class="topDiv" />
    <div class="new-challenge-modal__section">
      <h3 class="new-challenge-modal__subheading">
        Create template with AI
      </h3>
      <Progress
        v-if="loading"
        :preMessage="progress.preMessage"
        :postMessage="progress.postMessage"
        :percentDuration="progress.percentDuration"
        :bufferDuration="progress.bufferDuration"
        :percentColor="progress.percentColor"
        :bufferColor="progress.bufferColor"
        @type-changed="handleProgressTypeChanged"
      />
      <form class="form" @submit.prevent>
        <div class="form__field">
          <label for="language" class="form__label">Choose a language</label>
          <VueSelect
            :disabled="loading"
            v-model="template.language"
            :options="
              languageOptions.filter((language) => language.name === 'English')
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
        <div class="new-challenge-modal__section">
          <label for="language" class="form__label"
            >Choose introduction voice</label
          >
          <VueSelect
            v-model="template.voice"
            :options="voiceOptions"
            :reduce="(option) => option.voice"
            class="language-selector"
          />
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
  </div>
</template>

<script>
import languageOptions from '../../assets/data/languages';
import voiceOptions from '../../assets/data/voices';

export default {
  inject: ['closeModal', 'addNotification'],
  components: {
    NumberInput: () =>
      process.client ? import('@chenfengyuan/vue-number-input') : null,
  },
  data() {
    return {
      loading: false,
      template: {
        language: 'English',
        topic: '',
        days: 3,
        tasks: 1,
        messages: 1,
        preDays: 1,
        preMessagesPerDay: 1,
        targetAudience: '',
        voice: 'alloy',
      },
      progress: {
        preMessage: `AI is working on your template.<br/>Attempt <strong>`,
        postMessage: `</strong>to create template.<br/>This may <strong>take a few minutes</strong>.<br/>You will be <strong>redirected</strong> to the editor when we <strong>done</strong>.`,
        type: 'template',
        percentDuration: 50000,
        bufferDuration: 20000,
        percentColor: '#00b4ff',
        bufferColor: '#e6e6e6',
      },
    };
  },
  computed: {
    languageOptions() {
      return languageOptions;
    },
    voiceOptions() {
      return voiceOptions;
    },
    filteredAiLanguageOptions() {
      return this.languageOptions.filter(
        (language) => language.name === 'English'
      );
    },
  },
  methods: {
    async createTemplateWithAi() {
      if (!this.template.topic) {
        return;
      }
      this.loading = true;
      this.addNotification(
        `Creating template with AI. This may <strong>take a few minutes</strong>.
          You will be <strong>redirected</strong> to the editor when it's <strong>done</strong>.`
      );

      // go to top of modal by going to topDiv
      this.$refs.topDiv.scrollIntoView();
      const { template } = await this.$axios.$post('/xapi', {
        createTemplateWithAi: {
          topic: this.template.topic,
          language: this.template.language,
          days: this.template.days,
          tasks: this.template.tasks,
          messages: this.template.messages,
          preDays: this.template.preDays,
          preMessagesPerDay: this.template.preMessagesPerDay,
          targetAudience: this.template.targetAudience,
          // creator: this.user._id,
          voice: this.template.voice,
        },
      });

      if (!template?._id) {
        this.addNotification(
          `Something went wrong. Please try again later.`,
          'error'
        );
        this.loading = false;
        return;
      }

      this.$cookies.set('selectedTemplate', template._id);
      this.$cookies.remove('draftId');
      this.$cookies.remove('challengeId');
      this.$router.push({
        path: '/editor',
        query: { templateOnly: true },
      });
    },
    handleProgressTypeChanged(type) {
      if (type === 'images') {
        this.progress.preMessage = `Preparing your template...<br/>Generating image<strong>`;
        this.progress.postMessage = `</strong><br/>This may <strong>take a few minutes</strong>.<br/>You will be <strong>redirected</strong> to the editor when we <strong>done</strong>.`;
        this.progress.percentDuration = 20000;
        this.progress.bufferDuration = 10000;
        this.progress.percentColor = '#1c2c54';
      } else if (type === 'audios') {
        this.progress.preMessage = `Preparing your template...<br/>Generating audio<strong>`;
        this.progress.postMessage = `</strong><br/>This may <strong>take a few minutes</strong>.<br/>You will be <strong>redirected</strong> to the editor when we <strong>done</strong>.`;
        this.progress.percentDuration = 5000;
        this.progress.bufferDuration = 2000;
        this.progress.percentColor = '#228b22';
      }
    },
  },
  watch: {
    templateWithAi() {
      if (this.templateWithAi) {
        this.template.language = 'English';
      }
    },
    'template.preDays'(newValue) {
      if (newValue === 0) {
        this.template.preMessagesPerDay = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aiFormInline {
  display: flex;
  justify-content: space-between;
}
.topDiv {
  position: absolute;
  top: 0;
}
button {
  margin: 1rem;
}
</style>
