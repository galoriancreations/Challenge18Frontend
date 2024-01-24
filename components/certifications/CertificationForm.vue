<template>
  <section class="certification">
    <h2 class="certification__title">{{ certification.name }}</h2>
    <h3 class="certification__text">Choose a certification type</h3>
    <VueSelect
      v-model="selectedCertificationTemplate"
      :options="certification.certifications"
      :reduce="(cert) => cert.name"
      class="certification__select"
    />
    <div v-if="selectedCertificationTemplate" class="certification__members">
      <h3>Members:</h3>
      <h4 v-if="!members.length">Add members to send them the certification</h4>
      <div class="certification__members-content">
        <CertificationMember
          v-for="member in members"
          :key="member.id"
          :member="member"
          class="certification__members-content__member"
          @removeMember="members.splice(members.indexOf(member), 1)"
        />
        <BaseButton
          variant="blue"
          @click="addMember"
          class="certification__members-add"
        >
          <i class="fas fa-plus" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['sendCertifications', 'update:certificationTemplate'],
  data() {
    return {
      selectedCertificationTemplate: null,
      members: [],
    };
  },
  props: {
    certification: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addMember() {
      this.members.push({
        id: this.members.length + 1,
        name: '',
        email: '',
      });
    },
  },
  watch: {
    selectedCertificationTemplate() {
      const template = this.certification.certifications.find(
        (cert) => cert.name === this.selectedCertificationTemplate
      );
      this.$emit('update:certificationTemplate', template);
    },
  },
};
</script>

<style lang="scss">
.certification {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  &__title {
    margin-bottom: 1rem;
  }

  &__text {
    margin-bottom: 1rem;
  }
  
  &__select {
    width: 100%;
  }

  &__members {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    width: 100%;

    h4 {
      margin: 1rem;
    }

    &-content {
      width: 100%;
      height: 50vh;
      overflow-y: auto;
      border: 2px solid #adc8cc;
      border-radius: 5px;
      margin: 2rem;
      justify-content: flex-start;

      &__member {
        width: 100%;

        &:nth-child(1n) {
          background-color: $color-grey-1;
        }
        &:nth-child(2n) {
          background-color: $color-grey-2;
        }
      }
    }

    &-add {
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
