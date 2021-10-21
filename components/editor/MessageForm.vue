<template>
  <div :class="classes">
    <div class="additional-message-form__top">
      <TaskTimeSelector />
      <div
        class="task-form__top-icons"
        v-if="deleteButton && isTemplateEditable"
      >
        <IconButton type="delete" @click="$emit('delete')" />
      </div>
    </div>
    <div class="additional-message-form__content">
      <div v-if="message.isAudio" class="additional-message-form__field">
        <label class="task-form__selector-label">
          Audio recording
        </label>
        <client-only>
          <div
            class="additional-message-form__audio-wrapper"
            v-if="message.file"
          >
            <div class="additional-message-form__audio" v-if="showFile">
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
            v-model="message.file"
            accept="audio/*"
            :placeholder="filePlaceholder"
          />
        </v-app>
      </div>
      <div v-else class="additional-message-form__field">
        <label class="task-form__selector-label">
          Message
        </label>
        <textarea-autosize
          v-if="isTemplateEditable"
          :value="message[textKey]"
          @input="updateMessageContent"
          class="task-form__extra"
          placeholder="Type your message here..."
          :rows="2"
          :max-height="200"
        />
        <div v-else class="additional-message-form__text">
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
    message: Object,
    deleteButton: {
      type: Boolean,
      default: true
    },
    textKey: {
      type: String,
      default: "content"
    }
  },
  data() {
    return {
      showFile: true
    };
  },
  emits: ["delete"],
  inject: ["isTemplateEditable"],
  computed: {
    classes() {
      return [
        "task-form",
        "additional-message-form",
        { "additional-message-form--readonly": !this.isTemplateEditable }
      ];
    },
    messageText() {
      return convertTaskText(stripHTML(this.message[this.textKey]))
        .trim()
        .split("\n");
    },
    fileUrl() {
      const { file } = this.message;
      if (process.server || !file) return;
      return typeof file === "string" ? file : URL.createObjectURL(file);
    },
    filePlaceholder() {
      return this.message.file
        ? "Replace audio file..."
        : "Pick an audio file...";
    }
  },
  methods: {
    updateMessageContent(value) {
      this.message[this.textKey] = stripHTML(value);
    }
  },
  watch: {
    fileUrl() {
      this.showFile = false;
      setTimeout(() => {
        this.showFile = true;
      });
    }
  },
  provide() {
    return {
      task: this.message
    };
  },
  created() {
    if (this.message.isAudio) {
      this.message.file = null;
    }
  }
};
</script>

<style lang="scss">
.additional-message-form {
  background-color: #fff;

  &__top {
    margin-bottom: 1.75rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .task-form__time-selector {
      margin: auto;

      @include respond(mobile) {
        &:not(:last-child) {
          margin: 0;
        }
      }
    }
  }

  .task-form__top-icons {
    grid-template-columns: 1fr;
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
}
</style>
