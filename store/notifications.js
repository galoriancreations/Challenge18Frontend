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

export const getters = {
    items(state) {
        return state.items;
    }
};