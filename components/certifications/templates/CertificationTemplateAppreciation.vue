<template>
  <div class="cert-template">
    <div class="cert-template__title">Certificate of Appreciation</div>
    <div class="cert-template__event-name">
      BGI Summit & Unconference Speaker
    </div>
    <div class="cert-template__recipient">Awarded to {{ name }}</div>
    <div class="cert-template__body-text">
      For your outstanding contribution and insights at the Beneficial AGI
      Summit & Unconference, Panama City, Feb. 27 - Mar. 1, 2024. Your expertise
      is invaluable in our journey towards a future where AI benefits humanity.
    </div>
    <div class="cert-template__date-signature">
      <div>Date: {{ date }}</div>
      <div>Signature: {{ certificationSignature }}</div>
    </div>
    <div class="cert-template__title-signatory">
      CEO, SingularityNET Foundation
    </div>
  </div>
</template>

<script>
export default {
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
