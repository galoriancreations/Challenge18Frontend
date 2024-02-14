<template>
  <section class="cert-templates">
    <CertificationTemplateAppreciation
      v-if="certificationTemplate.type === 'appreciation'"
      :date="date"
      :certificationSignature="certificationSignature"
      :name="name"
    />
    <CertificationTemplateCommitment
      v-else-if="certificationTemplate.type === 'commitment'"
      :date="date"
      :certificationSignature="certificationSignature"
      :name="name"
    />
  </section>
</template>

<script>
export default {
  props: {
    certificationTemplate: {
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
}

.cert-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__image {
    position: relative;
    pointer-events: none;

    img {
      width: 1200px;
      height: 800px;
      z-index: 1;
    }
  }

  span {
    position: absolute;
    font-size: 2rem;
    z-index: 1;
    color: #a0216e;
    font-weight: 800;
  }

  &__blank {
    bottom: 428px;
    width: 35%;
    height: 23px;
    background-color: #ffff;
    left: 50%;
    transform: translateX(-50%);
  }

  &__recipient {
    font-size: 2.25rem !important;
    bottom: 428px;
    left: 150px;
    width: 75%;
  }

  &__date {
    bottom: 290px;
    left: 215px;
  }

  &__signature {
    top: 490px;
    left: 965px;
    word-wrap: break-word;
    max-width: 150px;
  }
}
</style>
