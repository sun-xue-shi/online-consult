/**
 * 用户类型
 */

export type User = {
  token: string
  id: string
  mobile: string
  account: string
  avatar: string
}

export type UserInfo = Omit<User, 'token'> & {
  likeNumber: number

  collectionNumber: number

  score: number
  /** 优惠券 */
  couponNumber: number

  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}

// 患者信息
export type Patient = {
  id?: string

  name: string

  idCard: string

  defaultFlag: 0 | 1

  gender: number

  age?: number
}
