import { createStore } from 'vuex'
import User from './modules/User'
import Products from './modules/Products'
const store = createStore({
    state: {
        windwoScrollTop: null,
    },
    mutations: {
        setWindowScrollTop(state, data) {
            state.windwoScrollTop = data;
        }
    },
    actions: {
        SET_WINDOW_SCROLL_TOP({ commit }, data) {
            commit('setWindowScrollTop', data);
        }
    },
    getters: {
        WINDOW_SCROLL_TOP(state) {
            return state.windwoScrollTop;
        }
    },
    modules: {
        User,
        Products
    }
})
store.checkAction = function(name) {
    return Object.keys(this._actions).includes(name);
};
export default store