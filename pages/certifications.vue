<template>
  <Page title="Certifications" name="certifications" ref="page">
    <SectionHeading class="certifications__heading">
      Certification
    </SectionHeading>
    <div class="certifications__logo">
      <img
        src="../assets/images/certifications/certifications-logo.png"
        alt="logo"
      />
    </div>
    <div class="certifications__content">
      <h3>Choose a certification</h3>
      <VueSelect
        v-model="selectedCertificationType"
        :options="certificationsTypes"
        :reduce="(cert) => cert.name"
        class="certifications__content-select"
      />
      <CertificationForm
        v-if="selectedCertificationType"
        :certification="certification"
        @sendCertifications="sendCertifications"
        @update:certification="selectedCertificationTemplate = $event"
      />
      <CertificationPdf
        v-if="selectedCertificationType"
        :certification="selectedCertificationType"
      />
    </div>
  </Page>
</template>

<script>
import certifications from '../assets/data/certifications/certifications.json';

export default {
  meta: {
    requiresAuth: true,
  },
  data() {
    return {
      certificationsTypes: certifications,
      selectedCertificationType: null,
      selectedCertificationTemplate: null,
    };
  },
  computed: {
    certification() {
      return certifications.find(
        (cert) => cert.name === this.selectedCertificationType
      );
    },
  },
  methods: {
    sendCertifications(members) {
      console.log(this.selectedCertificationTemplate);
      members.forEach((member) => {
        console.log('Sending certification to:', member.name);
      });
    },
  },
};
</script>

<style lang="scss">
.certifications {
  &__logo {
    margin: 2rem auto;
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0 10rem;

    &-select {
      width: 100%;
      max-width: 400px;
    }
  }
}
</style>
