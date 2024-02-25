<template>
    <div class="top-challenges__item">
        <button class="top-challenges__img" @click="showModal = true">
            <div class="campusIL_courses_container">
                <img :src="image" :alt="courses.title"/>
                <h4 style="text-align: start;">{{ title }}</h4>
                <p 
                    v-for="paragraph in text" :key="paragraph" 
                    style="font-size: 14px; text-align: start; color: #999999;"
                >
                    {{ paragraph }}
                </p>
                <div class="btns_container">
                    <p 
                        v-if="buttonText" 
                        @click="createChallenge" 
                        variant="blue" 
                        class="btns-style"
                    > 
                        {{ buttonText }}
                    </p>
                    <p 
                        v-if="buttonText2" 
                        @click="createChallenge" 
                        variant="blue" 
                        class="btns-style"
                    > 
                        {{ buttonText }}
                    </p>
                </div>
            </div>
        </button>
        
        <PopupModal :active="showModal" class="top-challenges__modal" >
            <img :src="image" :alt="courses.title" width="30%" />
            <h2 class="top-challenges__title">
                {{ courses.title }}
            </h2>
            <div class="top-challenges__text">
                <p v-for="paragraph in textPopUp" :key="paragraph">
                    {{ paragraph }}
                </p>
            </div>
            <div class="top-challenges__buttons">
                <BaseButton v-if="!exapnd" :variant="link ? 'blue' : 'darkblue'" @click="buttonClickHandler">
                    <i v-if="loading" class="fas fa-circle-notch fa-spin" />
                    <span v-else>{{ courses.linkText || "Join a challenge" }}</span>
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
        </PopupModal>
    </div>
</template>

<script>
import moment from "moment";
import popupModal from "~/mixins/popup-modal";
import s3AssetsMixin from "~/mixins/s3AssetsMixin";

export default {
    mixins: [popupModal, s3AssetsMixin],
    props: {
        courses: Object
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
            return this.s3AssetsGenerator(`images/Courses/${this.courses.popupLessView?.image}`);
        },
        text() {
            return this.courses.popupLessView?.text.split("\n");
        },
        title() {
            return this.courses.popupLessView?.title;
        },
        buttonText() {
            return this.courses.popupLessView?.buttonText;
        },
        buttonText2() {
            return this.courses.popupLessView?.buttonText2;
        },
        textPopUp() {
            return this.courses.popupView?.text.split("\n");
        },
        isLoggedIn() {
            return this.$store.getters.isAuth;
        },
        link() {
            return this.courses.popupLessView?.link;
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
            if (this.courses.popupLessView.link) {
                this.$router.push(this.courses.popupLessView.link);
            } else if (!this.loading) {
                this.loading = true;
                try {
                    this.courses = await this.$axios.$post("/api", {
                        getChallengesByName: this.courses.popupLessView.names || [this.courses.popupLessView.title]
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
                    getPublicTemplateID: this.courses.popupLessView.names || [this.courses.popupLessView.title]
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
      
        &:hover {
            transform: scale(0.9);
            z-index: 1;
        }
   
      
        .campusIL_courses_container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 10%;

            img {
                height: 150px;  
                width: 90%;
                margin-bottom: 40px;
                border-radius: 10px;
                box-shadow: 2px 2px 2px 2px lightgray;
            }

            .btns_container {
                display: flex;
                width: fit-content;
                gap: 10px;
            }

            .btns-style {
                font-size: 12px;
                line-height: 16px;
                font-weight: 400;
                display: flex;
                width: fit-content;
                padding: 6px;
                border-radius: 20px;
                width: fit-content;
                color: black;
                background: #f2f2f2;
            }
        }
    }
}

</style>