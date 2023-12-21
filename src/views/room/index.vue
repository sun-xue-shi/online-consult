<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io, Socket } from 'socket.io-client'
import { onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { MsgType, OrderType } from '@/enums'
import { ref, nextTick, provide } from 'vue'
// import type { ConsultOrderItem, Image } from '@/types/consult'
import dayjs from 'dayjs'
import { showToast } from 'vant'
import { baseURL } from '@/utils/request'
import type { Message, TimeMessages } from '@/types/room'

// 提供问诊订单数据给后代组件
const messageList = ref<Message[]>([])
const userStore = useUserStore()
const route = useRoute()
let socket: Socket
const initSocket = () => {
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${userStore.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    console.log('连接成功')
  })
  socket.on('disconnect', () => {
    console.log('连接关闭')
  })
  socket.on('error', () => {
    console.log('发生错误')
  })

  // 获取默认消息
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const result: Message[] = []
    data.forEach((item) => {
      result.push({
        createTime: item.createTime,
        id: item.createTime,
        msgType: MsgType.Notify,
        msg: {
          content: item.createTime
        }
      })
      result.push(...item.items)
    })
    messageList.value.push(...result)
  })
}

onMounted(() => {
  initSocket()
})

// 获取聊天记录，如果是第一次（默认消息）

// 监听订单状态变化
// 接收聊天消息

onUnmounted(() => {
  socket.close()
})

// 发送文字信息

// 发送图片信息

// 下拉刷新
const loading = ref(false)
</script>

<template>
  <div class="room-page">
    <nav-bar title="问诊室"></nav-bar>
    <!-- 状态栏 -->
    <room-status></room-status>
    <van-pull-refresh v-model="loading">
      <!-- 消息 -->
      <room-message v-for="item in messageList" :key="item.id" :listItem="item" ></room-message>
    </van-pull-refresh>
    <!-- 操作栏 -->
    <room-action></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
