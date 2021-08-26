export default {
    data() {
        return {
            showConfirmModal: false,
            confirmText: "",
            confirmAction: () => { }
        };
    },
    methods: {
        setConfirmModal(text, action, preCondition) {
            if (preCondition) {
                return action();
            }
            this.showConfirmModal = true;
            this.confirmText = text;
            this.confirmAction = action;
        },
        closeModal() {
            this.showConfirmModal = false;
            if (this.onCloseModal) {
                this.onCloseModal();
            }
        },
        keydownHandler(event) {
            if (event.key === "Enter") {
                if (!event.target.classList.contains("header__nav-link")) {
                    event.preventDefault();
                }
                if (this.showConfirmModal) {
                    this.confirmAction();
                }
                this.closeModal();
            } else if (event.key === "Escape") {
                this.closeModal();
            }
        }
    },
    mounted() {
        document.addEventListener("keydown", this.keydownHandler);
    },
    beforeDestroy() {
        document.removeEventListener("keydown", this.keydownHandler);
    },
    provide() {
        return {
            setConfirmModal: this.setConfirmModal,
            closeModal: this.closeModal
        };
    }
};