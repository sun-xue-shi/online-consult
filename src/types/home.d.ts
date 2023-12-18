import type { ConsultType, IllnessTime } from '@/enums'

// 文章信息类型
export type Knowledge = {
  id: string

  title: string
  /** 封面[] */
  coverUrl: string[]
  /** 标签[] */
  topics: string[]

  collectionNumber: number
  /** 评论数 */
  commentNumber: number

  creatorName: string
  /** 医生头像 */
  creatorAvatar: string
  /** 医生医院 */
  creatorHospatalName: string

  /** 关注文章 */
  likeFlag: 0 | 1
  /** 内容 */
  content: string
  /** 医生科室 */
  creatorDep: string
  /** 医生职称 */
  creatorTitles: string

  creatorId: string
}

// 文章列表带分页
export type KnowledgePage = {
  pageTotal: number
  total: number
  rows: Knowledge[]
}

// props类型 recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

export type PageParams = {
  current: number
  pageSize: number
}

// 文章列表查询参数
export type KnowledgeParams = PageParams & {
  type: KnowledgeType
}

// 关注的目标类型：topic百科话题,knowledge百科文章,doc医生,disease疾病
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

// 医生卡片对象
export type Doctor = {
  id: string

  name: string

  avatar: string

  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: 0 | 1
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}

// 医生分页
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: Doctor[]
}

// 关注的目标类型：topic百科话题,knowledge百科文章,doc医生,disease疾病
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

// 图片列表
export type Image = {
  id: string

  url: string
}

// 问诊记录
export type Consult = {
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疾病描述 */
  illnessDesc: string
  /** 疾病持续时间 */
  illnessTime: IllnessTime
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1

  pictures: Image[]

  patientId: string
  /** 优惠券ID */
  couponId: string
}

// Partial<T> 把一个对象的属性转换成可选
export type PartialConsult = Partial<Consult>
// Required<T> 把一个对象的属性转换成必选
// type RequiredConsult = Required<PartialConsult>

// 二级科室
type SubDep = {
  id: string
  name: string
}
// 一级科室
type TopDep = SubDep & {
  child: SubDep[]
}

// 病情描述对象
type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>
