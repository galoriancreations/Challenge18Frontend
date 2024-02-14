<template>
    <div class="top-challenges__item">
        <button class="top-challenges__img" @click="showModal = true">
            <div  class="cart-container">
                <img :src="image" :alt="challenge.title" />
                <p v-for="paragraph in text" :key="paragraph" style="font-size: 14px;">{{ paragraph }}</p>
                <div v-if="modalHeight" class="btns_container">
                    <BaseButton v-if="!exapnd" :variant="link ? 'blue' : 'darkblue'" @click="buttonClickHandler"
                        class="btns-style">
                        <i v-if="loading" />
                        Join a Challenge
                    </BaseButton>
                    <BaseButton v-if="!link" variant="blue" @click="createChallenge" class="btns-style">
                        <i v-if="creating" />
                        Create a Challenge
                    </BaseButton>
                </div>
            </div>

        </button>
        <PopupModal :active="showModal" class="top-challenges__modal" :height="modalHeight">
            <img :src="image" :alt="challenge.title" width="30%" />
            <h2 class="top-challenges__title">
                {{ challenge.title }}
            </h2>
            <div class="top-challenges__text">
                <p v-for="paragraph in textPopUp" :key="paragraph">
                    {{ paragraph }}
                </p>
            </div>
            <div class="top-challenges__buttons">
                <BaseButton v-if="!exapnd" :variant="link ? 'blue' : 'darkblue'" @click="buttonClickHandler">
                    <i v-if="loading" class="fas fa-circle-notch fa-spin" />
                    <span v-else>{{ challenge.linkText || "Join a challenge" }}</span>
                </BaseButton>
                <BaseButton v-if="!link" variant="blue" @click="createChallenge">
                    <i v-if="creating" class="fas fa-circle-notch fa-spin" />
                    <span v-else>Create a challenge</span>
                </BaseButton>
            </div>
            <div v-if="exapnd" class="top-challenges__list-wrapper">
                <SectionSeperator />
                <h3 v-if="!error" class="top-challenges__list-title">
                    Choose a challenge:
                </h3>
                <ErrorMessage v-if="error" :error="error" />
                <div v-else class="top-challenges__list">
                    <v-app>
                        <v-data-table :headers="tableHeaders" :items="challengeItems" class="elevation-2"
                            hide-default-footer disable-pagination>
                            <template v-slot:[`item.link`]="{ item }">
                                <DashboardButton type="join" :showLabel="false" @click="joinChallenge(item.link)" />
                            </template>
                        </v-data-table>
                    </v-app>
                </div>
            </div>
            <!-- <BaseButton v-if="!link" variant="blue" @click="createChallenge">
        <i v-if="creating" class="fas fa-circle-notch fa-spin" />
        <span v-else>Create a challenge</span>
      </BaseButton> -->
        </PopupModal>
    </div>
</template>

<script>
import moment from "moment";
import popupModal from "~/mixins/popup-modal";

export default {
    mixins: [popupModal],
    props: {
        challenge: Object
    },

    data() {
        return {
            exapnd: false,
            challenges: [],
            loading: false,
            creating: false,
            error: null,
            modalHeight: null,
        };
    },

    computed: {
        image() {
            return require(`~/assets/images/logos/${this.challenge.popupLessView?.image}`)
        },
        text() {
            return this.challenge.popupLessView?.text.split("\n");
        },

        textPopUp() {
            return this.challenge.popupView?.text.split("\n");
        },
        isLoggedIn() {
            return this.$store.getters.isAuth;
        },
        link() {
            return this.challenge.popupLessView?.link;
        },
        tableHeaders() {
            return [
                { text: "Organization", value: "creator" },
                { text: "Language", value: "language" },
                { text: "Start date", value: "start" },
                { text: "Join", value: "link", sortable: false, align: "center" }
            ];
        },
        challengeItems() {
            return this.challenges.map(challenge => ({
                ...challenge,
                start: moment(new Date(challenge.date)).format("ll"),
                link: challenge.platforms.wa.invite
            }));
        }
    },
    methods: {
        async buttonClickHandler() {
            if (this.challenge.popupLessView.link) {
                this.$router.push(this.challenge.popupLessView.link);
            } else if (!this.loading) {
                this.loading = true;
                try {
                    this.challenges = await this.$axios.$post("/api", {
                        getChallengesByName: this.challenge.popupLessView.names || [this.challenge.popupLessView.title]
                    });
                    this.error = null;
                } catch (error) {
                    this.error = error;
                }
                this.exapnd = true;
            }
        },
        joinChallenge(link) {
            window.open(link, "_blank");
        },
        async createChallenge() {
            this.creating = true;
            try {
                const templateId = await this.$axios.$post("/api", {
                    getPublicTemplateID: this.challenge.popupLessView.names || [this.challenge.popupLessView.title]
                });
                this.$cookies.set("selectedTemplate", templateId);
                this.$cookies.remove("draftId");
                this.$cookies.remove("challengeId");
                this.$router.push("/editor");
            } catch (error) {
                this.exapnd = true;
                this.error = error;
                this.creating = false;
            }
        }
    },
    watch: {
        exapnd(value) {
            if (value) {
                this.modalHeight = "85vh";
            }
        }
    },
    mounted() {
        const height = this.$el.querySelector(".modal__wrapper")?.offsetHeight;
        if (height) {
            this.modalHeight = `${height}px`;
        }
    }
};
</script>

<style lang="scss">
.top-challenges {
    &__img {
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 0.8rem;
        box-shadow: $boxshadow2;
        height: 400px;
        width: 400px;
        padding: 20px;
        transition: all 0.4s;

        @include respond(mobile) {
            margin: auto;
        }

        &:hover {
            transform: scale(0.9);
            z-index: 1;
        }

        .cart-container {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 20px;
            margin: 10%;

            img {
                height: fit-content;
                width: 80%;
                border-radius: 10px;
            }

            .btns_container {
                display: flex;
                justify-content: center;
                width: 200px;
                gap: 10px;
                align-items: center;
            }

            .btns-style {
                font-size: 12px;
            }
        }
    }

    &__title {
        color: $color-blue-2;
        font-size: 3.5rem;
        margin-top: 0px;
        display: none;

        @include respond(mobile) {
            font-size: 2.5rem;
        }
    }

    &__text {
        p {
            &:not(:last-child) {
                margin-bottom: 2rem;
            }
        }
    }

    &__modal {
        .section-seperator {
            // margin: 5rem 0;

            @include respond(mobile) {
                margin: 3.5rem 0;
            }
        }
    }

    &__buttons {
        margin-top: 3rem;
        display: flex;
        justify-content: center;

        @include respond(mobile-land) {
            flex-direction: column;
            align-items: center;
        }

        .button {
            margin: 0;
            width: 26.5rem;

            @include respond(mobile) {
                width: 100%;
            }

            &:not(:last-child) {
                margin-right: 1rem;

                @include respond(mobile-land) {
                    margin-right: 0;
                    margin-bottom: 1rem;
                }
            }
        }
    }

    &__list {
        text-align: left;

        .dashboard-button {
            margin: auto !important;
        }
    }

    &__list-title {
        margin-bottom: 2rem;
    }
}
</style>