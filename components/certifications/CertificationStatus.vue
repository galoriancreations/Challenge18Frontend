<template>
  <div class="certifications__status">
    <h3>Status</h3>
    <div class="certifications__status-content">
      <div class="certifications__status-content__item" :class="membersClass">
        <h4>Members</h4>
        <p>{{ isMembersValid ? members : 'INVALID' }}</p>
      </div>
      <div class="certifications__status-content__item" :class="templateClass">
        <h4>Template</h4>
        <p>{{ certificationTemplate ? 'Set' : 'Not set' }}</p>
      </div>
      <div class="certifications__status-content__item" :class="signatureClass">
        <h4>Signature</h4>
        <p>{{ certificationSignature ? 'Set' : 'Not set' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: null,
    certificationTemplate: null,
    certificationSignature: null,
    isMembersValid: Boolean,
  },
  computed: {
    membersClass() {
      return this.isMembersValid ? 'bg-success' : 'bg-danger';
    },
    templateClass() {
      return this.certificationTemplate ? 'bg-success' : 'bg-danger';
    },
    signatureClass() {
      return this.certificationSignature ? 'bg-success' : 'bg-danger';
    },
  },
};
</script>

<style lang="scss">
.certifications__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;

  &-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin-top: 1rem;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 100px;
      border: 2px solid #adc8cc;
      border-radius: 5px;
      padding: 1rem;
      margin: 0 1rem;
      box-shadow: $boxshadow2;

      h4 {
        margin: 0;
        padding: 0;
      }

      &.bg-success {
        background-color: $color-success;
      }

      &.bg-danger {
        background-color: $color-danger;
      }
    }
  }
}
</style>
