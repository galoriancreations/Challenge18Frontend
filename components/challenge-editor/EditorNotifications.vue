<template>
  <Notifications :items="items" />
</template>

<script>
import AutoSaveNote from "./AutoSaveNote";
import EditorModeNote from "./EditorModeNote";

export default {
  inject: ["autoSave"],
  data() {
    return {
      items: [
        {
          id: "editor-mode",
          component: EditorModeNote
        }
      ]
    };
  },
  computed: {
    showAutoSaveNote() {
      return !!this.autoSave.date || !!this.autoSave.error;
    }
  },
  watch: {
    showAutoSaveNote(value) {
      if (value) {
        this.items.push({
          id: "auto-save",
          component: AutoSaveNote,
          props: this.autoSave
        });
      }
    }
  },
  provide() {
    return {
      removeItem: id => {
        this.items = this.items.filter(item => item.id !== id);
      }
    };
  }
};
</script>
