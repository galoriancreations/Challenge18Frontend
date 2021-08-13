<template>
  <div class="task-form">
    <div class="task-form__top">
      <h3 class="task-form__title">
        {{ `${taskLabel} ${taskIndex + 1}` }}
        <span v-if="task.isBonus">(bonus)</span>
      </h3>
      <div class="task-form__top-icons">
        <i
          :class="{
            'editor-action-button': true,
            fas: task.isBonus,
            far: !task.isBonus,
            'fa-star': true
          }"
          @click="toggleTaskAsBonus(taskIndex)"
        />
        <i
          class="fas fa-trash-alt editor-action-button"
          @click="deleteTask(taskIndex)"
        />
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
        :checked="modelValue === option.text"
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
        <span
          v-html="convertedOptions[dayIndex][taskIndex][optionIndex]"
          v-linkified
        />
        <div class="task-form__option-actions">
          <div class="task-form__option-actions-wrapper">
            <i
              class="fas fa-pen editor-action-button"
              @click="setEditedOption(task.id, option.id)"
            />
            <i
              class="fas fa-trash-alt editor-action-button"
              @click="deleteOption(taskIndex, optionIndex)"
            />
          </div>
        </div>
      </label>
      <form v-else @keydown="finishEditOnEnter">
        <textarea-autosize
          :value="option.text"
          @input="editOption($event, taskIndex, optionIndex)"
          class="task-form__option-edit"
          placeholder="Start typing here..."
          :rows="1"
        />
      </form>
    </div>
    <form @keydown="addOptionOnEnter($event, taskIndex)">
      <textarea-autosize
        :value="extraInput"
        @input="$emit('update:extraInput', $event)"
        class="task-form__extra"
        placeholder="Type and press Enter to add a new option..."
        :rows="1"
      />
    </form>
  </div>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    task: Object,
    taskIndex: Number,
    modelValue: String,
    extraInput: String
  },
  inject: [
    "getDayIndex",
    "getTaskLabel",
    "toggleTaskAsBonus",
    "deleteTask",
    "templateOnlyMode",
    "getEditedOption",
    "setEditedOption",
    "getConvertedOptions",
    "deleteOption",
    "editOption",
    "finishEditOnEnter",
    "addOptionOnEnter"
  ],
  computed: {
    dayIndex() {
      return this.getDayIndex();
    },
    taskLabel() {
      return this.getTaskLabel();
    },
    editedOption() {
      return this.getEditedOption();
    },
    convertedOptions() {
      return this.getConvertedOptions();
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
</style>
