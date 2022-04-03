import { createRouter, createWebHistory } from 'vue-router'
const routes = [{
        path: '/',
        name: 'index',
        meta: { layout: 'main', auth: { isAuth: true, role: ['moderator', 'administrator'] } },
        component: () =>
            import ('../pages/index.vue'),
    },
    {
        path: '/favorites',
        name: 'Favorites',
        meta: { layout: 'header', auth: { isAuth: true, role: ['moderator', 'administrator'] } },
        component: () =>
            import ('../pages/Favorites.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        meta: { layout: 'empty', auth: { isAuth: true, role: ['moderator', 'administrator'] } },
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
    // console.log("To:", to, "From:", from, next);
    // const access_token = localStorage.getItem('access_token');
    // if (to.meta.auth.isAuth && !access_token) {
    //     return next({ name: "login" });
    // }

    // if (!to.meta.auth.isAuth && access_token) {
    //     return next({ name: from.name });
    // }
    return next();
});
export default router