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
        name: 'auth',
        path: '/auth',
        component: AuthPage,
        meta: {
            layout: 'auth'
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
        component: ChatPage
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})