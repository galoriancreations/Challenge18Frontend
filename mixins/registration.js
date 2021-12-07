import VuePhoneNumberInput from "vue-phone-number-input";
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
    };
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
      this.formData.phone = data.formattedNumber;
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
      try {
        for (let key in this.availability) {
          if (this.availability[key] === "taken") {
            throw `${_.capitalize(key)} 
                is already taken. Please try a different ${key}.`;
          }
        }
        if (!this.phoneInput.isValid) {
          throw "The phone number you entered is invalid. Please enter a valid number.";
        }
        this.error = null;
        return true;
      } catch (error) {
        this.error = error;
        return false;
      }
    }
  },
  watch: {
    formData: {
      handler() {
        if (this.error) {
          this.validateData();
        }
      },
      deep: true
    },
    availability: {
      handler() {
        if (this.error) {
          this.validateData();
        }
      },
      deep: true
    },
    username(value) {
      this.checkAvailability("username", value, "checkUsername");
    },
    phone(value) {
      if (this.phoneInput.isValid) {
        this.checkAvailability("phone", value, "checkPhone");
      } else {
        this.availability.phone = null;
        clearTimeout(this.timeout);
      }
    }
  }
};
