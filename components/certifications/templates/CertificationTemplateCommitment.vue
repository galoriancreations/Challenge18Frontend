<template>
  <div class="cert-template">
    <div class="cert-template__title">Certificate of Commitment</div>
    <div class="cert-template__event-name">BGI Challenge Pioneer</div>
    <div class="cert-template__recipient">
      Awarded to {{ certification.members[0].name }}
    </div>
    <div class="cert-template__body-text">
      In recognition of your commitment to pioneering change in the BGI
      Challenge. Your vision and daring spirit are key to transcending
      boundaries and shaping a beneficial AI future.
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
