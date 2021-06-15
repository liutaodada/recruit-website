import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index')
  },
  {
    path: '/users/personal-center',
    name: 'personal-center',
    component: () => import('@/views/users/personal-center')
  },
  {
    path: '/job/details',
    name: 'job-datails',
    component: () => import('@/views/details/job-details')
  },
  {
    path: '/boss/index',
    name: 'boss-index',
    redirect: '/boss/release',
    component: () => import('@/views/bossUsers/index'),
    children:[
      {
        path:'/boss/release',
        name: 'release',
        meta: {
          title: '发布职位',
        },
        component: () => import('@/views/bossUsers/release')
      },
      {
        path:'/boss/apply',
        name: 'apply',
        meta: {
          title: '申请中心',
        },
        component: () => import('@/views/bossUsers/apply-center')
      },
      {
        path:'/boss/company',
        name: 'company',
        meta: {
          title: '公司简章',
        },
        component: () => import('@/views/bossUsers/company-info')
      },
    ]
  },
  {
    path: '/users/collection',
    name: 'collection',
    component: () => import('@/views/users/my-collection')
  },
  {
    path: '/index/alljob',
    name: 'all-job',
    component: () => import('@/views/main/all-job')
  },
  {
    path: '/index/allcompany',
    name: 'all-company',
    component: () => import('@/views/main/all-company')
  },
  {
    path: '/company/details',
    name: 'company-datails',
    component: () => import('@/views/details/company-details')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 解决跳转路由和当前路由相同时发生冲突
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
