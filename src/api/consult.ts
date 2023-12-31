import { request } from '@/utils/request'
import type { Image, PartialConsult } from '@/types/home'
import type {
  ConsultOrderItem,
  ConsultOrderListParams,
  ConsultOrderPage,
  ConsultOrderPreData,
  ConsultOrderPreParams
} from '@/types/consult'

// 上传图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request.post<Image>('upload', fd)
}

// 获取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request.get<ConsultOrderPreData>('patient/consult/order/pre', { params })

// 创建订单
export const createConsultOrder = (data: PartialConsult) =>
  request.post<{ id: string }>('patient/consult/order', data)

// 获取支付地址
export const getConsultOrderPayUrl = (data: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request.post<{ payUrl: string }>('/patient/consult/pay', data)

// 订单详情数据
export const getConsultOrderDetail = (orderId: string) => {
  return request.get<ConsultOrderItem>('patient/consult/order/detail', {
    params: {
      orderId
    }
  })
}

// 获取处方数据
export const getPrescriptionPic = (id?: string) =>
  request<{ url: string }>(`patient/consult/prescription/${id}`)

// 提交评价信息
export const evaluateConsultOrder = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request.post('patient/order/evaluate', data)

// 获取问诊订单信息
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request.get<ConsultOrderPage>('/patient/consult/order/list', params)

// 取消订单
export const cancelOrder = (id: string) => request.put(`patient/order/cancel/${id}`)

// 删除订单
export const deleteOrder = (id: string) => request.delete(`patient/order/${id}`)
