<script setup lang="ts">
import { getAllDep } from '@/api/home'
import { useConsultStore } from '@/stores'
import type { TopDep } from '@/types/home'
import { ref, onMounted, computed } from 'vue'

const active = ref(0)
const consultStore = useConsultStore()
const allDep = ref<TopDep[]>([])
const getAllDepData = async () => {
  const res = await getAllDep()
  allDep.value = res.data
}

const subDep = computed(() => {
  return allDep.value[active.value]?.child
})

onMounted(() => {
  getAllDepData()
})
</script>

<template>
  <div class="consult-dep-page">
    <NavBar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item :title="item.name" v-for="item in allDep" :key="item.id" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          v-for="sub in subDep"
          :key="sub.id"
          to="/consult/illness"
          @click="consultStore.setDepId(sub.id)"
          >{{ sub.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--tag);
    &--select {
      color: #fff;
      background-color: var(--primary);
      font-weight: normal;
      transition: background-color 0.5s;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--dark);
      }
    }
  }
}
</style>
