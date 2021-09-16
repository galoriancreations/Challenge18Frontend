<template>
  <DashboardModal title="Add a Player" :active="active" class="add-player">
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
        <div class="form__field">
          <label for="fullName" class="form__label">
            Full name (required)
          </label>
          <input
            v-model="formData.fullName"
            id="fullName"
            class="form__input"
            placeholder="Player's full name"
            required
          />
        </div>
        <div class="form__field">
          <label for="language" class="form__label">
            Role/specialty
          </label>
          <VueSelect
            v-model="playerRole"
            :options="roleOptions"
            :reduce="option => option.value"
            :searchable="false"
            class="language-selector"
          />
        </div>
        <label for="username" class="form__label">
          Username (used for login)
          <CheckIcon :status="availability.username" />
        </label>
        <input
          v-model="formData.username"
          id="username"
          required
          class="form__input"
          placeholder="Username"
        />
      </div>
      <div class="form__field">
        <label for="phone" class="form__label">
          Phone number (used for login)
          <CheckIcon :status="availability.phone" />
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
      <div class="form__field">
        <label for="country" class="form__label">
          Country
        </label>
        <VueSelect
          v-model="formData.country"
          :options="countryOptions"
          :reduce="option => option.code"
          label="name"
          placeholder="Country"
          class="language-selector"
        />
      </div>
      <div class="form__field">
        <label for="email" class="form__label">
          Email address
        </label>
        <input
          v-model="formData.email"
          id="email"
          type="email"
          class="form__input"
          placeholder="Player's email address"
        />
      </div>
      <div class="form__field">
        <label for="language" class="form__label">
          Challenge language
        </label>
        <VueSelect
          v-model="formData.language"
          :options="languageOptions"
          :reduce="option => option.name"
          class="language-selector"
        />
      </div>
      <BaseButton variant="blue">Add player</BaseButton>
      <BaseSpinner v-if="loading" />
      <ErrorMessage v-else-if="error" :error="error" />
    </form>
  </DashboardModal>
</template>

<script>
import registration from "~/mixins/registration";
import { roleOptions } from "~/assets/util/options";

export default {
  mixins: [registration],
  props: {
    active: Boolean
  },
  data() {
    return {
      playerRole: "player",
      roleOptions
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
    async submitHandler() {
      if (!this.validateData()) return;
      this.loading = true;
      try {
        const { user: createdUser } = await this.$axios.$post("/api", {
          register: this.formData
        });
        await this.$axios.$post("/xapi", {
          addPlayer: {
            playerId: createdUser.id,
            role: this.playerRole
          }
        });
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
    this.formData.accountType = "individual";
    this.formData.country = this.user.country;
    this.formData.language = this.user.language;
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
