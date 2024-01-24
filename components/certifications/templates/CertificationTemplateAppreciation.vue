<template>
  <div class="cert-template">
    <div class="cert-template__title">Certificate of Appreciation</div>
    <div class="cert-template__event-name">
      BGI Summit & Unconference Speaker
    </div>
    <div class="cert-template__recipient">
      Awarded to {{ certification.members[0].name }}
    </div>
    <div class="cert-template__body-text">
      For your outstanding contribution and insights at the Beneficial AGI
      Summit & Unconference, Panama City, Feb. 27 - Mar. 1, 2024. Your expertise
      is invaluable in our journey towards a future where AI benefits humanity.
    </div>
    <div class="cert-template__date-signature">
      <div>Date: {{ date }}</div>
      <div>Signature: {{ signature }}</div>
    </div>
    <div class="cert-template__title-signatory">{{ titleOfSignatory }}</div>
  </div>
</template>

<script>
export default {
  props: {
    certification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      const date = new Date();
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },
    signature() {
      return 'Ben Goertzel';
    },
    titleOfSignatory() {
      return 'CEO, SingularityNET Foundation';
    },
  },
};
</script>
