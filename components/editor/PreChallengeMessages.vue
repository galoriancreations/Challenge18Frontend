<template>
  <section class="editor__pre-messages" v-if="showPreMessages">
    <TransitionGroup
      tag="div"
      class="editor__pre-messages-wrapper"
      :name="transition"
    >
      <div class="editor__pre-messages-container" key="content">
        <h2 class="editor__pre-messages-heading">
          Pre-challenge messages
        </h2>
        <p class="editor__pre-messages-subheading">
          {{ subheading }}
        </p>
        <div class="editor__content" :style="{ direction }">
          <div class="editor__pre-messages-tabs">
            <ActionButton
              v-if="data.preDays.length < 5 && isTemplateEditable"
              type="add"
              color="white"
              @click="addDay"
            />
            <SideTabs v-if="days.length" v-model="selectedDay" :tabs="days" />
          </div>
          <div class="editor__pre-messages-content">
            <p v-if="!days.length" class="editor__pre-messages-empty">
              Click the button to add a new message.
            </p>
            <div v-else>
              <div class="task-form__top">
                <h3 class="editor__pre-day-title">
                  {{ formTitle }}
                </h3>
                <IconButton
                  v-if="isTemplateEditable"
                  type="delete"
                  @click="deleteDay"
                />
              </div>
              <TransitionGroup
                tag="div"
                class="editor__pre-messages-list"
                :name="transition"
              >
                <MessageForm
                  v-for="(message, index) in data.preDays[dayIndex].messages"
                  :key="message.id"
                  :message="message"
                  @delete="deleteMessage(index)"
                />
                <div
                  v-if="isTemplateEditable"
                  key="add"
                  class="editor__add-message"
                >
                  <ActionButton
                    type="add"
                    color="white"
                    @click="showModal = true"
                  />
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
      <div class="section-seperator" key="seperator" />
    </TransitionGroup>
    <client-only>
      <MessageTypeModal :active="showModal" />
    </client-only>
  </section>
</template>

<script>
import uniqid from "uniqid";
import { newMessage } from "~/assets/util/functions";
import { dayTranslations, rtlLanguages } from "~/assets/util/options";
import popupModal from "~/mixins/popup-modal";

export default {
  mixins: [popupModal],
  inject: [
    "data",
    "isTemplateEditable",
    "setConfirmModal",
    "getTransition",
    "setTransition"
  ],
  data() {
    return {
      selectedDay: -1
    };
  },
  computed: {
    showPreMessages() {
      const hasContent = () => {
        for (let day of this.data.preDays) {
          for (let message of day.messages) {
            if (message.content.trim() || message.file) return true;
          }
        }
        return false;
      };
      const isEmpty = !this.data.preDays.length || !hasContent();
      return this.isTemplateEditable || !isEmpty;
    },
    transition() {
      return this.getTransition();
    },
    days() {
      return this.data.preDays.map((day, index) => {
        const dayNum = index - this.data.preDays.length;
        return {
          id: day.id,
          value: dayNum,
          label: `${this.dayLabel} ${dayNum}`
        };
      });
    },
    dayLabel() {
      return dayTranslations[this.data.language] || "Day";
    },
    direction() {
      return rtlLanguages.includes(this.data.language) ? "rtl" : null;
    },
    subheading() {
      let text =
        "Messages that would be sent to participants on the days before the challenge.";
      if (this.isTemplateEditable) {
        text += " You can send messages up to 5 days before the challenge.";
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
    }
  },
  methods: {
    addDay() {
      this.setTransition("task");
      this.data.preDays.unshift({
        id: uniqid(),
        messages: [newMessage()]
      });
      this.selectedDay = this.days[0].value;
    },
    deleteDay() {
      this.setConfirmModal(
        "Are you sure you want to delete this day and all its messages? This action is irreversible.",
        () => {
          this.setTransition("task");
          this.data.preDays.splice(this.dayIndex, 1);
          if (this.days.length) {
            if (this.dayIndex < 0) {
              this.selectedDay = this.days[0].value;
            } else if (this.dayIndex >= this.days.length) {
              this.selectedDay = this.days[this.days.length - 1].value;
            }
          }
        }
      );
    },
    addMessage(isAudio) {
      this.closeModal();
      this.setTransition("task");
      this.data.preDays[this.dayIndex].messages.push(newMessage(isAudio));
    },
    deleteMessage(messageIndex) {
      const { messages } = this.data.preDays[this.dayIndex];
      const message = messages[messageIndex];
      this.setConfirmModal(
        "Are you sure you want to delete this message? This action is irreversible.",
        () => {
          this.setTransition("task-delete");
          messages.splice(messageIndex, 1);
        },
        !message.content.trim() && !message.file
      );
    }
  },
  watch: {
    selectedDay() {
      this.setTransition("task");
    }
  },
  provide() {
    return {
      addMessage: this.addMessage
    };
  }
};
</script>

<style lang="scss">
.editor {
  &__pre-messages {
    .editor__content {
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

  &__pre-day-title {
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

  &__add-message,
  .section-seperator {
    position: relative;
    z-index: 5;
  }
}
</style>
