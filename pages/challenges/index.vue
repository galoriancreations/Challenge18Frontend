<template>
    <Page title="Challenges" name="challenges">
        <section class="challenges-intro">
            <p>
                Join or create any community below to receive daily tasks that will lead
                you on your journey to change!
            </p>
        </section>
        <h2 style="text-align: center;">Top Challenges</h2>
        <div class="challenges_container">
            <button @click="scrollLeft('challengesGrid')" class="scroll_btns">
                &larr;
            </button>
            <div class="challenges-grid" ref="challengesGrid">
                <div class="challenges_inner_container">
                    <TopChallengesItem 
                        v-for="item in challenges" 
                        :key="item.popupLessView.title" 
                        :challenge="item" 
                    />
                </div>
            </div>
            <button @click="scrollRight('challengesGrid')" class="scroll_btns">
                &#8594;
            </button>
        </div>
        <!-- Rendering Scroller With Courses Base On Categories Name -->
        <h1 id="section_header">Coming Soon</h1>

        <div v-for="(item, index) in categories" :key="item.categoryName">
            <!-- <h2 style="text-align: center;">{{ item.categoryName }}</h2> -->
            <div class="challenges_container">
                <button 
                    class="scroll_btns"
                    @click="scrollLeft(`${index}`)" 
                > 
                    &larr; 
                </button>
                <div class="challenges-grid" :ref="`${index}`">
                    <div class="challenges_inner_container">
                        <Courses 
                            v-for="courses in item.challenges" 
                            :key="courses.popupLessView.title"
                            :courses="courses" 
                        />
                    </div>
                </div>
                <button 
                    class="scroll_btns"
                    @click="scrollRight(`${index}`)" 
                > 
                    &#8594; 
                </button>
            </div>
        </div>

    </Page>
</template>

<script>

import challenges from "~/assets/data/challenges_v2";
import courses from "~/assets/data/courses";
import Courses from '../Courses.vue';

export default {
    components: { Courses },
    data() {
        return {
            challenges,
            categories: Object.entries(courses.category).map(([categoryName, challenges]) => ({
                categoryName,
                challenges
            })),
        };
    },
    methods: {
        scrollRight(containerRef) {
            const targetElement = this.$refs[containerRef] ? this.$refs[containerRef][0] : null;

            if (targetElement) 
            {
                targetElement.scrollLeft += this.mobileMode ? 435 : 930;
            } 
            else if(containerRef)
            {
                this.$refs[containerRef].scrollLeft += this.mobileMode ? 435 : 930;
            }
        },
        scrollLeft(containerRef) {
            const targetElement = this.$refs[containerRef] ? this.$refs[containerRef][0] : null;

            if (targetElement) 
            {
                targetElement.scrollLeft -= this.mobileMode ? 435 : 930;
            } 
            else if(containerRef)
            {
                this.$refs[containerRef].scrollLeft -= this.mobileMode ? 435 : 930;
            }
        },
    },

    computed: {
        mobileMode() {
            return window.innerWidth <= 767;
        },
    }
};
</script>

<style lang="scss">
.challenges-intro {
    max-width: 80rem;
    margin: auto;
    font-size: 2rem;
    text-align: center;
    line-height: 1.7;
    margin-bottom: 8rem;

    p {
        font-size: inherit;
        line-height: inherit;
    }
}

 #section_header {
   margin: auto;
   width: fit-content;
   border-radius: 20px;
   padding: 10px;
   background: linear-gradient(to right, #007bff, #ff7e5f, #ffd166);
   box-shadow: 2px 2px 2px 2px lightgray;
   // margin-bottom: 30px;
   transition: all 0.4s;
   color: white;
   user-select: none;
   font-family: Verdana, Geneva, Tahoma, sans-serif;
   cursor: default;

   &:hover {
            transform: scale(0.9);
            z-index: 1;
        }
 }

.challenges-grid {
    display: flex;
    width: fit-content;
    align-items: center;
    padding: 50px 0;
    scroll-behavior: smooth;
    overflow: hidden;

    @include respond(mobile) {
        margin-right: -15%;
        margin-left: -41%;
    }
}

.challenges_container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;


    .challenges_inner_container {
        display: flex;
        align-items: center;
        gap: 6.5rem;
        padding: 20px;


        @include respond(mobile) {
            display: flex;
            gap: 35px;
        }
    }

    .scroll_btns {
        font-size: 40px;

        @include respond(mobile) {
            z-index: 1;
            padding-right: 10px;
            font-size: 30px;
        }
    }

}
</style>
