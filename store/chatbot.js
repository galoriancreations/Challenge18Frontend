export const state = () => ({
  messages: [],
  threads: [],
  thread: null,
});

export const mutations = {
  addMessage(state, message) {
    state.messages.push(message);
  },
  setMessages(state, messages) {
    state.messages = messages.reverse();
  },
  setThreads(state, threads) {
    state.threads = threads;
  },
  setThread(state, thread) {
    state.thread = thread;
  },
};

export const actions = {
  async loadMessages(context, thread) {
    const { messages } = await this.$axios.$get(
      `/chatbot/messages/${thread.id}`
    );
    context.commit('setMessages', messages);
  },
  async addMessage(context, message) {
    context.commit('addMessage', message);
  },
  async sendMessage(context, payload) {
    console.log('dispatching message sendMessage', payload);
    const { message } = await this.$axios.$post(
      `/chatbot/message/${payload.thread.id}`,
      {
        message: payload.text,
      }
    );
    context.commit('addMessage', message);
  },
  async loadThreads(context) {
    const { threads } = await this.$axios.$get('/chatbot/threads');
    context.commit('setThreads', threads);
  },
  async selectThread(context, thread) {
    context.commit('setThread', thread);
    const { messages } = await this.$axios.$get(`/chatbot/messages/${thread.id}`);
    context.commit('setMessages', messages);
  },
  async createThread(context) {
    const { thread } = await this.$axios.$post('/chatbot/thread');
    context.commit('setThreads', [...context.state.threads, thread]);
  },
  async deleteThread(context, thread) {
    await this.$axios.$delete(`/chatbot/thread/${thread.id}`);
    context.commit(
      'setThreads',
      context.state.threads.filter((v) => v.id !== thread.id)
    );
  },
};

export const getters = {
  messages(state) {
    return state.messages;
  },
  threads(state) {
    return state.threads;
  },
  thread(state) {
    return state.thread;
  },
};
