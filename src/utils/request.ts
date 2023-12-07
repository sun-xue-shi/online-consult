import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'
import { showToast } from 'vant'
import 'vant/es/toast/style/index'

const baseURL = 'https://consult-api.itheima.net/'
export const request = axios.create({
  baseURL,
  timeout: 10000
})

const userStore = useUserStore()
request.interceptors.request.use(
  (config) => {
    if (userStore.user.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${userStore.user.token}`
    }

    return config
  },
  (err) => Promise.reject(err)
)

request.interceptors.response.use(
  (res) => {
    if (res.data?.code !== 10000) {
      showToast(res.data?.message)
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      userStore.removeUser()
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)
