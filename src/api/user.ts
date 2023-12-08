import type { User } from '@/types/user'
import { request } from '@/utils/request'

export const loginByPassword = (mobile: string, password: string) => {
  return request.post<User>('/login/password', { mobile, password })
}
