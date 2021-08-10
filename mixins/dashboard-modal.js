export default {
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        closeOnEscPress(event) {
            if (event.key === "Escape") {
                this.showModal = false;
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
            closeModal: () => {
                this.showModal = false;
            }
        }
    }
};