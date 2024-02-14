<template>
  <div class="cert-template">
    <div class="cert-template__title">Certificate of Commitment</div>
    <div class="cert-template__event-name">BGI Challenge Pioneer</div>
    <div class="cert-template__recipient">Awarded to {{ name }}</div>
    <div class="cert-template__body-text">
      In recognition of your commitment to pioneering change in the BGI
      Challenge. Your vision and daring spirit are key to transcending
      boundaries and shaping a beneficial AI future.
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
