<template>
  <div class="task-form">
    <div class="task-form__top">
      <h3 class="task-form__title">
        {{ taskTitle }}
      </h3>
      <div class="task-form__top-icons">
        <IconButton
          type="mark"
          :filled="task.isBonus"
          @click="toggleTaskAsBonus(taskIndex)"
        />
        <IconButton type="delete" @click="deleteTask(taskIndex)" />
      </div>
    </div>
    <div
      v-for="(option, optionIndex) in task.options"
      :key="option.id"
      class="task-form__option"
    >
      <input
        v-if="!templateOnlyMode"
        type="radio"
        :id="option.id"
        class="radio-input"
        :value="option.text"
        :checked="selectedOption === option.text"
        @change="$emit('change', option.text)"
      />
      <i v-if="templateOnlyMode" class="task-form__option-icon fas fa-gem" />
      <label v-else :for="option.id" class="radio-label">
        <span class="radio-button" />
      </label>
      <label
        v-if="editedOption !== `${task.id}-${option.id}`"
        :for="option.id"
        class="task-form__text"
      >
        <span v-html="convertedOptions[optionIndex]" v-linkified />
        <div class="task-form__option-actions">
          <div class="task-form__option-actions-wrapper">
            <IconButton
              type="edit"
              @click="setEditedOption(task.id, option.id)"
              class="task-form__option-button"
            />
            <IconButton
              type="delete"
              @click="deleteOption(taskIndex, optionIndex)"
              class="task-form__option-button"
            />
          </div>
        </div>
      </label>
      <form
        v-else
        @keydown.enter="finishEditOption"
        @keydown.esc="finishEditOption"
      >
        <textarea-autosize
          :value="option.text"
          @input="editOption($event, taskIndex, optionIndex)"
          class="task-form__option-edit"
          :id="`edit-${option.id}`"
          placeholder="Start typing here..."
          :rows="1"
        />
      </form>
    </div>
    <form @keydown.enter="addOption(taskIndex)">
      <textarea-autosize
        :value="extraInput"
        @input="updateExtraInput"
        class="task-form__extra"
        :placeholder="extraInputPlaceholder"
        :rows="1"
      />
    </form>
  </div>
</template>

<script>
import { convertTaskText, stripHTML } from "../../assets/util/functions";

export default {
  model: {
    prop: "selectedOption",
    event: "change"
  },
  props: {
    task: Object,
    taskIndex: Number,
    selectedOption: String,
    extraInput: String
  },
  inject: [
    "getTaskLabel",
    "toggleTaskAsBonus",
    "deleteTask",
    "templateOnlyMode",
    "getEditedOption",
    "setEditedOption",
    "deleteOption",
    "editOption",
    "finishEditOption",
    "addOption"
  ],
  computed: {
    taskLabel() {
      return this.getTaskLabel();
    },
    editedOption() {
      return this.getEditedOption();
    },
    convertedOptions() {
      return this.task.options.map(option => convertTaskText(option.text));
    },
    taskTitle() {
      let title = `${this.taskLabel} ${this.taskIndex + 1}`;
      if (this.task.isBonus) {
        title += " (bonus)";
      }
      return title;
    },
    editOptionInput() {
      if (!this.editedOption) return;
      const [taskId, optionId] = this.editedOption.split("-");
      return taskId === this.task.id
        ? this.$el.querySelector(`#edit-${optionId}`)
        : null;
    },
    extraInputPlaceholder() {
      return process.client
        ? window.innerWidth > 600
          ? "Type and press Enter to add a new option..."
          : "Enter new option here..."
        : null;
    }
  },
  methods: {
    updateExtraInput(value) {
      this.$emit("update:extraInput", stripHTML(value));
    }
  },
  watch: {
    editedOption(value) {
      if (value) {
        setTimeout(() => this.editOptionInput?.focus(), 10);
      }
    }
  }
};
</script>

<style lang="scss">
.task-form {
  border-radius: 1rem;
  box-shadow: $boxshadow2;
  padding: 3.5rem 3rem;
  width: 100%;
  overflow: hidden;

  @include respond(mobile) {
    padding: 3rem 2rem;
  }

  &:not(:last-child) {
    margin-bottom: 4rem;

    @include respond(mobile) {
      margin-bottom: 3rem;
    }
  }

  &__top {
    margin-bottom: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__top-icons {
    transition: all 0.5s;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, min-content);

    @media (hover: hover) {
      opacity: 0;
      visibility: hidden;
    }
  }

  &:hover &__top-icons {
    opacity: 1;
    visibility: visible;
  }

  &__title {
    color: $color-blue-2;
    font-size: 2.8rem;

    @include respond(mobile) {
      font-size: 2.2rem;
    }
  }

  &__option {
    line-height: 1.7;
    display: grid;
    grid-template-columns: 2.8rem 1fr;
    gap: 1.5rem;
    align-items: center;

    @include respond(mobile) {
      line-height: 1.6;
      grid-template-columns: 2.6rem 1fr;
      gap: 1.2rem;
    }

    &:not(:last-child) {
      margin-bottom: 2.5rem;

      @media (hover: hover) {
        margin-bottom: 1.5rem;
      }
    }
  }

  &__option-icon {
    color: $color-azure;
    font-size: 2.4rem;
  }

  &__text {
    word-wrap: break-word;
    flex: 1;
    position: relative;

    @include respond(mobile) {
      font-size: 1.45rem;
    }

    span {
      display: block;
    }

    a {
      color: $color-blue-2;
      transition: color 0.5s;

      &:hover {
        color: $color-gold-3;
      }
    }
  }

  &__option-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color-azure-light, 0.6);
    border-radius: 0.4rem;
    padding: 0.5rem;
    margin-top: 0.75rem;
    transition: all 0.5s;

    @media (hover: hover) {
      position: absolute;
      width: 10rem;
      height: 100%;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
      opacity: 0;
      margin-top: 0;
      visibility: hidden;
    }
  }

  &__text:hover &__option-actions {
    opacity: 1;
    visibility: visible;
  }

  &__option-actions-wrapper {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    justify-content: center;
    gap: 2rem;
  }

  &__option-edit {
    display: block;
    width: 100%;
    font: inherit;
    outline: none;
    padding: 0.8rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.5rem;
    transition: all 0.5s;

    &:focus {
      border-color: $color-azure;
    }
  }

  &__extra {
    font: inherit;
    outline: none;
    width: 100%;
    padding: 1rem 2rem;
    border: 0.2rem solid #ccc;
    border-radius: 100px;
    margin-top: 1rem;
    transition: all 0.5s;

    @include respond(tablet-sm) {
      margin-top: 0.5rem;
    }

    &:focus {
      border-color: $color-azure;
    }
  }
}

.challenge-editor__layout[style="direction: rtl;"] {
  .task-form__option-actions {
    right: initial;
    left: 0;
  }
}
</style>
