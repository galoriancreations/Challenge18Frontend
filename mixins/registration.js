import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import countryOptions from "../assets/data/countries";
import languageOptions from "../assets/data/languages";
import _ from "lodash";

export default {
    components: { VuePhoneNumberInput },
    data() {
        return {
            formData: {
                username: "",
                phone: "",
                fullName: "",
                organization: "",
                country: "",
                memberName: "",
                memberRole: "",
                email: "",
                language: "English",
                accountType: "organization"
            },
            phoneInput: {
                value: null,
                isValid: false
            },
            availability: {
                username: null,
                phone: null
            },
            countryOptions,
            languageOptions,
            loading: false,
            error: null
        }
    },
    computed: {
        username() {
            return this.formData.username;
        },
        phone() {
            return this.formData.phone;
        }
    },
    methods: {
        updatePhoneNumber(data) {
            if (data.formattedNumber) {
                this.formData.phone = data.formattedNumber;
            }
            this.phoneInput.isValid = data.isValid;
            this.formData.country = data.countryCode;
        },
        checkAvailability(key, value, apiKey) {
            clearTimeout(this.timeout);
            if (!value.trim()) {
                this.availability[key] = null;
            } else {
                this.timeout = setTimeout(async () => {
                    this.availability[key] = "loading";
                    const { result } = await this.$axios.$post("/api", {
                        [apiKey]: value
                    });
                    this.availability[key] = result ? "available" : "taken";
                }, 500);
            }
        },
        validateData() {
            for (let key in this.availability) {
                if (this.availability[key] === "taken") {
                    this.error = `${_.capitalize(key)}
                  is already taken. Please try a different ${key}.`;
                    return false;
                }
            }
            if (!this.phoneInput.isValid) {
                this.error =
                    "The phone number you entered is invalid. Please enter a valid number.";
                return false;
            }
            this.error = null;
            return true;
        }
    },
    watch: {
        username(value) {
            this.checkAvailability("username", value, "checkUsername");
        },
        phone(value) {
            this.checkAvailability("phone", value, "checkPhone");
        }
    }
};