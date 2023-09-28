<template>
  <form class="form" @submit.prevent="submitHandler">
    <AccountTypeSelector v-model="formData.accountType" />
    <div class="form__field">
      <label for="username" class="form__label">
        Username (used for login)
        <CheckIcon :status="availability.username" />
      </label>
      <input
        v-model="formData.username"
        id="username"
        required
        class="form__input"
        placeholder="Username"
      />
    </div>
    <div class="form__field">
      <label for="phone" class="form__label">
        Phone number (used for login)
        <CheckIcon :status="availability.phone" />
      </label>
      <VuePhoneNumberInput
        class="phone-number-input"
        id="phone"
        v-model="phoneInput.value"
        @update="updatePhoneNumber"
        color="#007bff"
        :border-radius="8"
        :show-code-on-list="true"
        :no-flags="true"
      />
    </div>
    <div class="form__field" v-if="isOrganization">
      <label for="organization" class="form__label">
        Organization/school name
      </label>
      <input
        v-model="formData.organization"
        id="organization"
        required
        class="form__input"
        placeholder="Organization/school name"
      />
    </div>
    <div class="form__field" v-if="!isOrganization">
      <label for="fullName" class="form__label">
        Full name
      </label>
      <input
        v-model="formData.fullName"
        id="fullName"
        class="form__input"
        placeholder="Your full name"
      />
    </div>
    <div class="form__field">
      <label for="country" class="form__label">
        Country
      </label>
      <VueSelect
        v-model="formData.country"
        :options="countryOptions"
        :reduce="option => option.code"
        label="name"
        placeholder="Country"
        class="language-selector"
      />
    </div>
    <div class="form__field" v-if="isOrganization">
      <label for="memberName" class="form__label">
        Lead staff member's name
      </label>
      <input
        v-model="formData.memberName"
        id="memberName"
        class="form__input"
        placeholder="Lead staff member's name"
      />
    </div>
    <div class="form__field" v-if="isOrganization">
      <label for="memberRole" class="form__label">
        Lead staff member's role
      </label>
      <input
        v-model="formData.memberRole"
        id="memberRole"
        class="form__input"
        placeholder="Lead staff member's role"
      />
    </div>
    <div class="form__field">
      <label for="email" class="form__label">
        Email address
      </label>
      <input
        v-model="formData.email"
        id="email"
        type="email"
        class="form__input"
        placeholder="Your email address"
      />
    </div>
    <div class="form__field">
      <label for="language" class="form__label">
        Challenge language
      </label>
      <VueSelect
        v-model="formData.language"
        :options="languageOptions"
        :reduce="option => option.name"
        class="language-selector"
      />
    </div>

    <!-------------- Test for Image -------------------->
    <!-- The accept attribute specifies a filter for what file types the user can
    pick from the file input dialog box. -->
    <div class="form__field">
      <input
        type="file"
        accept="image/*"
        @change="handleImageUpload"
        id="image"
        class="form__input"
      />
      <img :src="prewiewFilePath" />
    </div>
    <!------------------ end test ---------------------->

    <div
      class="form__field form__confirm"
      :style="{ direction: commitmentDirection }"
    >
      <v-app>
        <v-checkbox
          v-model="confirmed"
          :label="commitmentText"
          :disabled="!name"
          color="#007bff"
          :style="{ direction: commitmentDirection }"
        />
      </v-app>
    </div>
    <BaseButton variant="blue" :disabled="!confirmed || loading">
      Register
    </BaseButton>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
  </form>
</template>

<script>
import registration from "~/mixins/registration";
import { commitmentTexts, rtlLanguages } from "~/assets/util/options";

export default {
  mixins: [registration],
  inject: ["getSelectedPlan"],
  data() {
    return {
      confirmed: false,
      selectedImage: null
    };
  },
  computed: {
    plan() {
      return this.getSelectedPlan();
    },
    isOrganization() {
      return this.formData.accountType === "organization";
    },
    name() {
      const { fullName, organization, username } = this.formData;
      return (this.isOrganization ? organization : fullName) || username;
    },
    commitmentLanguage() {
      const { language } = this.formData;
      return Object.keys(commitmentTexts).includes(language)
        ? language
        : "English";
    },
    commitmentText() {
      let text = commitmentTexts[this.commitmentLanguage];
      if (this.name) {
        text = text.replace("__", this.name);
      }
      return text;
    },
    commitmentDirection() {
      return rtlLanguages.includes(this.commitmentLanguage) ? "rtl" : null;
    },
    //---Test for Photo
    prewiewFilePath() {
      if (this.selectedImage) {
        return URL.createObjectURL(this.selectedImage);
      } else {
        return "user image";
      }
    }
  },
  methods: {
    async submitHandler() {
      if (!this.validateData()) return;
      this.loading = true;

      //parse a formData to a json
      let jsonFormData = JSON.stringify(this.formData);
      //create special FormData object to send complex data(text + picture) to server
      const formDataToSend = new FormData();
      formDataToSend.append("register", jsonFormData);
      formDataToSend.append("image", this.selectedImage);
      try {
        await this.$store.dispatch("auth", formDataToSend);
        this.$cookies.set("newRegistration", true);
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
    //---Upload user image
    handleImageUpload(event) {
      this.selectedImage = event.target.files[0];
    }
  }
};
</script>

<style lang="scss">
.selected-plan {
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 4rem;

  @include respond(mobile) {
    margin-top: 0;
    margin-bottom: 3rem;
  }

  &__seperator {
    height: 0.2rem;
    flex: 1;
    background-color: #ccc;
  }

  &__text,
  &__plan {
    margin: -1rem 4rem 0;
    display: inline-block;
    padding: 0.5rem 2.5rem;
    border: 0.2rem solid #ccc;
    border-radius: 0.5rem;

    @include respond(mobile) {
      margin: -0.75rem 1.5rem 0;
    }
  }

  &__text {
    font-weight: 500;
    font-size: 1.8rem;

    @include respond(mobile) {
      font-size: 1.5rem;
    }
  }

  &__plan {
    font-weight: 600;
    color: $color-blue-2;
    font-size: 2.5rem;

    @include respond(mobile) {
      font-size: 2rem;
    }
  }
}

.form {
  &__confirm {
    .v-label {
      color: #000 !important;
      line-height: 1.7 !important;

      @include respond(mobile) {
        font-size: 1.45rem;
      }

      &--is-disabled {
        color: rgba(#000, 0.5) !important;
      }
    }

    .v-messages {
      min-height: 0;
    }

    &[style="direction: rtl;"] {
      .v-label {
        text-align: right;
      }

      .v-input--selection-controls__input {
        margin-right: 0;
        margin-left: 8px;
      }
    }
  }
}
</style>
