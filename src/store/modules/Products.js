const Products = {
    state: {
        favorites: [],
        data: [{
            id: 1,
            title: "Кальян",
            title_for_query: 'hookah',
            subCategories: [{
                    id: 1,
                    title: 'Тяжёлые',
                    title_for_query: 'strong',
                    products: [{
                            id: 1,
                            title: "Tangiers",
                            price: 1300,
                            price_old: 1600,
                            price_from: null,
                            price_to: null,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                            description: "Американский табак, известный своей крепостью и интересными насыщенными вкусами"
                        },
                        {
                            id: 2,
                            title: "Премиум",
                            price: 1100,
                            price_old: null,
                            price_from: null,
                            price_to: null,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                            description: "Глинянные чаши самые универсальные аксессуары, подходящие для различных табаков. Глина обладает высокой теплопроводностью, что позволяет раскрыть вкус и дымность табака на максимум"
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Легкие',
                    title_for_query: 'light',
                    products: [{
                            id: 3,
                            title: "Ананас",
                            price: null,
                            price_old: null,
                            price_from: 1850,
                            price_to: 2400,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                            description: "Американский табак"
                        },
                        {
                            id: 4,
                            title: "Питахайя",
                            price: 2300,
                            price_old: 2950,
                            price_from: null,
                            price_to: null,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                            description: "Глинянные чаши самые универсальные аксессуары, подходящие для различных табаков. Глина обладает высокой теплопроводностью, что позволяет раскрыть вкус и дымность табака на максимум"
                        }
                    ]
                }
            ]
        }]
    },
    mutations: {
        pushFavorites(state, product) {
            state.favorites.push(product);
        },
        filterFavorites(state, product) {
            state.favorites = state.favorites.filter(item => item.id != product.id);
        }
    },
    actions: {
        FAVORITES_PUSH({ commit, dispatch, getters }, product) {
            if (getters.FAVORITES.find(item => item.id == product.id)) {
                dispatch('FAVORITES_FILTER', product);
            } else {
                commit('pushFavorites', product);
            }
        },
        FAVORITES_FILTER({ commit }, product) {
            commit('filterFavorites', product);
        },
    },
    getters: {
        PRODUCTS(state) {
            return state.data
        },
        CATEGORIES(state) {
            return state.data
        },
        FAVORITES(state) {
            return state.favorites
        }
    }
};

export default Products;