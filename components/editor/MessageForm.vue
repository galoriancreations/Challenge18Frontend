<template>
  <div :class="classes">
    <div class="message-form__top">
      <TimeSelector v-model="message.time" />
      <div class="task-form__top-icons" v-if="isTemplateEditable">
        <IconButton type="delete" @click="$emit('delete')" />
      </div>
      <i
        v-if="loading"
        class="fas fa-circle-notch fa-spin message-form__spinner"
      />
      <i
        v-else-if="message.hasSelectedFile && message.fileUrl && !message.error"
        class="fas fa-check message-form__check"
      />
    </div>
    <div class="message-form__content">
      <div v-if="isAudio" class="message-form__field">
        <label class="task-form__selector-label">
          Audio recording
        </label>
        <client-only>
          <div class="message-form__audio-wrapper" v-if="audioFileUrl">
            <div class="message-form__audio" v-if="showAudioPlayer">
              <vue-plyr>
                <audio controls crossorigin playsinline>
                  <source :src="audioFileUrl" />
                </audio>
              </vue-plyr>
            </div>
          </div>
        </client-only>
        <v-app v-if="isTemplateEditable">
          <v-file-input
            :value="audioInputValue"
            @change="updateAudioFile"
            accept="audio/*"
            :placeholder="audioInputPlaceholder"
          />
        </v-app>
        <ErrorMessage v-if="message.error && message.file" @click="uploadFile">
          Failed to upload file. Click here to retry
        </ErrorMessage>
      </div>
      <div v-else-if="isImage" class="message-form__field">
        <label class="task-form__selector-label">
          Image
        </label>
        <ImageSelector
          v-model="message.fileUrl"
          :id="message.id"
          :loading="loading"
          @start-upload="onStartUpload"
          @end-upload="onEndUpload"
          :hasSelectedImage.sync="message.hasSelectedFile"
          :error.sync="message.error"
          :buttonSize="30"
          :showStatusIcon="false"
        />
      </div>
      <div v-else class="message-form__field">
        <label class="task-form__selector-label">
          Message
        </label>
        <textarea-autosize
          v-if="isTemplateEditable"
          :value="message.content"
          @input="updateMessageContent"
          class="task-form__extra"
          placeholder="Type your message here..."
          :rows="2"
          :max-height="200"
        />
        <div v-else class="message-form__text">
          <p
            v-for="paragraph in messageText"
            :key="paragraph"
            v-html="paragraph"
            v-linkified
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertTaskText, stripHTML } from "~/assets/util/functions";

export default {
  props: {
    message: Object
  },
  emits: ["delete"],
  inject: ["isTemplateEditable", "uploading", "setTransition"],
  data() {
    return {
      showAudioPlayer: true
    };
  },
  computed: {
    classes() {
      return [
        "task-form",
        "message-form",
        { "message-form--readonly": !this.isTemplateEditable }
      ];
    },
    isAudio() {
      return this.message.type === "audio";
    },
    isImage() {
      return this.message.type === "image";
    },
    audioFileUrl() {
      try {
        const { file } = this.message;
        if (process.server || !file) return;
        return typeof file === "string"
          ? this.$config.axios.baseURL + file
          : URL.createObjectURL(file);
      } catch {
        return null;
      }
    },
    audioInputValue() {
      const { file } = this.message;
      return typeof file === "string" ? null : file;
    },
    audioInputPlaceholder() {
      return this.message.file
        ? "Replace audio file..."
        : "Upload audio file...";
    },
    loading() {
      return this.uploading.includes(this.message.id);
    },
    messageText() {
      return convertTaskText(stripHTML(this.message.content))
        .trim()
        .split("\n");
    }
  },
  methods: {
    updateAudioFile(value) {
      this.message.file = value;
      this.message.hasSelectedFile = true;
      if (value) {
        this.uploadAudioFile();
      } else {
        this.message.fileUrl = null;
        this.message.error = false;
        if (this.loading) {
          this.onEndUpload();
        }
      }
    },
    async uploadAudioFile() {
      this.onStartUpload();
      this.message.error = false;
      try {
        const data = new FormData();
        data.append("file", this.message.file);
        const fileUrl = await this.$axios.$post("/upload", data);
        this.message.fileUrl = fileUrl;
      } catch {
        this.message.error = true;
      }
      this.onEndUpload();
    },
    onStartUpload() {
      this.uploading.push(this.message.id);
    },
    onEndUpload() {
      this.uploading.splice(this.uploading.indexOf(this.message.id), 1);
    },
    updateMessageContent(value) {
      this.message.content = stripHTML(value);
    }
  },
  watch: {
    audioFileUrl() {
      this.showAudioPlayer = false;
      setTimeout(() => {
        this.showAudioPlayer = true;
      });
    }
  }
};
</script>

<style lang="scss">
.message-form {
  background-color: #fff;

  &__top {
    margin-bottom: 1.75rem;
    position: relative;

    .task-form__time-selector {
      margin: auto;
    }
  }

  &__spinner,
  &__check {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__check {
    color: $color-azure;
  }

  .task-form__top-icons {
    grid-template-columns: 1fr;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__content {
    margin-top: 3rem;
  }

  &__field {
    &:not(:last-child) {
      margin-bottom: 3rem;
    }

    .task-form__selector-label {
      margin-bottom: 0.5rem;
    }
  }

  &--readonly &__field .task-form__selector-label {
    margin-bottom: 1rem;
  }

  &__audio-wrapper {
    height: 5.2rem;
  }

  .v-text-field__details {
    &,
    * {
      min-height: 0;
    }
  }

  textarea {
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    line-height: 1.6;
  }

  &__text {
    p {
      font-size: inherit;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }

  .error-message {
    cursor: pointer;
    margin-top: 2rem !important;
  }
}
</style>
