export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    }
  },
  provide() {
    return {
      openModal: () => {
        this.showModal = true;
      },
      closeModal: this.closeModal
    };
  }
};
