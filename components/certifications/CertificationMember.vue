<template>
  <div class="certification-member form">
    <div class="certification-member__info">
      <div class="certification-member__info__input">
        <label class="form__label">Name:</label>
        <input
          class="form__input"
          placeholder="Name"
          v-model="member.name"
          ref="memberNameInput"
          required
          @keyup.enter="$refs.memberEmailInput.focus()"
        />
      </div>
      <div class="certification-member__info__input">
        <label>Email:</label>
        <input
          class="form__input"
          placeholder="Email"
          v-model="member.email"
          type="email"
          required
          @keyup.enter="$emit('addMember')"
          ref="memberEmailInput"
        />
      </div>
    </div>
    <button class="certification-member__remove" @click="$emit('removeMember')">
      <i class="fas fa-times" />
    </button>
  </div>
</template>

<script>
export default {
  emits: ['removeMember', 'addMember'],
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.certification-member {
  padding: 1rem;

  &__info {
    border-radius: 0.25rem;

    &__input {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      label {
        font-weight: bold;
        margin: 0;
        width: 8rem;
      }

      input {
        padding: 0.5rem;
        margin: 0.25rem 0;
        width: 100%;
      }
    }
  }

  &__remove {
    font-size: 2rem;
    color: $color-danger;
    padding: 0.5rem 1rem;
    margin: auto;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: $color-danger;
      color: #fff;
    }
  }
}
</style>
