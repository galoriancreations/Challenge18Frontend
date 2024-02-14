<template>
    <div id="api_steps_container">

        <div id="content_container">
            <div id="content_inner_cont">
                <h2>{{ header }}</h2>
                <p>{{ paragraph }}</p>
            </div>
        </div>
        <div id="btns-container">
            <button v-if="displayButton" id="skip_btn" @click="skipButton">{{ skipButtonText }}</button>
            <button @click="prevPage" class="arrow_btns">
                <svg style="width: 20px; width: 20px; fill: #00459E;" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32">
                    <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                        data-name="4-Arrow Left" />
                </svg>
            </button>
            <button @click="nextPage" class="arrow_btns" style="background-color: #00459E;">
                <svg style="width: 20px; width: 20px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z"
                        data-name="3-Arrow Right" />
                </svg>
            </button>
        </div>
    </div>
</template>
  
<script>


export default {
    props: {
        header: String,
        paragraph: String,
        skipButtonText: String,
        displayButton: Boolean
    },

    data() {
        return {
        }
    },

    methods: {
        nextPage() {
            this.$emit('next-page');
        },
        prevPage() {
            this.$emit('prev-page');
        },
        skipButton() {
            this.$emit('skip-steps');
        }
    },
}
</script>
  
<style>
#api_steps_container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}


#content_container {
    width: 100%;
    display: flex;
    justify-content: center;
}

#content_inner_cont {
    width: 30%;
    line-height: 4rem;
    text-align: center;
    color: #00459e;
}

#btns-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.arrow_btns {
    display: flex;
    color: #00459E;
    border: 1px solid #00459E;
    border-radius: 12px;
    padding: 27px 30px;
}

#skip_btn {
    color: #00459e;
    padding: 27px 60px;
    align-items: center;
    font-weight: 600;
    border-radius: 12px;
    border: 1px solid #00459E;
}
</style>