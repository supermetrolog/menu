import { createStore } from 'vuex'
import User from './modules/User'
import Products from './modules/Products'
const store = createStore({
    state: {},
    mutations: {},
    actions: {

    },
    getters: {},
    modules: {
        User,
        Products
    }
})
store.checkAction = function(name) {
    return Object.keys(this._actions).includes(name);
};
export default store