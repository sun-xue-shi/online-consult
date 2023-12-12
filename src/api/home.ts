import type { KnowledgePage, KnowledgeParams } from '@/types/home'
import { request } from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request.get<KnowledgePage>('/patient/home/knowledge', { params })
