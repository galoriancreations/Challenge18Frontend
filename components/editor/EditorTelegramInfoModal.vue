<template>
    <popup-modal title="Integration Steps" :active="active" :scrollbar="false" style="display: flex; justify-content: flex-start; align-items: start;">
        <div>
            <ol id="order_list">
                <li>Generate an invite link for your group on Ting Global.</li>
                <li>Create a group on Telegram.</li>
                <li>Add the Ting Global bot to the Telegram group.</li>
                <li>In the Telegram group, send the command `/connect` followed by the invite link for Ting Global.</li>
                <li>Go to the Ting Global group and confirm the connection with Telegram using the command `/telegram`
                    followed by the link to the Telegram group.
                </li>
                <li>Return to the Telegram group and finish the process using the command `/activate` with links for Ting
                    Global and Telegram groups.
                </li>
            </ol>
        </div>
        <base-button variant="blue" @click="closeInfoModal" title="Close" class="base-button-info"> Got it </base-button>

    </popup-modal>
</template>

<script>

import PopupModal from '../layout/PopupModal.vue'
import ActionButton from '../UI/ActionButton.vue'
import BaseButton from '../UI/BaseButton.vue'
import SectionHeading from '../layout/SectionHeading.vue'


export default {
    components: { ActionButton, PopupModal, BaseButton, SectionHeading },
    props: {
        active: Boolean,
    },
data() {
    return {

    }
},
    methods: {
        closeInfoModal() {
            this.$emit('toggleInfoModel');
        }
    }

}
</script>

<style>
#order_list {
    text-align: left;
}

.base-button-info {
    width: 15px;
    height: 50px;
    text-transform: none;
}

li {
    margin-bottom: 20px;
}

</style>