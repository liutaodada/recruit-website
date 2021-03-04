import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'home',
        component:Home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
