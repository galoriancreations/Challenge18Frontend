export const state = () => ({
    items: []
});

export const mutations = {
    addItem(state, item) {
        state.items.push(item);
    },
    removeItem(state, itemId) {
        state.items = state.items.filter(item => item.id !== itemId);
    }
};

export const actions = {
    addItem(context, item) {
        context.commit("addItem", item);
        if (!item.noAutoDismiss) {
            setTimeout(() => context.dispatch("removeItem", item.id), 20000);
        }
    },
    removeItem(context, itemId) {
        context.commit("removeItem", itemId);
    }
};

export const getters = {
    items(state) {
        return state.items;
    }
};