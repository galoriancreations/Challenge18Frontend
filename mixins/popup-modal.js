export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    closeOnEscPress(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.closeOnEscPress);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.closeOnEscPress);
  },
  provide() {
    return {
      closeModal: this.closeModal
    };
  }
};
