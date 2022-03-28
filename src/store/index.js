import { createStore } from 'vuex'
import User from './modules/User'
const store = createStore({
    state: {},
    mutations: {},
    actions: {

    },
    getters: {},
    modules: {
        User,
    }
})
store.checkAction = function(name) {
    return Object.keys(this._actions).includes(name);
};
export default store