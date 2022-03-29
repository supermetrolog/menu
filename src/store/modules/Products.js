const Products = {
    state: {
        data: [{
            id: 1,
            title: "Кальян",
            title_for_query: 'hookah',
            subCategories: [{
                    id: 1,
                    title: 'Тяжелые',
                    title_for_query: 'strong',
                    products: [{
                            id: 1,
                            title: "Tangiers",
                            price: "1300",
                            price_old: "1600",
                            price_from: null,
                            price_to: null,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                        },
                        {
                            id: 2,
                            title: "Премиум",
                            price: "1100",
                            price_old: null,
                            price_from: null,
                            price_to: null,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Легкие',
                    title_for_query: 'light',
                    products: [{
                            id: 1,
                            title: "Ананас",
                            price: "1950",
                            price_old: null,
                            price_from: null,
                            price_to: null,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                        },
                        {
                            id: 2,
                            title: "Питахайя",
                            price: "2300",
                            price_old: "2950",
                            price_from: null,
                            price_to: null,
                            voluem: null,
                            voluem_from: null,
                            vuluem_to: null,
                            isNew: 0,
                        }
                    ]
                }
            ]
        }]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        PRODUCTS(state) {
            return state.data
        },
        CATEGORIES(state) {
            return state.data
        }
    }
};

export default Products;