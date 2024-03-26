<template>
  <form class="form" @submit.prevent="submitHandler">
    
    <!-------------- Test for Image -------------------->
    <!-- The accept attribute specifies a filter for what file types the user can
    pick from the file input dialog box. -->


    <div class="formfield">
      <div class="formfield__avatar">
      <label for="image" id="file-style-label"  >
      <img :src="prewiewFilePath"
      id="selectedImg" alt="Your avatar">
      <p id="preview-photo-text" >Nice To See Your Avatar</p>
      <ImageSelector
          v-model="formData.image"
          :placeholderImg="placeholderImg"
          :buttonSize="30"
          :loading="uploadingFile"
          @start-upload="uploadingFile = true"
          @end-upload="uploadingFile = false"
          :hasSelectedImage.sync="hasSelectedImage"
          :error.sync="errorUploading"
        />
    </label>

    <!------------------ icon delete ---------------------->
    <svg @click="deletePhoto" class="icons"
    xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" 
    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>

    </div>
    </div>
    <!------------------ end test ---------------------->

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
    <div class="form__field">
      <label for="password" class="form__label">Password</label>
      <input
        v-model="formData.password"
        id="Password"
        required
        class="form__input"
        placeholder="Password"
        type="password"
      />
    </div>
    <div class="form__field">
      <label for="confirmPassword" class="form__label">Confirm password</label>
      <input
        v-model="formData.confirmPassword"
        id="confirmPassword"
        required
        class="form__input"
        placeholder="Confirm password"
        type="password"
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
        <CheckIcon :status="availability.email" />
      </label>
      <input
        v-model="emailInput.value"
        @input="updateEmail"
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
import {
  initialData,
  textInputKeys,
  initialsImg
} from "~/assets/util/functions";

export default {
  mixins: [registration],
  inject: ["getSelectedPlan"],
  data() {
    return {
      confirmed: false,
      selectedImage: null,
      uploadingFile: false,
      hasSelectedImage: false,
      errorUploading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    placeholderImg() {
      return initialsImg(this.user);
    },    
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
    prewiewFilePath() {

    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    } 
    
    else{
      return null
    }
}

  },
  methods: {
    async submitHandler() {
      if (!this.validateData()) return;
      if (this.formData.confirmPassword != this.formData.password){
        this.error = "Passwords don't match"
        return;
      } 
      this.loading = true;
      try {
        await this.$store.dispatch("auth", {
          mode: "register",
          data: { ...this.formData, plan: "18-days" }
        });
        this.$cookies.set("newRegistration", true);
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    },
    handleImageUpload(event) {
      const previewPhoto = document.getElementById('selectedImg')
      const previewPhotoText = document.getElementById('preview-photo-text')
      this.selectedImage = event.target.files[0];

      if (this.selectedImage) {
        previewPhoto.style.display = 'block'
        previewPhotoText.style.display = 'none'
      } else {
        previewPhoto.style.display = 'none'
        previewPhotoText.style.display = 'block'
        this.selectedImage = null

      }
    },

    //---delete user image selected
    deletePhoto(){

      const previewPhoto = document.getElementById('selectedImg')
      const previewPhotoText = document.getElementById('preview-photo-text')

        previewPhoto.style.display = 'none'
        previewPhotoText.style.display = 'block'
        this.selectedImage = null
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
  // input type 'file'
  #image{
    display: none;
  }

  .formfield__avatar{
    width: auto;
    height: auto;
    display: flex;
    position: relative;
    margin-bottom: 30px;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: 10px ;

  }


  #file-style-label {
  font-family: 'Trebuchet MS';
  width: 400px;
  height: auto;
  display: flex;
  margin: 0 ;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: #545454cb;
  


  background-color: #f5f4f4;
  cursor: pointer;
  text-align: center;
  padding: 15px 10px;
  border-radius: 15px;
  border: 2px dashed #cdc8c8;
}

#file-style-label:hover {
  background-color: rgb(228, 213, 213);
  border-color: #ada9a9;
}

#selectedImg{
  display: none;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
  // flex-shrink: 0;
}

.icons{
  cursor: pointer;
  color: #8f96a3;
}

  
}
</style>
