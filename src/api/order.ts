import type { AddressItem, Logistics, OrderDetail, OrderPre } from '@/types/order'
import { request } from '@/utils/request'

export const getMedicalOrderPre = (params: { prescriptionId: string }) =>
  request.get<OrderPre>('patient/medicine/order/pre', { params })

export const getAddresList = () => request.get<AddressItem[]>('patient/order/address')

export const createMedicalOrder = (data: { id: string; addressId: string; couponId?: string }) =>
  request.post<{ id: string }>('patient/medicine/order', data)

export const getMedicalOrderDetail = (id: string) =>
  request.get<OrderDetail>(`patient/medicine/order/detail/${id}`)

export const getMedicalOrderLogistics = (id: string) =>
  request.get<Logistics>(`patient/order/${id}/logistics`)
