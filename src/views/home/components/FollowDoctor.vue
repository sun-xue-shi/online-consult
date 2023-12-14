<script setup lang="ts">
import type { Doctor } from '@/types/home'
import DoctorCard from './DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import { getDoctorPage } from '@/api/home'

const { width } = useWindowSize()

const params = {
  current: 1,
  pageSize: 5
}
const doctorList = ref<Doctor[]>([])

const getDoctorData = async () => {
  const res = await getDoctorPage(params)
  doctorList.value = res.data.rows
}

onMounted(() => {
  getDoctorData()
})
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe :width="(150 / 375) * width" :showIndicators="false" :loop="false">
        <van-swipe-item v-for="item in doctorList" :key="item.id">
          <doctor-card :item="item"></doctor-card>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
