<template>
  <PopupModal title="Edit Profile" :active="active">
    <form class="form" @submit.prevent="submitHandler">
      <!-- Image Upload -->
      <div class="form__field form__image-field">
        <label for="fileInput" class="form__label">
          {{ labels && labels.image }}
        </label>

        <!-- v-model="formData.image.data" -->
        <ImageSelector
          v-model="userImage"
          :placeholderImg="placeholderImg"
          :buttonSize="30"
          :loading="uploadingFile"
          @start-upload="uploadingFile = true"
          @end-upload="uploadingFile = false"
          :hasSelectedImage.sync="hasSelectedImage"
          :error.sync="errorUploading"
        />
      </div>
      <!-- User Data Change without "language", "phone", "image"-->
      <div class="form__field" v-for="key in textInputKeys" :key="key">
        <label :for="key" class="form__label">
          {{ labels[key] }}
        </label>
        <VueSelect
          v-if="key === 'country'"
          v-model="formData.country"
          :options="countryOptions"
          label="name"
          :reduce="option => option.code"
          class="language-selector"
        />
        <input
          v-else
          v-model="formData[key]"
          :id="key"
          :required="key === 'username'"
          class="form__input"
          :placeholder="labels[key]"
        />
      </div>
      <!-- Language Select-->
      <div class="form__field">
        <label for="language" class="form__label">
          Challenge language
        </label>
        <VueSelect
          v-model="formData.language"
          :options="languageOptions"
          :reduce="option => option.name"
          required
          class="language-selector"
        />
      </div>
      <BaseButton variant="blue" :disabled="uploadingFile || loading">
        {{ buttonText }}
      </BaseButton>
      <BaseSpinner v-if="loading" />
      <ErrorMessage v-else-if="error" :error="error" />
    </form>
  </PopupModal>
</template>

<script>
import {
  initialData,
  textInputKeys,
  initialsImg
} from "~/assets/util/functions";
import languageOptions from "~/assets/data/languages";
import countryOptions from "~/assets/data/countries";

export default {
  props: {
    active: Boolean
  },
  inject: ["labels", "closeModal", "addNotification"],
  data() {
    return {
      // when opening formData is build from template
      formData: initialData({ ...this.labels, language: "Challenge language" }),
      // fields/labels without "language", "phone", "image"
      textInputKeys: textInputKeys(this.labels),
      languageOptions,
      countryOptions,
      uploadingFile: false,
      hasSelectedImage: false,
      errorUploading: false,
      loading: false,
      error: null,
      // to use v-model userImage must be in data
      userImage: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    // take an imge from store to provide it to ImageSelector
    // userImage() {
    //   return this.$store.getters.userImage;
    // },
    // simple image with users initials
    placeholderImg() {
      return initialsImg(this.user);
    },
    buttonText() {
      return this.uploadingFile ? "Uploading file" : "Save profile";
    }
  },
  methods: {
    // when created run this method:
    // to display initil data of the user in a input fields of form
    initData() {
      for (let key in this.formData) {
        // test/ this if. initial is just  this.formData[key] = this.user[key];
        if (key != "image") {
          this.formData[key] = this.user[key];
        }
        // this.formData[key] = this.user[key];
        this.userImage = this.$store.getters.userImage;
      }
    },
    // test:
    // imageUpload(image) {
    //   this.userImage = image;
    // },
    async submitHandler() {
      if (this.loading) return;
      this.loading = true;
      this.error = null;
      // test:
      console.log("i am here");
      console.log(`edit component gets userImage:`);
      console.log(this.userImage);

      let jsonFormData = JSON.stringify(this.formData);
      const formDataToSend = new FormData();
      formDataToSend.append("editProfile", jsonFormData);
      formDataToSend.append("image", this.userImage);
      console.log(`FormData Object:${formDataToSend}`);
      for (const value of formDataToSend.values()) {
        console.log(value);
      }
      try {
        // test:
        await this.$store.dispatch("updateUser", formDataToSend);
        // old version erase if i succed
        // await this.$store.dispatch("updateUser", this.formData);
        this.closeModal();
        this.addNotification(
          "<strong>Your profile details</strong> were successfully updated."
        );
      } catch (error) {
        this.error = error;
      }

      this.loading = false;
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="scss">
.form {
  &__image-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -1.5rem;
  }
}
</style>
