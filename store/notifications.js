import { newNotification } from "~/assets/util/functions";

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
    setItems(state, items) {
        state.items = items;
    },
    clearItems(state) {
        state.items = [];
    }
};

export const actions = {
    addItem(context, item) {
        const newItem = newNotification(item);
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
    setItems(context, items) {
        context.dispatch("clearItems");
        const newItems = items.map(item => newNotification(item));
        context.commit("setItems", newItems);
        for (let item of newItems) {
            timeouts[item.id] = setTimeout(
                () => context.dispatch("removeItem", item.id),
                20000
            );
        }
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