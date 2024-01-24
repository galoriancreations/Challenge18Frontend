<template>
  <section class="cert-template">
    <CertificationTemplateAppreciation
      v-if="certification.type === 'appreciation'"
      :certification="certification"
    />
    <CertificationTemplateCommitment
      v-else-if="certification.type === 'commitment'"
      :certification="certification"
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
  },
  computed: {
    date() {
      const date = new Date();
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss">
.cert-template {
  background-color: white;
  border: 5px solid #ddd;
  padding: 20px;
  width: 70%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__event-name {
    font-size: 20px;
    margin-bottom: 15px;
  }

  &__recipient {
    font-size: 18px;
    margin-bottom: 15px;
  }

  &__body-text {
    margin-bottom: 30px;
  }

  &__date-signature {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__title-signatory {
    font-size: 18px;
    margin-top: 20px;
  }
}
</style>
