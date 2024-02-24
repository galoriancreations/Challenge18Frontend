<template>
  <div class="cert-template">
    <div class="cert-template__image">
      <img
        :src="this.s3AssetsGenerator('images/certifications/AGI/Certificates-AGI-Commitment.jpg')"
        alt="Certificates-AGI-Commitment"
      />
      <span class="cert-template__blank" />
      <span class="cert-template__recipient">Awarded to {{ name }}</span>
      <span class="cert-template__date">{{ date }}</span>
      <span class="cert-template__signature">{{ certificationSignature }}</span>
    </div>
  </div>
</template>

<script>
import s3AssetsMixin from '~/mixins/s3AssetsMixin';

export default {
    mixins: [ s3AssetsMixin ],
  props: {
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    certificationSignature: {
      type: String,
      required: true,
    },
  },
};
</script>
