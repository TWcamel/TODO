import Vue from "vue"
import VueRouter from "vue-router"
import { auth } from "@/firebase.js"
import Dashboard from "../views/Dashboard.vue"


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
]

export const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(ele=>ele.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) next("/login")
    else next()
})

export default router
