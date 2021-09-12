import uniqid from "uniqid";

const timeouts = {};

export const state = () => ({
    items: []
});

export const mutations = {
    addItem(state, item) {
        state.items.push(item);
    },
    removeItem(state, itemId) {
        state.items = state.items.filter(item => item.id !== itemId);
    },
    clearItems(state) {
        state.items = [];
    }
};

export const actions = {
    addItem(context, payload) {
        let newItem = { id: uniqid() };
        if (typeof payload === "string") {
            newItem.html = payload;
        } else {
            newItem = { ...newItem, ...payload };
        }
        context.commit("addItem", newItem);
        if (!newItem.noAutoDismiss) {
            timeouts[newItem.id] = setTimeout(
                () => context.dispatch("removeItem", newItem.id),
                20000
            );
        }
    },
    removeItem(context, itemId) {
        context.commit("removeItem", itemId);
        clearTimeout(timeouts[itemId]);
    },
    clearItems(context) {
        context.commit("clearItems");
        for (let itemId in timeouts) {
            clearTimeout(timeouts[itemId]);
        }
    }
};

export const getters = {
    items(state) {
        return state.items;
    }
};