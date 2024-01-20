export const state = () => ({
  messages: [],
  threads: [],
  thread: null,
  council: null,
});

export const mutations = {
  addMessage(state, message) {
    state.messages.push(message);
  },
  setMessages(state, messages) {
    if (!messages.length) {
      console.log('no messages found. from setMessages in store/chatbot.js');
      state.messages = [];
      return;
    }
    state.messages = messages.reverse();
  },
  setThreads(state, threads) {
    state.threads = threads;
  },
  setThread(state, thread) {
    state.thread = thread;
  },
  changeThreadTitle(state, payload) {
    const thread = state.threads.find((v) => v.id === payload.thread.id);
    thread.title = payload.title;
  },
  setCouncil(state, council) {
    state.council = council;
  },
};

export const actions = {
  async loadMessages(context, payload) {
    const { messages } = await this.$axios.$get(
      `/chatbot/messages/${payload.assistantId}/${payload.thread.id}`
    );
    context.commit('setMessages', messages);
  },
  async addMessage(context, message) {
    context.commit('addMessage', message);
  },
  async sendMessage(context, payload) {
    const { message } = await this.$axios.$post(
      `/chatbot/message/${payload.assistantId}/${payload.thread.id}`,
      {
        message: payload.text,
      }
    );
    context.commit('addMessage', message);
  },
  async loadThreads(context, assistantId) {
    const { threads } = await this.$axios.$get(
      `/chatbot/${assistantId}/threads`
    );
    context.commit('setThreads', threads);
  },
  async selectThread(context, payload) {
    context.commit('setThread', payload.thread);
    const { messages } = await this.$axios.$get(
      `/chatbot/messages/${payload.assistantId}/${payload.thread.id}`
    );
    context.commit('setMessages', messages);
  },
  async createThread(context, assistantId) {
    const { thread } = await this.$axios.$post('/chatbot/thread', {
      assistantId,
    });
    context.commit('setThreads', [...context.state.threads, thread]);
  },
  async deleteThread(context, thread) {
    await this.$axios.$delete(`/chatbot/thread/${thread.id}`);
    context.commit(
      'setThreads',
      context.state.threads.filter((v) => v.id !== thread.id)
    );
  },
  async changeThreadTitle(context, payload) {
    await this.$axios.$put(`/chatbot/thread/${payload.thread.id}`, {
      title: payload.title,
    });
    context.commit('changeThreadTitle', payload);
  },
  async selectCouncil(context, council) {
    const { council: response } = await this.$axios.$get(`/chatbot/council/${council.id}`);
    console.log(response);
    context.commit('setCouncil', response);
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
  council(state) {
    return state.council;
  },
};
