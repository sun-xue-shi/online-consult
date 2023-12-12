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
