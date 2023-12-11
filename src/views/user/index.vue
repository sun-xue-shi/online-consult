<script setup lang="ts">
import { getUserInfo } from '@/api/user'
import type { UserInfo } from '@/types/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, Dialog } from 'vant'
import { useUserStore } from '@/stores'

const userData = ref({} as UserInfo)
const getUserData = async () => {
  const res = await getUserInfo()
  console.log(res)

  userData.value = res.data
}

onMounted(() => {
  getUserData()
})

// 初始化快捷工具
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]

const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
  console.log('5')

  await showConfirmDialog({
    title: '提示',
    message: '是否退出登录'
  })

  userStore.removeUser()
  router.push('/login')
}
</script>

<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="userData.avatar" />
        <div class="name">
          <p>{{ userData.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ userData.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ userData.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ userData.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ userData.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <span>全部订单 <van-icon name="arrow" /></span>
      </div>
      <van-row v-if="userData.orderInfo">
        <van-col span="6">
          <van-badge :content="userData.orderInfo?.paidNumber">
            <UseIcon name="user-paid" />
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userData.orderInfo?.receivedNumber">
            <UseIcon name="user-shipped" />
          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userData.orderInfo?.shippedNumber">
            <UseIcon name="user-received" />
          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userData.orderInfo?.finishedNumber">
            <UseIcon name="user-finished" />
          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <!-- 快捷工具 -->
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(item, index) in tools"
        :key="item.label"
        :title="item.label"
        :to="item.path"
        is-link
      >
        <template #icon><UseIcon :name="`user-tool-0${index + 1}`" /></template>
      </van-cell>
    </div>
    <!-- 退出登录 -->
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;
      .van-image {
        width: 70px;
        height: 70px;
      }
      .name {
        padding-left: 10px;
        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--primary);
            font-size: 16px;
          }
        }
      }
    }
    .van-row {
      margin: 0 -15px;
      padding-top: 15px;
      p {
        text-align: center;
        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }
        &:last-child {
          color: var(--dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      a {
        color: var(--tip);
      }
    }
    .van-col {
      text-align: center;
      .cp-icon {
        font-size: 28px;
      }
      p {
        padding-top: 4px;
        font-size: 12px;
      }
    }
  }
  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--price);
  }
}
</style>
