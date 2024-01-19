<template>
  <div class="editor__main">
    <TransitionGroup tag="div" class="editor__wrapper" :name="transition">
      <div key="content" class="editor__content" :style="{ direction }">
        <section class="editor__tabs">
          <SideTabs v-model="selectedDay" :tabs="days" />
          <div class="editor__flex-row">
            <ActionButton
              v-if="isTemplateEditable"
              type="add"
              color="white"
              @click="addDay"
            />
            <ActionButton
              v-if="isTemplateEditable"
              color="white"
              @click="addDayWithAi"
            >
            <img src="@/assets/images/microchip-ai.svg" alt="generate day with ai">
          </ActionButton>
          </div>
        </section>
        <section class="editor__day" ref="container">
          <DayTitleField
            :key="`title-${dayData.id}`"
            v-model.trim="dayData.title"
            :label="`${dayLabel} ${selectedDay}`"
          />
          <DayActionButtons
            v-if="showActionButtons"
            :key="`actions-${dayData.id}`"
          />
          <TransitionGroup
            tag="div"
            class="editor__day-content"
            :name="transition"
          >
            <div
              v-if="!templateOnlyMode"
              :key="`date-${dayData.id}`"
              class="editor__subsection"
            >
              <!-- <div class="editor__date">
                <div />
                <span>{{ date }}</span>
                <div />
              </div> -->
              <div>
                <EachDayDate v-model="dayData.date" />
              </div>
            </div>
            <div
              v-if="dayData.image || isTemplateEditable"
              :key="`image-${dayData.id}`"
              class="editor__subsection"
            >
              <DayImageField v-model="dayData.image" />
            </div>
            <div
              v-if="dayData.time || isTemplateEditable"
              :key="`time-${dayData.id}`"
              class="editor__subsection"
            >
              <StartTimeField v-model="dayData.time" />
            </div>
            <div
              v-if="dayData.introduction || isTemplateEditable"
              :key="`introduction-${dayData.id}`"
              class="editor__subsection"
            >
              <DayIntroductionField v-model="dayData.introduction" />
            </div>
            <div
              v-if="showTasks"
              :key="`tasks-${dayData.id}`"
              class="editor__subsection"
            >
              <h3 class="editor__subsection-heading">
                Day Tasks
              </h3>
              <EditorTaskList :tasks="dayData.tasks" />
            </div>
            <div
              v-if="showAdditionalMessages"
              :key="`messages-${dayData.id}`"
              class="editor__subsection"
            >
              <h3 class="editor__subsection-heading">
                Day Messages
              </h3>
              <AdditionalMessagesList
                :messages="dayData.messages"
                @add-click="showModal = true"
              />
            </div>
          </TransitionGroup>
        </section>
      </div>
      <div key="submit" class="editor__submit-wrapper">
        <BaseButton
          variant="blue"
          @click="submitHandler"
          :disabled="submit.loading || uploading.length > 0"
        >
          {{ submitButtonText }}
        </BaseButton>

        <!-- button save into drafts -->
        <!-- <BaseButton
        variant="blue"
        @click="saveToDraf"
          :disabled="submit.loading || uploading.length > 0"
        >
        {{ saveToDraftsText }} -->
        <!-- </BaseButton> -->
        <!-- button save into drafts // end -->

        <BaseSpinner v-if="submit.loading" />
        <ErrorMessage v-else-if="submit.error" :error="submit.error" />
      </div>
    </TransitionGroup>
    <client-only>
      <MessageTypeModal key="modal" :active="showModal" />
    </client-only>
  </div>
</template>

<script>
import { newMessage, newTask } from "~/assets/util/functions";
import { rtlLanguages, dayTranslations } from "~/assets/util/options";

import moment from "moment";
import uniqid from "uniqid";
import popupModal from "~/mixins/popup-modal";

export default {
  mixins: [popupModal],
  inject: [
    "data",
    "templateOnlyMode",
    "editedChallengeId",
    "isTemplateEditable",
    "setConfirmModal",
    "uploading",
    "submit",
    "submitHandler",
    "getTransition",
    "setTransition"
  ],
  data() {
    return {
      selectedDay: 1
    };
  },
  computed: {
    transition() {
      return this.getTransition();
    },
    days() {
      return this.data.days.map((day, index) => ({
        id: day.id,
        value: index + 1,
        label: `${this.dayLabel} ${index + 1}`
      }));
    },
    dayIndex() {
      return this.selectedDay - 1;
    },
    dayLabel() {
      return dayTranslations[this.data.language] || "Day";
    },
    direction() {
      return rtlLanguages.includes(this.data.language) ? "rtl" : null;
    },
    showActionButtons() {
      return this.isTemplateEditable && this.data.days.length > 1;
    },
    dayData() {
      return this.data.days[this.dayIndex];
    },
    // date() {
    //   const date = moment(this.data.date);
    //   date.add(this.dayIndex * this.data.dayMargin, "days");
    //   return date.format("LL");
    // },
    showTasks() {
      return this.isTemplateEditable || this.dayData.tasks.length > 0;
    },
    showAdditionalMessages() {
      const { messages } = this.dayData;
      const hasContent = () => {
        for (let message of messages) {
          if (message.content.trim() || message.file) return true;
        }
        return false;
      };
      const isEmpty = !messages.length || !hasContent();
      return this.isTemplateEditable || !isEmpty;
    },
    submitButtonText() {
      return this.uploading.length
        ? "Uploading files"
        : this.templateOnlyMode
        ? "Finish editing"
        : this.editedChallengeId
        ? "Update challenge"
        : "Publish challenge";
    }
    // <!-- button save to drafts -->
    // saveToDraftsText(){
    //   return this.uploading.length
    //     ? "Uploading files"
    //     : this.templateOnlyMode
    //     ? "save to drafts"
    //     : this.editedChallengeId

    // }
    //}
  },
  methods: {
    addDay() {
      this.data.days.push({
        id: uniqid(),
        title: "",
        time: "18:00:00",
        tasks: [newTask(0)],
        messages: [newMessage()]
      });
      this.selectedDay = this.data.days.length;
      this.setTransition("task");
    },
    async addDayWithAi() {
      this.submit.loading = true;
      // get selected template by selectedTemplate cookie
      const selectedTemplate = this.$cookies.get('selectedTemplate');
      // create axios request to backend to generate day with ai
      const { day } = await this.$axios.$post("/xapi", {
        generateDayWithAi: {
          templateId: selectedTemplate,
        }
      });
      // get the day data from the response
      const { title, time, tasks, messages, introduction } = day;
      // map tasks to new tasks with new ids
      const newTasks = tasks.map(task => {
        return {
          ...task,
          id: uniqid(),
        };
      });
      // map messages to new messages with new ids
      const newMessages = messages.map(message => {
        return {
          ...message,
          id: uniqid(),
        };
      });
      // add the day to the challenge
      this.data.days.push({ id: uniqid(), title, time, tasks: newTasks, messages: newMessages, introduction });
      this.selectedDay = this.data.days.length;
      // send transition to task
      this.setTransition("task");

      this.submit.loading = false;
    },
    deleteDay() {
      this.setConfirmModal(
        "Are you sure you want to delete this day and all its tasks? This action is irreversible.",
        () => {
          this.setTransition("task");
          this.data.days.splice(this.dayIndex, 1);
          if (this.selectedDay > this.data.days.length) {
            this.selectedDay--;
          }
        }
      );
    },
    addMessage(isAudio) {
      this.closeModal();
      this.setTransition("task");
      this.dayData.messages.push(newMessage(isAudio));
    },
    // <!-- button save to drafts // function -->
    saveToDraf() {
      console.log("save to drafts");
    }
    // ===================================================
  },
  watch: {
    selectedDay() {
      this.setTransition("task");
      const optionsTop = this.$refs.container.getBoundingClientRect().top;
      window.scrollTo(0, window.scrollY + optionsTop - 150);
    }
  },
  provide() {
    return {
      getDayData: () => this.dayData,
      deleteDay: this.deleteDay,
      addMessage: this.addMessage
    };
  }
};
</script>

<style lang="scss">
.editor {
  &__content {
    display: grid;
    justify-content: space-between;
    align-items: start;
    grid-template-columns: 15% 72.5%;
    position: relative;

    @include respond(tablet) {
      grid-template-columns: 100%;
      gap: 9rem;
    }

    @include respond(mobile) {
      gap: 7rem;
    }
  }

  &__tabs {
    .side-tabs {
      margin-bottom: 3rem;
    }
  }

  &__flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    @include respond(mobile) {
      margin-bottom: 2rem;
    }
  }
  
  &__day {
    position: relative;
  }

  &__day-title + &__day-content {
    padding-top: 2rem;
  }

  &__subsection {
    position: relative;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 9rem;

      @include respond(mobile) {
        margin-bottom: 7rem;
      }
    }
  }

  &__date {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: -1.5rem;

    @include respond(mobile) {
      font-size: 1.75rem;
    }

    span {
      margin: 0 4rem;
      display: block;
      width: fit-content;
      max-width: 100%;

      @include respond(mobile) {
        margin: 0 2rem;
      }
    }

    div {
      height: 0.15rem;
      background-color: #ccc;
      max-width: 15rem;
      flex: 1;
    }
  }

  &__subsection-heading {
    text-align: center;
    font-weight: 600;
    color: $color-blue-2;
    font-size: 2.7rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.1rem;
      margin-bottom: 2.5rem;
    }
  }

  &__submit-wrapper {
    margin-top: 9rem;
    position: relative;
    z-index: 5;

    @include respond(mobile) {
      margin-top: 6rem;
    }

    .button {
      font-weight: 600;
      width: 100%;
      max-width: 35rem;
    }
  }
}

.task-leave-to,
.task-delete-leave-to {
  transform: translateX(100vw);

  @include respond(mobile) {
    transform: translateX(150vw);
  }
}

[style="direction: rtl;"] {
  .task-leave-to,
  .task-delete-leave-to {
    transform: translateX(-100vw) !important;

    @include respond(mobile) {
      transform: translateX(-150vw) !important;
    }
  }
}

.task-leave-active,
.task-delete-leave-active {
  transition: transform 0.5s;
  position: absolute;
}

.task-enter-active {
  animation: zoomIn 0.5s;
}

.task-move:not(.task-leave-active) {
  transition: transform 0.375s;
}

.task-delete-move:not(.task-delete-leave-active) {
  transition: transform 0.4s 0.4s;
}
</style>
