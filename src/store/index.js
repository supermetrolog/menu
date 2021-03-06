import { createStore } from 'vuex'
import User from './modules/User'
import Products from './modules/Products'
import axios from 'axios'
const store = createStore({
    state: {
        windwoScrollTop: null,
        scrollingTimer: null,
        isScrollingNow: false,
    },
    mutations: {
        setWindowScrollTop(state, data) {
            state.windwoScrollTop = data;
        },
        setScrolling(state) {
            if (state.scrollingTimer) {
                clearTimeout(state.scrollingTimer);
            }
            state.isScrollingNow = true;
            console.log('fuck', state.isScrollingNow);
            state.scrollingTimer = setTimeout(() => {
                state.isScrollingNow = false;
                console.log(state.isScrollingNow);
            }, 600);
        }
    },
    actions: {
        SET_WINDOW_SCROLL_TOP({ commit }, data) {
            commit('setWindowScrollTop', data);
        },
        SET_SCROLLING({ commit }) {
            commit('setScrolling');
        },
        async INIT(context) {
            console.log('INIT');
            if (!localStorage.getItem("user") || localStorage.getItem("user") == 'undefined') {
                // console.error('User not found in localStorage!');
                return false;
            }
            await context.dispatch("SET_USER");
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${context.getters.THIS_USER.access_token}`;
        },
        DESTROY(context) {
            console.log('DESTROY');
            context.dispatch("DROP_USER");
        },
    },
    getters: {
        WINDOW_SCROLL_TOP(state) {
            return state.windwoScrollTop;
        },
        IS_SCROLLING_NOW(state) {
            return state.isScrollingNow;
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