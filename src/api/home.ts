import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  TopDep
} from '@/types/home'
import { request } from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request.get<KnowledgePage>('/patient/home/knowledge', { params })

export const getDoctorPage = (params: PageParams) =>
  request.get<DoctorPage>('home/page/doc', { params })

export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request.post('like', { id, type })

export const getAllDep = () => request.get<TopDep[]>('dep/all')
