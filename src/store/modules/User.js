import api from "@/api/api";

const User = {
    state: {
        thisUser: null,
    },
    mutations: {
        setUser(state, user) {
            state.thisUser = user;
        },
    },
    actions: {
        SET_USER(context) {
            if (!context.getters.THIS_USER) {
                let user = JSON.parse(localStorage.getItem('user'));
                user.access_token = localStorage.getItem('access_token');
                context.commit('setUser', user);
            }
            return context.getters.THIS_USER;
        },
        DROP_USER(context) {
            console.log("DROP_USER");
            context.commit('setUser', null);
        },
        async LOGIN(context, formdata) {
            const response = await api.user.auth.login(formdata);
            if (response !== false) {
                context.dispatch('SET_USER');
            }
            return response;
        },
        async LOGOUT(context) {
            const response = await api.user.auth.logout();
            context.dispatch('DROP_USER');
            return response;
        },
    },
    getters: {
        THIS_USER(state) {
            return state.thisUser;
        },
    },
}

export default User;