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
        v-else-if="hasSelectedFile && message.file && !error"
        class="fas fa-check message-form__check"
      />
    </div>
    <div class="message-form__content">
      <div v-if="message.isAudio" class="message-form__field">
        <label class="task-form__selector-label">
          Audio recording
        </label>
        <client-only>
          <div class="message-form__audio-wrapper" v-if="fileUrl">
            <div class="message-form__audio" v-if="showPlayer">
              <vue-plyr>
                <audio controls crossorigin playsinline>
                  <source :src="fileUrl" />
                </audio>
              </vue-plyr>
            </div>
          </div>
        </client-only>
        <v-app v-if="isTemplateEditable">
          <v-file-input
            :value="fileInputValue"
            @change="updateMessageFile"
            accept="audio/*"
            :placeholder="fileInputPlaceholder"
          />
        </v-app>
        <ErrorMessage v-if="error && message.file" @click="uploadFile">
          Failed to upload file. Click here to retry
        </ErrorMessage>
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
  inject: ["isTemplateEditable", "uploading"],
  data() {
    return {
      showPlayer: true,
      hasSelectedFile: false,
      error: false
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
    fileUrl() {
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
    fileInputValue() {
      const { file } = this.message;
      return typeof file === "string" ? null : file;
    },
    fileInputPlaceholder() {
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
    updateMessageFile(value) {
      this.message.file = value;
      this.hasSelectedFile = true;
      if (value) {
        this.uploadFile();
      } else {
        this.message.fileUrl = null;
        this.error = false;
        if (this.loading) {
          this.uploading.splice(this.uploading.indexOf(this.message.id), 1);
        }
      }
    },
    async uploadFile() {
      this.uploading.push(this.message.id);
      this.error = false;
      try {
        const data = new FormData();
        data.append("file", this.message.file);
        const fileUrl = await this.$axios.$post("/upload", data);
        this.message.fileUrl = fileUrl;
      } catch {
        this.error = true;
      }
      this.uploading.splice(this.uploading.indexOf(this.message.id), 1);
    },
    updateMessageContent(value) {
      this.message.content = stripHTML(value);
    }
  },
  watch: {
    fileUrl() {
      this.showPlayer = false;
      setTimeout(() => {
        this.showPlayer = true;
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
