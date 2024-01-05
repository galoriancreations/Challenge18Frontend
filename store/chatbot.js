export const state = () => ({
  messages: [],
});

export const mutations = {
  addMessage(state, message) {
    state.messages.push(message);
  },
  loadMessages(state, messages) {
    state.messages = messages.reverse();
  },
};

export const actions = {
  async loadMessages(context) {
    const { messages } = await this.$axios.$get('/chatbot/messages');
    context.commit('loadMessages', messages);
  },
  async addMessage(context, message) {
    context.commit('addMessage', message);
  },
  async sendMessage(context, text) {
    const { message } = await this.$axios.$post('/chatbot/message', {
      message: text,
    });
    context.commit('addMessage', message);
  },
};

export const getters = {
  messages(state) {
    return state.messages;
  },
};
