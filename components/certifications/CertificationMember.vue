<template>
  <div class="certification-member form">
    <div class="certification-member__info">
      <div class="certification-member__info__input">
        <label class="form__label">Name:</label>
        <input class="form__input" placeholder="Name" v-model="member.name" />
      </div>
      <div class="certification-member__info__input">
        <label>Email:</label>
        <input class="form__input" placeholder="Email" v-model="member.email" />
      </div>
    </div>
    <button class="certification-member__remove" @click="$emit('removeMember')">
      <i class="fas fa-times" />
    </button>
  </div>
</template>

<script>
export default {
  emits: ['removeMember'],
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
  border: 1px solid $color-gray-1;
  padding: 1rem;

  &__info {
    display: flex;
    flex-direction: column;
    width: 100%;
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
    background-color: transparent;
    border: none;
    color: $color-danger;
    font-size: 2rem;
    cursor: pointer;
  }
}
</style>
