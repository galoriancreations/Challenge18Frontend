<template>
    <popup-modal title="Integration Steps" :active="active" :scrollbar="false"
        style="display: flex; justify-content: center; align-items: center;">
        <div id="container">
            <div id="contain" :class="{ Right: disableRight, Left: disableLeft }">
                <div class="items" v-if="page > 0">
                    <h3>{{ steps[page - 1] }}</h3>
                </div>
                <div class="items">
                    <h3>{{ steps[page] }}</h3>
                </div>
                <div class="items" v-if="page < 5">
                    <h3>{{ steps[page + 1] }}</h3>
                </div>
            </div>
        </div>

        <base-button v-if="page > 0" variant="blue" @click="previousPage" title="Back" class="base-button-info">Previous
            page</base-button>
        <base-button v-if="page < 5" variant="blue" @click="nextPage" title="Next" class="base-button-info">Next
            page</base-button>
        <base-button v-else variant="blue" @click="closeInfoModal" title="Close"
            class="base-button-info">Close</base-button>
    </popup-modal>
</template>

<script>
import PopupModal from '../layout/PopupModal.vue'
// import ActionButton from '../UI/ActionButton.vue'
import BaseButton from '../UI/BaseButton.vue'
// import SectionHeading from '../layout/SectionHeading.vue'

export default {
    components: { PopupModal },
    props: {
        active: Boolean,
    },
    data() {
        return {
            page: 0,
            steps: [
                'Generate an invite link for your group on Ting Global.',
                'Create a group on Telegram.',
                'Add the Ting Global bot to the Telegram group.',
                'In the Telegram group, send the command `/connect` followed by the invite link for Ting Global.',
                'Go to the Ting Global group and confirm the connection with Telegram using the command `/telegram followed by the link to the Telegram group.`',
                'Return to the Telegram group and finish the process using the command `/activate` with links for Ting Global and Telegram groups.'
            ],
            disableRight: false,
            disableLeft: false
        }
    },
    methods: {
        closeInfoModal() {
            this.page = 0
            this.$emit('toggleInfoModel');
        },
        nextPage() {
            if (!this.disableRight) {
                this.page++
                this.disableRight = true
                setTimeout(() => {
                    this.disableRight = false
                }, 750)
            }
            // items.style.marginLeft = '300px'
        },
        previousPage() {
            if (!this.disableLeft) {
                this.page--
                this.disableLeft = true
                setTimeout(() => {
                    this.disableLeft = false
                }, 750)
            }
        }
    }
}
</script>

<style lang="scss">
#contain {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 7px;
}

#container {
    overflow: hidden;
    margin-bottom: 50px;
}

.Right {
    animation: goRight 750ms both;
}

.Left {
    animation: goLeft 750ms both;
}



.items {
    min-width: 500px;
    max-width: 500px;
    margin-right: 30px;
}

.base-button-info {
    width: 15px;
    height: 50px;
    text-transform: none;
    display: inline-block;
}

li {
    margin-bottom: 20px;
}
</style>









