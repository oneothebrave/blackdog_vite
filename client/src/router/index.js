import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/sk',
    name: 'Sk',
    component: () => import('../components/SkeletonIndex.vue')
  },
  {
    path: "/:username",
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: "/:notfound",
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
