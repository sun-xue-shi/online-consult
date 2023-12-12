<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import type { Knowledge, KnowledgeType } from '@/types/home'
import { getKnowledgePage } from '@/api/home'

const props = defineProps<{
  type: KnowledgeType
}>()
const list = ref<Knowledge[]>([])
const loading = ref(false)
const finished = ref(false)

const params = {
  type: props.type,
  current: 1,
  pageSize: 10
}

const onLoad = async () => {
  const res = await getKnowledgePage(params)
  list.value.push(...res.data.rows)
  // 加载状态结束
  loading.value = false

  // 数据全部加载完成
  if (list.value.length === res.data.total) {
    finished.value = true
  } else {
    params.current++
  }
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
