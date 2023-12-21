/**
 * 问诊数据
 */

import type { ConsultType } from '@/enums'
import type { ConsultIllness, PartialConsult } from '@/types/home'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'consult',
  () => {
    const consult = ref<PartialConsult>({})

    const setType = (type: ConsultType) => {
      consult.value.type = type
    }

    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }

    const setIllnessType = (type: 0 | 1) => {
      consult.value.illnessType = type
    }

    const setPatientId = (patientId: string) => {
      consult.value.patientId = patientId
    }

    const setCouponId = (couponId: string) => {
      consult.value.couponId = couponId
    }

    const setDepId = (depId: string) => {
      consult.value.depId = depId
    }

    const clear = () => {
      consult.value = {}
    }
    return {
      consult,
      setCouponId,
      setPatientId,
      setType,
      setIllness,
      clear,
      setIllnessType,
      setDepId
    }
  },
  // pinia定制化
  {
    persist: {
      key: 'consult',
      paths: ['consult']
    }
  }
)
