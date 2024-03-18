<template>
    <section :style="{
        backgroundImage:
            `linear-gradient(to top, rgba(65, 137, 189, 0.75), rgba(165, 137, 89, 10.75)), url(${currentImage})`}"
        >
        <div class="hyperCycle_intro">
            <div class="hyperCycle_top_intro">
                <div>
                    <h1>{{ hyperCycleData.hyperCycle_intro.title }}</h1>
                    <p>{{ hyperCycleData.hyperCycle_intro.description1 }}</p>
                    <p>{{ hyperCycleData.hyperCycle_intro.description2 }}</p>
                </div>
            </div>
            <div class="hyperCycle_main_intro">
                <div>
                    <h2>{{ hyperCycleData.hyperCycle_intro.hyperCycle.subtitle }}</h2>
                    <ul>
                        <li 
                            v-for="point in hyperCycleData.hyperCycle_intro.hyperCycle.keyPoints" :key="point"
                        >
                            {{ point }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="hyperCycle_links">
            <BaseButton variant="blue"> Unlock a Special NFT    </BaseButton>
            <BaseButton variant="blue"> Join Discord Community  </BaseButton>
            <BaseButton variant="blue"> Learn More              </BaseButton>
        </div>
    </section>
</template>

<script>

import hyperCycleData from '~/assets/data/hyperCycleIntro';

export default {
    data() {
        return {
            images: [
                '1.png',
                '2.png',
                '3.png',
                '4.png',
                '5.png',
                '6.png',
                '7.png',
                '8.png',
                '9.png',
                '10.png',
                '11.png',
                '12.png',
                '13.png',
                '14.png',
                '15.png',
                '16.png',
                '17.png',
                '18.png',
                '19.png',
                '20.png',
            ],
            currentImage: '',
            hyperCycleData,
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuth;
        },

    },
    mounted() {
        this.changeBackground();
    },
    methods: {
        changeBackground() {
            const randomIndex = Math.floor(Math.random() * this.images.length);
            this.currentImage = require(`~/static/${this.images[randomIndex]}`);
        },
    },
};
</script>

<style lang="scss">
section {
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.hyperCycle_intro {
    margin-top: 10%;
    height: inherit;
    display: flex;
    position: relative;
    justify-content: space-evenly;
    color: white;

    @include respond(mobile) {
        margin-top: 20%;
        flex-direction: column;
    }

    h1,
    h2 {
        background: linear-gradient(to left, #001bff, #ff7e5f, #ffd166, );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        text-align: center;
        text-decoration: underline;
        padding: 20px;
    }

    p,
    li {
        list-style: none;
        font-weight: 500;
        margin: 20px;
    }

    .hyperCycle_top_intro,
    .hyperCycle_main_intro {
        width: 27%;
        display: flex;
        justify-content: center;
        box-shadow: $boxshadow1;
        border-radius: 50px;

        div {
            text-align: center;
        }

        @include respond(mobile) {
            width: fit-content;
            box-shadow: none;
        }

        @include respond(tablet) {
            width: fit-content;
            box-shadow: none;
            margin-top: 10%;
        }
    }
}

.hyperCycle_links {
    margin: auto;
    display: flex;
    position: relative;
    height: 120px;
    width: 50%;

    @include respond(tablet) {
        width: 90%;
        display: flex;
        justify-content: center;
    }

    button {
        width: fit-content;
        box-shadow: $boxshadow1;
        background-color: white;
        color: $color-azure;
        transition: 0.5s;


        @include respond(mobile) {
            margin: 5px;
            height: 80px;
            color: white;
            background-color: transparent;
            transition: 5s all;
            text-transform: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @include respond(tablet) {
            color: white;
            background-color: transparent;
            text-transform: none;
            width: fit-content;
            margin: 5px;
        }

        &:hover {
            background-color: transparent;
            color: white;
        }
    }
}
</style>
