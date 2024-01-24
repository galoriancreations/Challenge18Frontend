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
        v-if="certification"
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
        loading ||
          !certificationSignature.trim() ||
          !certificationTemplate ||
          !$refs.certificationForm.isMembersValid
      "
      @click="sendCertifications(members())"
    >
      Send
    </BaseButton>
    <BaseSpinner v-if="loading" class="certifications__spinner" />
    <p v-if="loading || completed" class="certifications__progress">
      Sent {{ progress }} out of {{ members().length }} certifications
    </p>
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
    <CertificationWrapPopup
      :active="showPopup"
      :sent="progress"
      :outOf="members() ? members().length : 1"
      @close="showPopup = false"
    />
  </Page>
</template>

<script>
import certifications from '../assets/data/certifications/certifications.json';
import confirmModal from '~/mixins/confirm-modal';

export default {
  meta: {
    requiresAuth: true,
  },
  mixins: [confirmModal],
  data() {
    return {
      certificationsTypes: certifications,
      certificationType: null,
      certificationTemplate: null,
      certificationSignature: '',
      loading: false,
      progress: 0,
      completed: false,
      showPopup: false,
    };
  },
  methods: {
    async sendCertifications(members) {
      this.completed = false;
      this.showPopup = false;
      this.setConfirmModal(
        'Are you sure you want to send the certifications? This action cannot be undone and will send an email to each member with their certification attached.',
        async () => {
          this.progress = 0;
          this.loading = true;
          for (const member of members) {
            const pdfBlob = await this.$refs.certificationPdf.generatePdf(
              member.name
            );
            const pdfBase64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(pdfBlob);
            });
            const data = { pdf: pdfBase64, member };
            await this.$axios.post('/certifications/send', {
              certification: data,
            });
            this.progress++;
          }
          this.loading = false;
          this.completed = true;
          this.showPopup = true;
        }
      );
    },
    members() {
      return this.$refs.certificationForm
        ? this.$refs.certificationForm.members
        : [];
    },
  },
  computed: {
    certification() {
      const certification = certifications.find(
        (cert) => cert.name === this.certificationType
      );
      return certification;
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

  &__progress {
    color: green;
    font-weight: bold;
    text-align: center;
    margin-top: 1rem;
  }
}
</style>
