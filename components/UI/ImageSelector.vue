<template>
  <div class="image-selector">
    <div class="image-selector__wrapper">
      <img v-if="imageUrl" v-show="hasSelectedImage" class="image-selector__image" :src="imageUrl" />
      <i
        v-if="loading && showStatusIcon"
        class="fas fa-circle-notch fa-spin image-selector__spinner"
      />
      <i
        v-else-if="hasSelectedImage && !error && showStatusIcon"
        class="fas fa-check image-selector__check"
      />
    </div>
    <client-only>
      <ImageUploader
        v-if="showUploader"
        :id="id"
        :debug="1"
        :maxWidth="512"
        :quality="1"
        :autoRotate="true"
        outputFormat="file"
        :capture="false"
        accept="image/*"
        :preview="false"
        @input="updateImage"
      >
        <label :for="id" slot="upload-label" class="image-selector__button">
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :width="buttonSize"
              :height="buttonSize"
              viewBox="0 0 32 32"
            >
              <path
                d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
              />
            </svg>
          </figure>
          <span class="image-selector__caption">
            {{ buttonCaption }}
          </span>
        </label>
      </ImageUploader>
    </client-only>
    <ErrorMessage v-if="error" @click="uploadImage">
      Failed to upload file. Click here to retry
    </ErrorMessage>
  </div>
</template>

<script>
export default {
  components: {
    ImageUploader: () =>
      process.client ? import("vue-image-upload-resize") : null
  },
  props: {
    value: null,
    id: {
      type: String,
      default: "fileInput"
    },
    placeholderImg: String,
    showUploader: {
      type: Boolean,
      default: true
    },
    buttonSize: {
      type: Number,
      default: 32
    },
    hasSelectedImage: Boolean,
    loading: Boolean,
    error: Boolean,
    showStatusIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    imageUrl() {
      try {
        if (!this.value) {
          return this.placeholderImg || null;
        }
        return typeof this.value === "string"
          ? this.$config.axios.baseURL + this.value
          : process.client && URL.createObjectURL(this.value);
      } catch {
        return null;
      }
    },
    buttonCaption() {
      return this.value ? "Replace" : "Upload";
    }
  },
  methods: {
    updateImage(file) {
      console.log(
        `initial image value in imageSelector component: ${file}`
      );
      console.log(file);
      // this.value = file // its leads to re-render error 

      // send selected image back to parent component (v-model gets it)
      this.$emit("input", file);
      this.$emit("update:hasSelectedImage", true);
      this.uploadImage(file);
      console.log(`image replased in imageSelector component: ${file}`);
      this.$emit("end-upload");
    },
    async uploadImage(file) {
      this.$emit("end-upload");
      this.$emit("start-upload");
      this.$emit("update:error", false);
      try {
        console.log(`image to upload in imageSelector component: ${file}`);
        const data = new FormData();
        data.append("file", file);
        const imageUrl = await this.$axios.$post("/uploads", data);
        this.$emit("end-upload");
        this.$emit("input", imageUrl);
        console.log(`image uploaded in imageSelector component: ${imageUrl}`);
      } catch {
        this.$emit("update:error", true);
      }
      this.$emit("end-upload");
    }
  }
};
</script>

<style lang="scss">
.image-selector {
  width: 100%;
  text-align: center;

  &__wrapper {
    position: relative;
  }

  &__image {
    width: 30rem;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    margin: 0.75rem auto 1.5rem;

    @include respond(mobile) {
      width: 28rem;
      margin: 0.4rem auto 1.25rem;
    }
  }

  input {
    display: none !important;
  }

  &__spinner,
  &__check {
    position: absolute;
    top: 50%;
    right: calc(50% + 17rem);
    transform: translateY(-50%);

    @include respond(mobile) {
      right: calc(50% + 15rem);
    }
  }

  &__check {
    color: $color-azure;
  }

  &__button {
    cursor: pointer;

    * {
      transition: all 0.5s;
    }

    &:hover path {
      fill: $color-azure;
    }
  }

  &__caption {
    font-weight: 500;
  }

  &__button:hover &__caption {
    color: $color-azure;
  }

  .error-message {
    margin-top: 2rem !important;
    cursor: pointer;
  }
}

.dashboard .image-selector {
  &__image {
    width: 25rem;
  }

  &__caption {
    font-size: 1.4rem;
  }

  &__spinner,
  &__check {
    right: calc(50% + 14rem);

    @include respond(mobile) {
      right: calc(50% + 13.5rem);
    }
  }
}

.message-form .image-selector {
  margin-top: 1rem;

  &__image {
    box-shadow: none;
    border: 0.2rem solid #ccc;
    width: 28rem;
  }

  &__spinner,
  &__check {
    right: calc(50% + 15.5rem);

    @include respond(mobile) {
    }
  }

  &__caption {
    font-size: 1.4rem;
  }
}

.formfield__avatar .image-selector{  
  &__image {
    margin: 0.75rem auto ;
  }

  &__caption {
    display: none;  
  }
}

</style>
