<template>
  <DashboardSection title="Account Details" class="account-details">
    <div class="account-details__grid">
      <div
        v-for="(label, key) in labels"
        :key="key"
        class="account-details__field"
      >
        <h4 class="account-details__title">
          {{ label }}
        </h4>
        <p class="account-details__text">
          {{
            (key === "country" ? countryText : user[key]) || "Not filled yet"
          }}
        </p>
      </div>
      <div class="account-details__field" v-if="languageText">
        <h4 class="account-details__title">Challenge language</h4>
        <p class="account-details__text">
          {{ languageText }}
        </p>
      </div>
      <div class="account-details__field">
        <h4 class="account-details__title">Membership plan</h4>
        <p class="account-details__text">
          {{ planText }}
        </p>
      </div>
    </div>
    <template slot="button">
      <ActionButton type="edit" color="blue" @click="showModal = true" />
    </template>
    <template slot="modal">
      <EditProfile :active="showModal" />
    </template>
  </DashboardSection>
</template>

<script>
import { labels, planOptions } from "../../assets/util/options";
import languageOptions from "../../assets/data/languages";
import countryOptions from "../../assets/data/countries";
import popupModal from "../../mixins/popup-modal";

export default {
  mixins: [popupModal],
  computed: {
    user() {
      return this.$store.getters.user;
    },
    labels() {
      return labels[this.user?.accountType];
    },
    isOrganization() {
      return this.user?.accountType === "organization";
    },
    languageText() {
      const matchingLanguage = languageOptions.find(
        language => language.name === this.user?.language
      );
      return matchingLanguage?.label;
    },
    countryText() {
      const matchingCountry = countryOptions.find(
        country => country.code === this.user?.country
      );
      return matchingCountry?.name;
    },
    planText() {
      const matchingPlan = planOptions.find(
        plan => plan.type === this.user?.plan
      );
      return matchingPlan?.label;
    }
  },
  provide() {
    return {
      labels: this.labels
    };
  }
};
</script>

<style lang="scss">
.account-details {
  &__grid {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2.5rem;

    @include respond(tablet-sm) {
      grid-template-columns: 1fr 1fr;
    }

    @include respond(mobile-land) {
      grid-template-columns: 1fr;
      row-gap: 2rem;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 600;

    @include respond(mobile) {
      font-size: 1.55rem;
    }
  }
}
</style>
