export const state = () => ({
  messages: [],
  council: null,
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
    state.council.threads = threads;
  },
  setThread(state, thread) {
    state.thread = thread;
  },
  changeThreadTitle(state, { thread, title }) {
    const _thread = state.council.threads.find((v) => v.id === thread.id);
    _thread.title = title;
  },
  setCouncil(state, council) {
    state.council = council;
  },
};

export const actions = {
  async loadMessages(context, { assistant, thread }) {
    const { messages } = await this.$axios.$get(
      `/chatbot/messages/${assistant.id}/${thread.id}`
    );
    context.commit('setMessages', messages);
  },
  async addMessage(context, message) {
    context.commit('addMessage', message);
  },
  async sendMessage(context, { thread, assistant, text }) {
    const { message } = await this.$axios.$post(
      `/chatbot/message/${assistant.id}/${thread.id}`,
      {
        message: text,
      }
    );
    context.commit('addMessage', message);
  },
  async selectThread(context, { assistant, thread }) {
    context.commit('setThread', thread);
    const { messages } = await this.$axios.$get(
      `/chatbot/messages/${assistant.id}/${thread.id}`
    );
    context.commit('setMessages', messages);
  },
  async createThread(context, assistant) {
    const { thread } = await this.$axios.$post('/chatbot/thread', {
      assistantId: assistant.id,
    });
    context.commit('setThreads', [...context.state.council.threads, thread]);
  },
  async deleteThread(context, { assistant, thread }) {
    await this.$axios.$delete(`/chatbot/thread/${assistant.id}/${thread.id}`);
    context.commit(
      'setThreads',
      context.state.council.threads.filter((v) => v.id !== thread.id)
    );
  },
  async changeThreadTitle(context, { assistant, thread, title }) {
    await this.$axios.$put(`/chatbot/thread/${assistant.id}/${thread.id}`, {
      title: title,
    });
    context.commit('changeThreadTitle', { thread, title });
  },
  async selectCouncil(context, council) {
    const { assistant } = await this.$axios.$get(
      `/chatbot/assistant/${council.id}`
    );
    context.commit('setCouncil', assistant);
    context.commit('setThreads', assistant.threads);
  },
};

export const getters = {
  messages(state) {
    return state.messages;
  },
  council(state) {
    return state.council;
  },
  threads(state) {
    return state.council?.threads;
  },
  thread(state) {
    return state.thread;
  },
};
