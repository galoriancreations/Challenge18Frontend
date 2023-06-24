<template>
  <PopupModal title="Add a Player" :active="active" class="add-player">
    <div class="add-player__intro">
      <p>
        When registering a player, a new account will be created for that player
        with the username and phone number you assigned them. After registering
        a player, you won't be able to change their details.
      </p>
      <p>
        If you delete a player, their account won't be deleted, but it will no
        longer be linked to your organization account.
      </p>
    </div>
    <form class="form" @submit.prevent="submitHandler">
      <div class="form__field">
        <label class="form__label">
          Role/specialty
        </label>
        <VueSelect
          v-model="formData.role"
          :options="roleOptions"
          :reduce="option => option.value"
          :searchable="false"
          class="language-selector"
        />
        <label class="form_label">
          Phone number
        </label>
        <VuePhoneNumberInput
        class="phone-number-input"
        id="phone"
        v-model="phoneInput.value"
        @update="updatePhoneNumber"
        color="#007bff"
        :border-radius="8"
        :show-code-on-list="true"
        :no-flags="true"
      />
      </div>
      <BaseButton variant="blue">Add player</BaseButton>
      <BaseSpinner v-if="loading" />
      <ErrorMessage v-else-if="error" :error="error" />
    </form>
  </PopupModal>
</template>

<script>
import { roleOptions } from "~/assets/util/options";
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  components: { VuePhoneNumberInput },
  props: {
    active: Boolean
  },
  inject: ["addNotification", "closeModal"],
  data() {
    return {
      roleOptions,
      formData: {
        playerId: null,
        role: "player",
        phone:""
      },
      phoneInput: {
        value: "",
        formatted: null,
        isValid: false
      },
      loading: false,
      error: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userCountry() {
      return this.user?.country;
    },
    userLanguage() {
      return this.user?.language;
    }
  },
  methods: {
    resetForm() {
      this.formData = { playerId: null, role: "player",phone:''};
    },
    updatePhoneNumber(data) {
      this.formData.phone = data.formattedNumber;
      this.phoneInput.formatted = data.formatInternational;
      this.phoneInput.isValid = data.isValid;
    },
    async submitHandler() {
      this.loading = true;
      if (!this.phoneInput.isValid) {
        if (this.phoneInput.value) {
          this.error = "Invalid phone number";
        }
        return;
      }
      console.log(this.formData)
      try {
        // const { user } = await this.$axios.$post("/api", {
        //   register: { ...this.formData, plan: this.user.plan }
        // });
        let result = await this.$axios.$post("/xapi", {"addPlayer":this.formData});
        await this.$store.dispatch("updateUser");
        this.closeModal();
        this.addNotification(
          `Successfully added player: <strong>${result.msg}</strong>.`
        );
        this.resetForm();
      } catch (error) {
        this.error = error;
      }
      this.loading = false;
    }
  },
  watch: {
    userCountry(value) {
      this.formData.country = value;
    },
    userLanguage(value) {
      this.formData.language = value;
    }
  },
  created() {
    this.resetForm();
  }
};
</script>

<style lang="scss">
.add-player {
  &__intro {
    margin: -2rem 0 5rem;

    p {
      font-size: inherit;

      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }
  }
}
</style>
