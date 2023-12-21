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
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request.post<{ payUrl: string }>('patient/consult/pay', params)

export const getConsultOrderDetail = (orderId: string) =>
  request.get<ConsultOrderItem>('patient/consult/order/detail')

export const getPrescriptionPic = (id: string) =>
  request<{ url: string }>(`patient/consult/prescription/${id}`)

export const evaluateConsultOrder = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => request.post('patient/order/evaluate', data)

export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request.get<ConsultOrderPage>('patient/consult/order/list', params)

export const cancelOrder = (id: string) => request.put(`patient/order/cancel/${id}`)

export const deleteOrder = (id: string) => request.delete(`patient/order/${id}`)
