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
      <Transition name="list">
        <CertificationMembers
          v-if="certification"
          :certification="certification"
          @sendCertifications="sendCertifications"
          @update:certificationTemplate="certificationTemplate = $event"
          ref="certificationMembers"
        />
      </Transition>
      <Transition name="list">
        <div v-if="certificationTemplate">
          <CertificationSignature
            @update:certificationSignature="certificationSignature = $event"
          />
        </div>
      </Transition>
    </div>
    <SectionSeperator />
    <CertificationPdf
      v-if="certificationTemplate"
      :certification="certificationTemplate"
      :certificationSignature="certificationSignature"
      ref="certificationPdf"
    />
    <CertificationStatus
      :members="members().length"
      :certificationTemplate="certificationTemplate"
      :certificationSignature="certificationSignature"
      :isMembersValid="isMembersValid()"
    />
    <BaseButton
      variant="blue"
      class="certifications__send-button"
      v-if="certificationTemplate"
      :disabled="
        loading ||
          !certificationSignature ||
          !certificationTemplate ||
          !isMembersValid()
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
      this.setConfirmModal(
        'Are you sure you want to send the certifications? This action cannot be undone and will send an email to each member with their certification attached.',
        async () => {
          this.completed = false;
          this.showPopup = false;
          this.progress = 0;
          this.loading = true;
          const errorMembers = [];
          for (const member of members) {
            const pdfBlob = await this.$refs.certificationPdf.generatePdf(
              member.name
            );
            if (!pdfBlob) {
              errorMembers.push(member);
              continue;
            }
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

          if (errorMembers.length) {
            this.setConfirmModal(
              `Some certifications could not be sent. Please check the following members: ${this.errorMembers
                .map((member) => member.name)
                .join(', ')}. Do you want to resend them?`,
              () => {
                this.$refs.certificationMembers.members = errorMembers;
                setTimeout(() => {
                  this.sendCertifications(errorMembers);
                }, 100);
              }
            );
          }

          this.loading = false;
          this.completed = true;
          this.showPopup = true;
        }
      );
    },
    members() {
      return this.$refs.certificationMembers
        ? this.$refs.certificationMembers.members
        : [];
    },
    isMembersValid() {
      return this.$refs.certificationMembers
        ? this.$refs.certificationMembers.isMembersValid
        : false;
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

    &-select {
      width: 100%;
      max-width: 400px;
      box-shadow: $boxshadow2;
    }

    h3 {
      margin-bottom: 1rem;
    }
  }

  &__progress {
    color: green;
    font-weight: bold;
    text-align: center;
    margin-top: 1rem;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(100vh);
}
</style>
