import api from '@/api/api';

const Products = {
    state: {
        favorites: [],
        categories: [],
        categories_list: [],
        sub_categories_list: [],
        data: [],
        formdata: null,
        ingredients: []
    },
    mutations: {
        pushFavorites(state, product) {
            state.favorites.push(product);
        },
        filterFavorites(state, product) {
            state.favorites = state.favorites.filter(item => item.id != product.id);
        },

        updateCategories(state, data) {
            state.categories = data;
            state.categories_list = [];
            state.categories.forEach(category => {
                state.categories_list.push({
                    value: category.id,
                    title: category.title
                })
            });
        },
        updateSubCategoriesList(state, data) {
            state.sub_categories_list = [];
            data.forEach(item => {
                state.sub_categories_list.push({
                    value: item.id,
                    title: item.title
                })
            });
        },
        updateData(state, data) {
            state.data = data;
        },
        updateFormdata(state, data) {
            state.formdata = data;
        },
        updateIngredients(state, data) {
            state.ingredients = data;
        },
    },
    actions: {
        async FETCH_CATEGORIES({ getters, commit }, required = false) {
            if (getters.CATEGORIES && getters.CATEGORIES.length && !required) {
                return;
            }
            const response = await api.categories.search();
            if (response && Array.isArray(response)) {
                commit('updateCategories', response);
            }
        },
        async FETCH_INGREDIENTS({ getters, commit }, required = false) {
            if (getters.CATEGORIES && getters.CATEGORIES.length && !required) {
                return;
            }
            const response = await api.categories.ingredients();
            if (response && Array.isArray(response)) {
                commit('updateIngredients', response);
            }
        },
        async FETCH_DATA({ getters, commit }, required = false) {
            if (getters.DATA && getters.DATA.length && !required) {
                return;
            }
            const response = await api.categories.search({ expand: 'subCategories.products.ingredients' });
            if (response && Array.isArray(response)) {
                commit('updateData', response);
            }
        },
        async FETCH_SUB_CATEGORIES_LIST({ getters, commit }, required = false) {
            if (getters.SUB_CATEGORIES_LIST && getters.SUB_CATEGORIES_LIST.length && !required) {
                return;
            }
            const response = await api.categories.searchSubCategories();
            if (response && Array.isArray(response)) {
                commit('updateSubCategoriesList', response);
            }
        },
        async CREATE_CATEGORY(_, formdata) {
            return await api.categories.createCategory(formdata);
        },
        async UPDATE_CATEGORY(_, formdata) {
            return await api.categories.updateCategory(formdata);
        },
        async CREATE_SUB_CATEGORY(_, formdata) {
            return await api.categories.createSubCategory(formdata);
        },
        async UPDATE_SUB_CATEGORY(_, formdata) {
            return await api.categories.updateSubCategory(formdata);
        },
        async CREATE_PRODUCT(_, formdata) {
            return await api.categories.createProduct(formdata);
        },
        async UPDATE_PRODUCT(_, formdata) {
            return await api.categories.updateProduct(formdata);
        },
        FAVORITES_PUSH({
            commit,
            dispatch,
            getters
        }, product) {
            if (getters.FAVORITES.find(item => item.id == product.id)) {
                dispatch('FAVORITES_FILTER', product);
            } else {
                commit('pushFavorites', product);
            }
        },
        FAVORITES_FILTER({
            commit
        }, product) {
            commit('filterFavorites', product);
        },
        SET_FORMDATA({ commit }, data) {
            commit('updateFormdata', data);
        },
        DELETE_FORMDATA({ commit }) {
            commit('updateFormdata', null);
        },
    },
    getters: {
        SUB_CATEGORIES(state) {
            return state.subCategories
        },
        FAVORITES(state) {
            return state.favorites
        },
        CATEGORIES(state) {
            return state.categories;
        },
        CATEGORIES_LIST(state) {
            return state.categories_list;
        },
        SUB_CATEGORIES_LIST(state) {
            return state.sub_categories_list;
        },
        DATA(state) {
            return state.data;
        },
        FORMDATA(state) {
            return state.formdata;
        },
        INGREDIENTS(state) {
            return state.ingredients;
        }
    }
};

export default Products;