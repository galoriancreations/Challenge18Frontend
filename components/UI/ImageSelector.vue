<template>
  <div class="image-selector">
    <div class="image-selector__wrapper">
      <img v-if="imageUrl" class="img-preview" :src="imageUrl" />
      <i
        v-if="loading"
        class="fas fa-circle-notch fa-spin image-selector__spinner"
      />
      <i
        v-else-if="hasSelectedImage && !error"
        class="fas fa-check image-selector__check"
      />
    </div>
    <client-only>
      <ImageUploader
        v-if="showUploader"
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
        <label for="fileInput" slot="upload-label" class="image-button">
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                class="path1"
                d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
              />
            </svg>
          </figure>
          <span class="upload-caption">
            {{ value ? "Replace" : "Upload" }}
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
    placeholderImg: String,
    showUploader: {
      type: Boolean,
      default: true
    },
    loading: Boolean
  },
  data() {
    return {
      hasSelectedImage: false,
      error: false
    };
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
    }
  },
  methods: {
    updateImage(value) {
      this.$emit("input", value);
      this.hasSelectedImage = true;
      this.uploadImage(value);
    },
    async uploadImage(file) {
      this.$emit("start-upload");
      this.error = false;
      try {
        const data = new FormData();
        data.append("file", file);
        const imageUrl = await this.$axios.$post("/upload", data);
        this.$emit("input", imageUrl);
      } catch {
        this.error = true;
      }
      this.$emit("end-upload");
    }
  }
};
</script>

<style lang="scss">
.image-selector {
  text-align: center;

  &__wrapper {
    position: relative;
  }

  .img-preview {
    width: 30rem !important;
    max-width: 100% !important;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    margin: 1rem auto;

    @include respond(mobile) {
      width: 28rem !important;
    }
  }

  #fileInput {
    display: none !important;
  }

  &__spinner,
  &__check {
    position: absolute;
    top: 50%;
    right: calc(50% + 17rem);
    transform: translateY(-50%);

    @include respond(mobile) {
      right: initial;
      left: -0.65rem;
    }
  }

  &__check {
    color: $color-azure;
  }

  .error-message {
    margin-top: 2rem !important;
    cursor: pointer;
  }
}

.image-button {
  cursor: pointer;

  * {
    transition: all 0.5s;
  }

  .upload-caption {
    font-weight: 500;
  }

  &:hover {
    .path1 {
      fill: $color-azure;
    }

    .upload-caption {
      color: $color-azure;
    }
  }
}
</style>
