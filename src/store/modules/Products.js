const Products = {
    state: {
        favorites: [],
        subCategories: [{
                id: 1,
                title: 'Тяжёлые',
                category: 0,
                products: [{
                        id: 1,
                        title: "Tangiers",
                        price: 1300,
                        price_old: 1600,
                        price_from: null,
                        price_to: null,
                        voluem: null,
                        voluem_from: null,
                        voluem_to: null,
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
                        voluem_to: null,
                        isNew: 0,
                        description: "Глинянные чаши самые универсальные аксессуары, подходящие для различных табаков. Глина обладает высокой теплопроводностью, что позволяет раскрыть вкус и дымность табака на максимум"
                    }
                ]
            },
            {
                id: 2,
                title: 'Легкие',
                category: 0,
                products: [{
                        id: 3,
                        title: "Ананас",
                        price: null,
                        price_old: null,
                        price_from: 1850,
                        price_to: 2400,
                        voluem: null,
                        voluem_from: null,
                        voluem_to: null,
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
                        voluem_to: null,
                        isNew: 0,
                        description: "Глинянные чаши самые универсальные аксессуары, подходящие для различных табаков. Глина обладает высокой теплопроводностью, что позволяет раскрыть вкус и дымность табака на максимум"
                    }
                ]
            },
            {
                id: 3,
                title: 'Бургеры',
                category: 1,
                products: [{
                        id: 4,
                        title: "Большие",
                        price: null,
                        price_old: null,
                        price_from: 1850,
                        price_to: 2400,
                        voluem: null,
                        voluem_from: null,
                        voluem_to: null,
                        isNew: 0,
                        description: "Американский табак"
                    },
                    {
                        id: 5,
                        title: "Маленькие",
                        price: 2300,
                        price_old: 2950,
                        price_from: null,
                        price_to: null,
                        voluem: null,
                        voluem_from: null,
                        voluem_to: null,
                        isNew: 0,
                        description: "Глинянные чаши самые универсальные аксессуары, подходящие для различных табаков. Глина обладает высокой теплопроводностью, что позволяет раскрыть вкус и дымность табака на максимум"
                    }
                ]
            },
            {
                id: 51,
                title: 'Пиццы',
                category: 1,
                products: [{
                        id: 222,
                        title: "Большая",
                        price: null,
                        price_old: null,
                        price_from: 1850,
                        price_to: 2400,
                        voluem: null,
                        voluem_from: null,
                        voluem_to: null,
                        isNew: 0,
                        description: "Американский табак"
                    },
                    {
                        id: 221,
                        title: "Средняя",
                        price: 2300,
                        price_old: 2950,
                        price_from: null,
                        price_to: null,
                        voluem: null,
                        voluem_from: null,
                        voluem_to: null,
                        isNew: 0,
                        description: "Глинянные чаши самые универсальные аксессуары, подходящие для различных табаков. Глина обладает высокой теплопроводностью, что позволяет раскрыть вкус и дымность табака на максимум"
                    },
                    {
                        id: 224,
                        title: "маленькая",
                        price: 2300,
                        price_old: 2950,
                        price_from: null,
                        price_to: null,
                        voluem: null,
                        voluem_from: null,
                        voluem_to: null,
                        isNew: 0,
                        description: "Глинянные чаши самые универсальные аксессуары, подходящие для различных табаков. Глина обладает высокой теплопроводностью, что позволяет раскрыть вкус и дымность табака на максимум"
                    }
                ]
            },
            {
                id: 4,
                title: 'Молочные напитки',
                category: 3,
                products: [{
                        id: 8878,
                        title: "Ваниль",
                        price: 350,
                        price_old: 450,
                        price_from: null,
                        price_to: null,
                        voluem: 0.4,
                        voluem_from: null,
                        voluem_to: null,
                        voluem_type: 'л',
                        isNew: 1,
                        ingredients: [{
                                id: 0,
                                name: 'мороженное'
                            },
                            {
                                id: 1,
                                name: 'молоко'
                            },
                            {
                                id: 2,
                                name: 'всбитые сливки'
                            },
                        ],
                        description: "Мороженное, молоко, всбитые сливки"
                    },
                    {
                        id: 6,
                        title: "Шоколад",
                        price: 450,
                        price_old: null,
                        price_from: null,
                        price_to: null,
                        voluem: 0.4,
                        voluem_from: null,
                        voluem_to: null,
                        voluem_type: 'л',
                        isNew: 0,
                        description: "Мороженное, молоко, шоколад, всбитые сливки"
                    }
                ]
            },
            {
                id: 5,
                title: 'Лимонады',
                category: 3,
                products: [{
                        id: 7,
                        title: "Дюшес",
                        price: null,
                        price_old: null,
                        price_from: 350,
                        price_to: 600,
                        voluem: null,
                        voluem_from: 0.44,
                        voluem_to: 1,
                        voluem_type: 'л',
                        isNew: 1,
                        ingredients: [{
                                id: 3,
                                name: 'содовая'
                            },
                            {
                                id: 4,
                                name: 'груша'
                            },
                            {
                                id: 5,
                                name: 'пюре груша'
                            },
                            {
                                id: 6,
                                name: 'лимон'
                            },
                        ],
                        description: "Капец какой охлаждающий напиток"
                    },
                    {
                        id: 8,
                        title: "Маракуйя-манго",
                        price: null,
                        price_old: null,
                        price_from: 355,
                        price_to: 695,
                        voluem: null,
                        voluem_from: 0.44,
                        voluem_to: 1,
                        voluem_type: 'л',
                        isNew: 0,
                        ingredients: [{
                                id: 7,
                                name: 'содовая'
                            },
                            {
                                id: 8,
                                name: 'пюре манго'
                            },
                            {
                                id: 9,
                                name: 'пюре маракуйя'
                            },
                            {
                                id: 10,
                                name: 'манго'
                            },
                            {
                                id: 11,
                                name: 'маракуйя'
                            },
                        ],
                        description: "Еще один капец какой охлаждающий напиток"
                    }
                ]
            }
        ]
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
    },
    getters: {
        SUB_CATEGORIES(state) {
            return state.subCategories
        },
        FAVORITES(state) {
            return state.favorites
        }
    }
};

export default Products;