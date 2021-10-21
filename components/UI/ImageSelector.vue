<template>
  <div class="image-selector">
    <img
      v-if="showImgElement"
      class="img-preview"
      :src="value || placeholderImg"
    />
    <ImageUploader
      v-if="showInput"
      :debug="1"
      :maxWidth="512"
      :quality="1"
      :autoRotate="true"
      outputFormat="verbose"
      :capture="false"
      accept="image/*"
      @input="$emit('input', $event)"
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
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Object],
    showImgElement: {
      type: Boolean,
      default: true
    },
    placeholderImg: String,
    showInput: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
.image-selector {
  text-align: center;

  .img-preview {
    width: 30rem !important;
    max-width: 100% !important;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    margin: 1rem auto;
  }

  #fileInput {
    display: none !important;
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
