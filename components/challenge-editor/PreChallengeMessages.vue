<template>
  <section class="challenge-editor__pre-messages">
    <h2 class="challenge-editor__pre-messages-heading">
      Pre-challenge messages
    </h2>
    <p class="challenge-editor__pre-messages-subheading">
      {{ subheading }}
    </p>
    <div class="challenge-editor__content" :style="{ direction }">
      <div class="challenge-editor__pre-messages-tabs">
        <ActionButton
          v-if="preMessages.length < 5 && isTemplateEditable"
          type="add"
          color="white"
          @click="addMessage"
        />
        <SideTabs v-if="days.length" v-model="selectedDay" :tabs="days" />
      </div>
      <TransitionGroup
        class="challenge-editor__pre-messages-content"
        name="task"
      >
        <p
          v-if="!days.length"
          key="empty"
          class="challenge-editor__pre-messages-empty"
        >
          Click the button to add a new message.
        </p>
        <div v-else :key="preMessages[dayIndex].id">
          <div class="task-form__top">
            <h3 class="pre-message-form__title">
              {{ formTitle }}
            </h3>
            <IconButton
              v-if="isTemplateEditable"
              type="delete"
              @click="deleteMessage"
            />
          </div>
          <div class="task-form pre-message-form">
            <TaskTimeSelector :item="preMessages[dayIndex]" />
            <textarea-autosize
              v-if="isTemplateEditable"
              v-model="preMessages[dayIndex].text"
              class="task-form__extra"
              placeholder="Type your message here..."
              :rows="2"
              :max-height="200"
            />
            <div
              v-else
              class="pre-message-form__text"
              :id="`text-${preMessages[dayIndex].id}`"
            >
              <div>
                <div class="pre-message-form__text-wrapper">
                  <p v-for="paragraph in messageText" :key="paragraph">
                    {{ paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script>
import uniqid from "uniqid";
import { dayTranslations, rtlLanguages } from "../../assets/util/options";
import Scrollbar from "smooth-scrollbar";

export default {
  inject: ["preMessages", "getLanguage", "isTemplateEditable"],
  data() {
    return {
      selectedDay: -1
    };
  },
  computed: {
    days() {
      return this.preMessages.map((message, index) => {
        const day = index - this.preMessages.length;
        return {
          id: message.id,
          value: day,
          label: `${this.dayLabel} ${day}`
        };
      });
    },
    language() {
      return this.getLanguage();
    },
    dayLabel() {
      return dayTranslations[this.language] || "Day";
    },
    direction() {
      return rtlLanguages.includes(this.language) ? "rtl" : null;
    },
    subheading() {
      let text =
        "Messages that would be sent to participants on the days before the challenge, one message every day.";
      if (this.isTemplateEditable) {
        text += " You can add up to 5 pre-challenge messages.";
      }
      return text;
    },
    formTitle() {
      const dayCount = -this.selectedDay;
      return `${dayCount} ${
        dayCount > 1 ? "days" : "day"
      } before the challenge`;
    },
    dayIndex() {
      return this.days.findIndex(day => day.value === this.selectedDay);
    },
    messageText() {
      return this.preMessages[this.dayIndex].text.split("\n");
    }
  },
  methods: {
    addMessage() {
      this.preMessages.unshift({
        id: uniqid(),
        text: "",
        time: "18:00:00"
      });
      this.selectedDay = this.days[0].value;
    },
    deleteMessage() {
      this.preMessages.splice(this.dayIndex, 1);
      if (this.days.length) {
        if (this.dayIndex < 0) {
          this.selectedDay = this.days[0].value;
        } else if (this.dayIndex >= this.days.length) {
          this.selectedDay = this.days[this.days.length - 1].value;
        }
      }
    },
    initScrollbar() {
      if (!this.isTemplateEditable) {
        Scrollbar.init(
          this.$el.querySelector(`#text-${this.preMessages[this.dayIndex].id}`),
          { alwaysShowTracks: true }
        );
      }
    }
  },
  mounted() {
    setTimeout(this.initScrollbar, 10);
  },
  watch: {
    selectedDay() {
      setTimeout(this.initScrollbar, 10);
    }
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__pre-messages {
    .challenge-editor__content {
      @include respond(tablet) {
        gap: 7rem;
      }

      @include respond(mobile) {
        gap: 5rem;
      }
    }
  }

  &__pre-messages-heading {
    font-size: 2.7rem;
    color: $color-blue-2;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2.5rem;

    @include respond(mobile) {
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }
  }

  &__pre-messages-subheading {
    text-align: center;
    max-width: 70rem;
    margin: auto;
    margin-bottom: 7rem;

    @include respond(mobile) {
      margin-bottom: 4.5rem;
    }
  }

  &__pre-messages-tabs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;

    .side-tabs {
      margin-bottom: 0 !important;
    }
  }

  &__pre-messages-empty {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;

    @include respond(mobile) {
      font-size: 1.4rem;
    }
  }
}

.pre-message-form {
  &__title {
    color: $color-blue-2;
    font-size: 1.95rem;
    margin-right: 2rem;

    @include respond(mobile) {
      font-size: 1.75rem;
    }

    &:last-child {
      margin: auto;
    }
  }

  .task-form__time-selector {
    margin-bottom: 2rem;
  }

  textarea {
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    line-height: 1.6;
  }

  &__text {
    border: 0.2rem solid #ccc;
    border-radius: 0.8rem;
    max-height: 30rem;
  }

  &__text-wrapper {
    padding: 1.5rem 2rem;

    p {
      font-size: inherit;
      line-height: 1.7;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
