/**
 * 用户数据
 */

import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({} as User)

    //存储用户信息
    const setUser = (userData: User) => {
      user.value = userData
    }

    //清除用户信息
    const removeUser = () => {
      user.value = {} as User
    }

    return { user, setUser, removeUser }
  },
  {
    persist: true
  }
)
