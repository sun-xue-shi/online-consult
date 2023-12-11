import type { User } from '@/types/user'
import { request } from '@/utils/request'

export const loginByPassword = (mobile: string, password: string) =>
  request.post<User>('/login/password', { mobile, password })

export const sendCode = (mobile: string, type: string) =>
  request.get<{ code: string }>('/code', {
    params: { mobile, type }
  })

export const loginByMobile = (mobile: string, code: string) =>
  request.post('/login', { mobile, code })

export const getUserInfo = () => request.get('/patient/myUser')
