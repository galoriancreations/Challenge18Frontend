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
      closeModal: this.closeModal
    };
  }
};
