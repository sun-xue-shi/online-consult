import type { Patient, User, UserInfo } from '@/types/user'
import { request } from '@/utils/request'

export const loginByPassword = (mobile: string, password: string) =>
  request.post<User>('/login/password', { mobile, password })

export const sendCode = (mobile: string, type: string) =>
  request.get<{ code: string }>('/code', {
    params: { mobile, type }
  })

export const loginByMobile = (mobile: string, code: string) =>
  request.post('/login', { mobile, code })

export const getUserInfo = () => request.get<UserInfo>('/patient/myUser')

export const getPatientInfo = () => request.get<Patient[]>('/patient/mylist')

export const addPatient = (patient: Patient) => {
  return request.post<Patient>('/patient/add', patient)
}

export const editPatient = (patient: Patient) => {
  return request.put<Patient>('/patient/update', patient)
}

// 删除患者
export const delPatient = (id: string) => request.delete(`patient/del/${id}`)

// 患者详情
export const getPatientDetail = (id: string) => {
  return request.get<Patient>(`patient/info/${id}`)
}

export const getUnreadMessageCount = () => {
  return request.get<number>('patient/message/unRead/all')
}

export const loginByQQ = (openId: string) =>
  request.post<User>('login/thirdparty', {
    openId,
    source: 'qq'
  })

export const bindMobile = (data: { mobile: string; code: string; openId: string }) => {
  return request.post<User>('login/binding', data)
}
