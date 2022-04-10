import { createRouter, createWebHistory } from 'vue-router'
const routes = [{
        path: '/',
        name: 'index',
        meta: { layout: 'main', auth: { isAuth: false, role: ['moderator', 'administrator'] } },
        component: () =>
            import ('../pages/index.vue'),
    },
    {
        path: '/favorites',
        name: 'Favorites',
        meta: { layout: 'header', auth: { isAuth: false, role: ['moderator', 'administrator'] } },
        component: () =>
            import ('../pages/Favorites.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        meta: { layout: 'header', auth: { isAuth: false, role: ['moderator', 'administrator'] } },
        component: () =>
            import ('../pages/Login.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
        meta: { layout: 'sidebar', auth: { isAuth: true, role: ['moderator', 'administrator'] } },
        component: () =>
            import ('../pages/admin/index.vue'),
        children: [{
                path: '',
                name: 'AdminMain',
                meta: { layout: 'sidebar', auth: { isAuth: true, role: ['moderator', 'administrator'] } },
                component: () =>
                    import ('../pages/admin/Main.vue')
            },
            {
                path: 'form',
                name: 'AdminForm',
                meta: { layout: 'empty', auth: { isAuth: true, role: ['moderator', 'administrator'] } },
                component: () =>
                    import ('../pages/admin/Form.vue')
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        meta: { layout: 'empty', auth: { isAuth: false, role: ['moderator', 'administrator'] } },
        component: () =>
            import ('../pages/NotFound.vue')
    },
    // {
    //     path: '/',
    //     name: "root",
    //     redirect: { name: "CompaniesMain" }
    // },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('access_token');
    if (to.meta.auth.isAuth && !access_token) {
        return next({ name: "Login" });
    }

    // if (!to.meta.auth.isAuth && access_token) {
    //     return next({ name: from.name });
    // }
    return next();
});
export default router