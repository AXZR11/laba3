import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Register from '@/views/Register.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')

  if (token && (to.path === '/' || to.path === '/register')) {
    next('/main')
  }

  else if (!token && to.path === '/main') {
    next('')
  } else {
    next()
  }
})

export default router
