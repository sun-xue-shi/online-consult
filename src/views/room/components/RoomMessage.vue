<script setup lang="ts">
import { ConsultType, IllnessTime, MsgType, PrescriptionStatus } from '@/enums'
import { useUserStore } from '@/stores'
import dayjs from 'dayjs'
// import { showImagePreview, showToast } from 'vant'
import EvaluateCard from './EvaluateCard.vue'
import { useRouter } from 'vue-router'
import type { Message, Prescription } from '@/types/room'
import { timeOptions, consultOptions } from '@/api/const'
import type { Image } from '@/types/home'
import { showFailToast, showImagePreview } from 'vant'
import { getPrescriptionPic } from '@/api/consult'

defineProps<{
  listItem: Message
}>()
// 预览图片
const userStore = useUserStore()

const formatIllness = (value: IllnessTime) => {
  return timeOptions.find((item) => item.value === value)?.label
}

const formatFlag = (value: 0 | 1) => {
  return consultOptions.find((item) => item.value === value)?.label
}

// 图片预览
const previewImg = (pictures: Image[]) => {
  if (pictures && pictures.length) {
    showImagePreview(pictures.map((item) => item.url))
  }
}

const formatTime = (time: string) => dayjs(time).format('HH:MM')
// 等图片渲染完成后再移动
const loadSuccess = () => {
  window.scrollTo(0, document.body.scrollHeight)
}

// 查看处方
const getPre = async (id?: string) => {
  try {
    if (!id) return
    const res = await getPrescriptionPic(id)
    showImagePreview([res.data.url])
  } catch (error) {
    console.log(error)
  }
}

// 购买药品
const router = useRouter()
const buyPrescription = (pre?: Prescription) => {
  console.log(pre)

  if (pre) {
    console.log(pre.status)

    if (pre.status === PrescriptionStatus.Invalid) return showFailToast('处方失效')

    router.push(`medicine/pay`)
  }
}
</script>

<template>
  <!-- 患者卡片 -->
  <div class="msg msg-illness" v-if="listItem.msgType === MsgType.CardPat">
    <div class="patient van-hairline--bottom">
      <h2>
        {{ listItem.msg.consultRecord?.patientInfo.name }}
        {{ listItem.msg.consultRecord?.patientInfo.genderValue }}
        {{ listItem.msg.consultRecord?.patientInfo.age }}岁
      </h2>
      <p>
        {{ formatIllness(listItem.msg.consultRecord.illnessTime) }}
        {{ formatFlag(listItem.msg.consultRecord.consultFlag) }}
      </p>
    </div>
    <van-row>
      <van-col span="6">病情描述</van-col>
      <van-col span="18">{{ listItem.msg.consultRecord.patientInfo.illnessDesc }}</van-col>
      <van-col span="6">图片</van-col>
      <van-col span="18" @click="previewImg(listItem.msg.consultRecord.pictures)">
        {{ listItem.msg.consultRecord.pictures.length ? '点击查看' : '无' }}</van-col
      >
    </van-row>
  </div>
  <!-- 通知-通用 -->
  <div class="msg msg-tip" v-if="listItem.msgType === MsgType.Notify">
    <div class="content">
      <span>{{ listItem.msg.content }}</span>
    </div>
  </div>
  <!-- 通知-温馨提示 -->
  <div class="msg msg-tip" v-if="listItem.msgType === MsgType.NotifyTip">
    <div class="content">
      <span class="green">温馨提示：</span>
      <span>{{ listItem.msg.content }}</span>
    </div>
  </div>
  <!-- 通知-结束 -->
  <div class="msg msg-tip msg-tip-cancel" v-if="listItem.msgType === MsgType.NotifyCancel">
    <div class="content">
      <span>{{ listItem.msg.content }}</span>
    </div>
  </div>
  <!-- 发送文字 -->
  <div
    class="msg msg-to"
    v-if="listItem.msgType === MsgType.MsgText && listItem.from === userStore.user.id"
  >
    <div class="content">
      <div class="time">{{ formatTime(listItem.createTime) }}</div>
      <div class="pao">{{ listItem.msg.content }}</div>
    </div>
    <van-image :src="userStore.user.avatar" />
  </div>
  <!-- 发送图片 -->
  <div
    class="msg msg-to"
    v-if="listItem.msgType === MsgType.MsgImage && listItem.from === userStore.user.id"
  >
    <div class="content">
      <div class="time">{{ formatTime(listItem.createTime) }}</div>
      <van-image fit="contain" :src="listItem.msg.picture.url" @load="loadSuccess()" />
    </div>
    <van-image :src="userStore.user.avatar" />
  </div>
  <!-- 接收文字 -->
  <div
    class="msg msg-from"
    v-if="listItem.msgType === MsgType.MsgText && listItem.from !== userStore.user.id"
  >
    <van-image :src="listItem.fromAvatar" />
    <div class="content">
      <div class="time">{{ formatTime(listItem.createTime) }}</div>
      <div class="pao">{{ listItem.msg.content }}</div>
    </div>
  </div>
  <!-- 接收图片 -->
  <div
    class="msg msg-from"
    v-if="listItem.msgType === MsgType.MsgImage && listItem.from !== userStore.user.id"
  >
    <van-image :src="listItem.fromAvatar" />
    <div class="content">
      <div class="time">{{ formatTime(listItem.createTime) }}</div>
      <van-image fit="contain" :src="listItem.msg.picture.url" @load="loadSuccess()" />
    </div>
  </div>
  <!-- 处方卡片 -->
  <div class="msg msg-recipe" v-if="listItem.msgType === MsgType.CardPre">
    <div class="content">
      <div class="head van-hairline--bottom">
        <div class="head-tit">
          <h3>电子处方</h3>
          <p @click="getPre(listItem.msg.prescription?.id)">
            原始处方 <van-icon name="arrow"></van-icon>
          </p>
        </div>
        <p>
          {{ listItem.msg.prescription?.name }}
          {{ listItem.msg.prescription?.age }}
          {{ listItem.msg.prescription?.genderValue }}
          {{ listItem.msg.prescription?.diagnosis }}
        </p>
        <p>开方时间：{{ listItem.msg.prescription?.createTime }}</p>
      </div>
      <div class="body">
        <div class="body-item" v-for="med in listItem.msg.prescription?.medicines" :key="med.id">
          <div class="durg">
            <p>{{ med.name }} {{ med.specs }}</p>
            <p>{{ med.usageDosag }}</p>
          </div>
          <div class="num">x{{ med.quantity }}</div>
        </div>
      </div>
      <div class="foot">
        <span @click="buyPrescription(listItem.msg.prescription)">购买药品</span>
      </div>
    </div>
  </div>
  <!-- 评价卡片，后期实现 -->
  <div
    class="msg msg-comment"
    v-if="listItem.msgType === MsgType.CardEvaForm || listItem.msgType === MsgType.CardEva"
  >
    <evaluate-card :evaluate="listItem.msg.evaluateDoc!"></evaluate-card>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
h2 {
  font-size: 18px;
}
</style>
