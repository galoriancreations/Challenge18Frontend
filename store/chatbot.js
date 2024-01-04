export const state = () => ({
  messages: [],
});

export const mutations = {
  addMessage(state, payload) {
    state.messages.push(payload);
  },
};

export const actions = {
  async loadMessages(context) {
    const messages = await this.$axios.$get('/chatbot/messages');
    messages.forEach((message) => {
      context.commit('addMessage', message);
    });
  },
  async sendMessage(context, payload) {
    const message = await this.$axios.$post('/chatbot/message', {
      message: payload,
    });
    context.commit('addMessage', message);
  },
};

export const getters = {
  messages(state) {
    return state.messages;
  },
};
