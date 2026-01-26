import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../../pages/home/ui/HomePage.vue";
import AuthPage from "../../pages/auth/ui/AuthPage.vue";
import NewsPage from "../../pages/news/ui/NewsPage.vue";
import ChatPage from "../../pages/chat/ui/ChatPage.vue";

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomePage
    },
    {
        name: 'login',
        path: '/login',
        component: AuthPage,
        meta: {
            layout: 'auth',
            guestOnly: true
        }
    },
    {
        name: 'news',
        path: '/news',
        component: NewsPage
    },
    {
        name: 'chat',
        path: '/chat',
        component: ChatPage,
        meta: {
            requiresAuth: true
        }
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach(async (to,from, next) => {
    // const auth = useAuth()
    //
    // if (!auth.isInitialized.value)
    //     await auth.initialize()
    //
    // const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    // const guestOnly = to.matched.some(record => record.meta.guestOnly)
    //
    // if (requiresAuth && !auth.isAuth.value) {
    //     next({ name: 'login', query: { redirect: to.fullPath } })
    //     return
    // }
    //
    // if (guestOnly && auth.isAuth.value) {
    //     next({ name: 'home' })
    //     return
    // }
    //
    // next()
// })