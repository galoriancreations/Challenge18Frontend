<template>
  <div class="cert-template">
    <div class="cert-template__image">
      <img
        src="../../../../assets/images/certifications/AGI/Certificates-AGI-Appreciation.jpg"
        alt="Certificates-AGI-Appreciation"
      />
      <span class="cert-template__blank" />
      <span class="cert-template__recipient">Awarded to {{ name }}</span>
      <span class="cert-template__date">{{ date }}</span>
      <span class="cert-template__signature">{{ certificationSignature }}</span>
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
