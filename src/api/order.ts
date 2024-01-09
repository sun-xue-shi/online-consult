import type { AddressItem, Logistics, OrderDetail, OrderPre } from '@/types/order'
import { request } from '@/utils/request'

//药品预支付订单
export const getMedicalOrderPre = (prescriptionId: string) =>
  request.get<OrderPre>('patient/medicine/order/pre', {
    params: {
      prescriptionId
    }
  })

// 默认地址
export const getAddresList = () => request.get<AddressItem[]>('patient/order/address')

// 创建药品订单
export const createMedicalOrder = (data: { id: string; addressId: string; couponId?: string }) => {
  return request.post<{ id: string }>('patient/medicine/order', data)
}

// 药品订单信息
export const getMedicalOrderDetail = (id: string) =>
  request.get<OrderDetail>(`patient/medicine/order/detail/${id}`)

// 获取物流信息
export const getMedicalOrderLogistics = (id: string) =>
  request.get<Logistics>(`patient/order/${id}/logistics`)
