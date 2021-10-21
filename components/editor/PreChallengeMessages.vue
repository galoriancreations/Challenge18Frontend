<template>
  <section class="editor__pre-messages" v-if="showPreMessages">
    <h2 class="editor__pre-messages-heading">
      Pre-challenge messages
    </h2>
    <p class="editor__pre-messages-subheading">
      {{ subheading }}
    </p>
    <div class="editor__content" :style="{ direction }">
      <div class="editor__pre-messages-tabs">
        <ActionButton
          v-if="data.preMessages.length < 5 && isTemplateEditable"
          type="add"
          color="white"
          @click="showModal = true"
        />
        <SideTabs v-if="days.length" v-model="selectedDay" :tabs="days" />
      </div>
      <TransitionGroup
        tag="div"
        class="editor__pre-messages-content"
        name="task"
      >
        <p v-if="!days.length" key="empty" class="editor__pre-messages-empty">
          Click the button to add a new message.
        </p>
        <div v-else :key="data.preMessages[dayIndex].id">
          <div class="task-form__top">
            <h3 class="editor__pre-day-title">
              {{ formTitle }}
            </h3>
            <IconButton
              v-if="isTemplateEditable"
              type="delete"
              @click="deleteMessage"
            />
          </div>
          <MessageForm
            :message="data.preMessages[dayIndex]"
            :deleteButton="false"
            textKey="text"
          />
        </div>
      </TransitionGroup>
    </div>
    <client-only>
      <MessageTypeModal :active="showModal" />
    </client-only>
    <SectionSeperator />
  </section>
</template>

<script>
import uniqid from "uniqid";
import { dayTranslations, rtlLanguages } from "../../assets/util/options";
import popupModal from "~/mixins/popup-modal";

export default {
  mixins: [popupModal],
  inject: ["data", "isTemplateEditable", "setConfirmModal"],
  data() {
    return {
      selectedDay: -1
    };
  },
  computed: {
    showPreMessages() {
      const hasContent = () => {
        for (let message of this.data.preMessages) {
          if (message.text.trim() || message.file) return true;
        }
        return false;
      };
      const isEmpty = !this.data.preMessages.length || !hasContent();
      return this.isTemplateEditable || !isEmpty;
    },
    days() {
      return this.data.preMessages.map((message, index) => {
        const day = index - this.data.preMessages.length;
        return {
          id: message.id,
          value: day,
          label: `${this.dayLabel} ${day}`
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
    }
  },
  methods: {
    addMessage(isAudio) {
      this.closeModal();
      this.data.preMessages.unshift({
        id: uniqid(),
        isAudio,
        text: "",
        file: null,
        time: "18:00:00"
      });
      this.selectedDay = this.days[0].value;
    },
    deleteMessage() {
      const message = this.data.preMessages[this.dayIndex];
      this.setConfirmModal(
        "Are you sure you want to delete this message? This action is irreversible.",
        () => {
          this.data.preMessages.splice(this.dayIndex, 1);
          if (this.days.length) {
            if (this.dayIndex < 0) {
              this.selectedDay = this.days[0].value;
            } else if (this.dayIndex >= this.days.length) {
              this.selectedDay = this.days[this.days.length - 1].value;
            }
          }
        },
        !message.text.trim() && !message.file
      );
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
}
</style>
