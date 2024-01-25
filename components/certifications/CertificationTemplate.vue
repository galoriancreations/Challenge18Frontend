<template>
  <section class="cert-templates">
    <CertificationTemplateAppreciation
      v-if="certification.type === 'appreciation'"
      :date="date"
      :certificationSignature="certificationSignature"
      :name="name"
    />
    <CertificationTemplateCommitment
      v-else-if="certification.type === 'commitment'"
      :date="date"
      :certificationSignature="certificationSignature"
      :name="name"
    />
  </section>
</template>

<script>
export default {
  props: {
    certification: {
      type: Object,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    },
    certificationSignature: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    date() {
      const date = new Date();
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss">
.cert-templates {
  display: flex;
  justify-content: center;
  border: 1px solid #544e4e;
  width: 800px;
  margin: auto;
}

.cert-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5rem;
  margin: 2rem;
  width: 800px;

  &__title {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  &__event-name {
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  &__recipient {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  &__body-text {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    max-width: 600px;
  }

  &__date-signature {
    font-size: 1.5rem;
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__title-signatory {
    font-size: 2rem;
    margin-top: 1rem;
  }
}
</style>
