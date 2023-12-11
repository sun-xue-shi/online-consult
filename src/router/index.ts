import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = `问诊-${to.meta.title || ''}`
  const userStore = useUserStore()
  if (!userStore?.user.token && !['/login'].includes(to.path)) return '/login'
})

export default router
