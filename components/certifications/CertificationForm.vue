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
      <h3 class="certification__members-title">Members:</h3>
      <div class="certification__members-content">
        <TransitionGroup name="list" tag="div">
          <CertificationMember
            v-for="member in members"
            :key="member.id"
            :member="member"
            class="certification__members-content__member"
            @removeMember="members.splice(members.indexOf(member), 1)"
            @addMember="addMember"
            ref="memberInputs"
          />
        </TransitionGroup>
        <BaseButton
          variant="blue"
          @click="addMember"
          class="certification__members-add"
          :disabled="!isMembersValid"
        >
          <i class="fas fa-plus" />
        </BaseButton>
      </div>
      <h4 v-if="!members.length" class="certification__members-warn">
        Add members to send them the certification
      </h4>
    </div>
  </section>
</template>

<script>
import { isValidEmail } from '~/assets/util/functions';

export default {
  emits: ['sendCertifications', 'update:certificationTemplate'],
  data() {
    return {
      selectedCertificationTemplate: null,
      members: [
        {
          id: 0,
          name: '',
          email: '',
        },
      ],
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
      if (!this.isMembersValid) return;
      this.members.push({
        id: this.members.length,
        name: '',
        email: '',
      });
      this.$nextTick(() => {
        this.$refs.memberInputs[
          this.members.length - 1
        ].$refs.memberNameInput.focus();
      });
    },
  },
  computed: {
    isMembersValid() {
      return this.members.every(
        (member) => member.name.trim() && isValidEmail(member.email)
      );
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
    box-shadow: $boxshadow2;
  }

  &__members {
    text-align: center;
    margin-top: 5rem;
    width: 50vw;

    @include respond(mobile) {
      width: 100%;
    }

    &-title {
      margin: 0;
      padding: 0;
    }

    &-content {
      width: 100%;
      height: 50vh;
      overflow-y: auto;
      border: 2px solid #adc8cc;
      border-radius: 5px;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-shadow: $boxshadow2;
      padding: 0.5rem;

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

    &-warn {
      color: $color-danger;
      font-size: 1.5rem;
    }

    &-add {
      margin-top: auto;
      margin-bottom: 0;
      width: 100%;
      border-radius: 0;
      border: none !important;
      border-top: 2px solid #adc8cc !important;
    }
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
