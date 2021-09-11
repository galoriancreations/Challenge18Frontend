<template>
  <div class="task-form__emoji-selector">
    <label class="task-form__selector-label">Emoji</label>
    <button @click="showPicker = !showPicker">
      <span v-if="!task.emoji" class="task-form__no-emoji">
        Click to select
      </span>
      <span v-else class="task-form__selected-emoji">
        {{ task.emoji }}
      </span>
    </button>
    <div :class="wrapperClasses">
      <VEmojiPicker @select="selectEmoji" />
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";

export default {
  components: { VEmojiPicker },
  inject: ["task"],
  data() {
    return {
      showPicker: false
    };
  },
  computed: {
    wrapperClasses() {
      return {
        "task-form__emoji-wrapper": true,
        "task-form__emoji-wrapper--active": this.showPicker
      };
    }
  },
  methods: {
    selectEmoji(emoji) {
      this.task.emoji = emoji.data;
      this.showPicker = false;
    }
  }
};
</script>

<style lang="scss">
.task-form {
  &__emoji-selector {
    position: relative;
    text-align: center;

    .grid-emojis {
      row-gap: 1rem;
    }

    .emoji-picker {
      box-shadow: $boxshadow2;
    }

    .emoji {
      overflow: visible !important;
    }
  }

  &__no-emoji {
    font-size: 1.4rem;

    @include respond(mobile) {
      font-size: 1.3rem;
    }
  }

  &__selected-emoji {
    font-size: 2rem;
  }

  &__emoji-wrapper {
    position: absolute;
    top: calc(100% + 1rem);
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    width: fit-content;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
    z-index: 5;

    &--active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
