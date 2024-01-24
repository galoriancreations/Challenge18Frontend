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
        v-model="certificationType"
        :options="certificationsTypes"
        :reduce="(cert) => cert.name"
        class="certifications__content-select"
      />
      <CertificationForm
        v-if="certificationType"
        :certification="certification"
        @sendCertifications="sendCertifications"
        @update:certificationTemplate="certificationTemplate = $event"
        ref="certificationForm"
      />
      <div v-if="certificationTemplate">
        <CertificationSignature
          @update:certificationSignature="certificationSignature = $event"
        />
        <CertificationPdf
          :certification="certificationTemplate"
          :certificationSignature="certificationSignature"
          ref="certificationPdf"
        />
      </div>
    </div>
    <BaseButton
      variant="blue"
      class="certifications__send-button"
      v-if="certificationTemplate"
      :disabled="
        !certificationSignature.trim() ||
          !certificationTemplate ||
          !$refs.certificationForm.members.length
      "
      @click="sendCertifications($refs.certificationForm.members)"
    >
      Send
    </BaseButton>
    <BaseSpinner v-if="loading" class="certifications__spinner" />
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
      certificationType: null,
      certificationTemplate: null,
      certificationSignature: '',
      loading: false,
    };
  },
  computed: {
    certification() {
      const certification = certifications.find(
        (cert) => cert.name === this.certificationType
      );
      return certification;
    },
  },
  methods: {
    async sendCertifications(members) {
      this.loading = true;
      const certifications = [];
      for (const member of members) {
        const pdfBlob = await this.$refs.certificationPdf.generatePdf(member.name);
        const pdfBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(pdfBlob);
        });
        const certification = { pdf: pdfBase64, member };
        await this.$axios.post('/certifications/sendCertification', {
          certification,
        });
        certifications.push(certification);
      }
      // console.log(certifications);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.certifications {
  display: flex;
  flex-direction: column;

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

    h3 {
      margin-bottom: 1rem;
    }
  }

  &__send-button {
    margin: 2rem;
  }
}
</style>
