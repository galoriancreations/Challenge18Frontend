<template>
  <messegesSection :title="groupId.name" class="my-messeges">
    <BotMessage :msginfo="botMessage"/>
    <br>
    <div v-if="hasMessages" class="my-messeges__empty">
      <p>Messages will appear here.</p>
      <p>Click the input below to create your first message.</p>
    </div>
    
    <div v-else class="messageSection">
      <div class="messageSection__flip">
      <messages :key="message.index" v-for="message in Messeges"
        :msginfo="message"
      />
    </div>
    </div>
    <div class="myInput">
      <input class="myInput__input" type="text" placeholder="enter message here" v-model="input" @keyup.enter="sendMessage">
      <button class="myInput__button" @click = 'sendMessage'>▶</button>
    </div>
          
  </messegesSection>
</template>

<script>
import BotMessage from './botMessage.vue';




export default {
    props: {},
    data() {
        return {
            title: 'Group Chat',
            Messeges: [],
            botMessage: 'bot message',
            input: '',
            loadNewMessage: {timeout: null},
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        groupId() {
            return this.$cookies.get("groupId");
        },
        hasMessages() {
            return this.groupId?.messages && this.groupId.messages.length > 0;
        },
    },
    methods: {
        autoLoadData() {
            
            clearTimeout(this.loadNewMessage.timeout);
            this.loadNewMessage.timeout = setTimeout(async () => {
                try {
                    await this.groupMessages();
                } catch (err) {
                    error(err);
                }
            }, 20000);
        },
        async groupMessages() {
            const groupId = this.$cookies.get("groupId");
            const res = await this.$axios.$post("/xapi", {
                loadGroup: groupId
            });
            this.botMessage = res.botMessage;
            let myMessages = res.messages;
            myMessages.forEach((val, ind) => {
                if (!val.nickname) {
                    val.nickname = val.user;
                }
                if (val.user == this.user._id) {
                    val.myMessage = true;
                    val.index = ind;
                }
                else if (val.user == 'Ting Global Bot') {
                    val.botMessage = true;
                    val.index = ind;
                }
                else {
                    val.index = ind;
                    val.myMessage = false;
                    val.botMessage = false;
                }
            });
            this.Messeges = myMessages;
        },
        async sendMessage() {
            const groupid = this.groupId._id;
            let message = this.input;
            let longMessage = false;
            if (message.length <= 0) {
                console.log('message to short');
                longMessage = !longMessage;
            }
            else if (message.length >= 27) {
                if (message.length >= 300) {
                    console.log('message to long');
                    longMessage = !longMessage;
                }
                else {
                    let num = 1;
                    for (let i = 0; i < message.length; i++) {
                        if (message[i] == ' ') {
                            num = 1;
                        }
                        else if (num == 27) {
                            const part1 = message.slice(0, i);
                            const part2 = message.slice(i, message.length + 1);
                            message = part1 + '\n' + part2;
                            num = 1;
                            i++;
                        }
                        else {
                            num++;
                        }
                    }
                }
            }
            if (!longMessage) {
                const response = await this.$axios.$post("/xapi", { sendMessage: {
                        message: message,
                        _id: groupid
                    } });
                this.input = '';
                let myMessages = response;
                myMessages.forEach((val, ind) => {
                    if (!val.nickname) {
                        val.nickname = val.user;
                    }
                    if (val.user == this.user._id) {
                        val.myMessage = true;
                        val.index = ind;
                    }
                    else if (val.user == 'Ting Global Bot') {
                        val.botMessage = true;
                        val.index = ind;
                    }
                    else {
                        val.index = ind;
                        val.myMessage = false;
                        val.botMessage = false;
                    }
                });
                
                this.Messeges = myMessages;
            }
        },
    },
    created() {
        this.groupMessages();
        // this.autoLoadData()
                        //turn on before push!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    },
    provide() {
        return {
            loadNewMessage: this.loadNewMessage,
            deleteSelected: this.deleteSelected
        };
    },
    components: {BotMessage}
};
</script>

<style lang="scss">
.my-messeges {
  &__empty {
    p {
      text-align: center;
      font-size: 1.85rem;

      @include respond(mobile) {
        font-size: 1.6rem;
      }

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}
.myInput{
  &__input {
    height: 50px;
    border-radius: 10px;
    outline: unset;
  }
  &__button {
    width: 50px;
    background-color: #1d20e1;
    border-radius: 10px;
    color: white;
    font-size: x-large;
  }
  border: black 1px solid;
    display: flex;
    width: 300px;
    margin: 40px auto auto auto;
    background: rgba(25,25,171,0.12157);
    border-radius: 10px;
    justify-content: space-between;
}
.messageSection{
    &__flip{
        
        display: flex;
        flex-direction: column;
        padding-left: 10px;
    }
    display: flex;
    flex-direction: column-reverse;
    overflow: auto;
    max-height: 500px;
}
</style>
