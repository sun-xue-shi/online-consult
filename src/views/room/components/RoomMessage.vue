<script setup lang="ts">
import { ConsultType, IllnessTime, MsgType, PrescriptionStatus } from '@/enums'
import { useUserStore } from '@/stores'
// import dayjs from 'dayjs'
// import { showImagePreview, showToast } from 'vant'
import EvaluateCard from './EvaluateCard.vue'
import { useRouter } from 'vue-router'
import type { Message } from '@/types/room'
import { timeOptions, consultOptions } from '@/api/const'
import type { Image } from '@/types/home'
import { showImagePreview } from 'vant'

defineProps<{
  listItem: Message
}>()
// 预览图片
const store = useUserStore()

// 查看处方

// 跳转支付
const router = useRouter()

const formatIllness = (value: IllnessTime) => {
  return timeOptions.find((item) => item.value === value)?.label
}

const formatFlag = (value: 0 | 1) => {
  return consultOptions.find((item) => item.value === value)?.label
}

const previewImg = (pictures: Image[]) => {
  if (pictures && pictures.length) {
    showImagePreview(pictures.map((item) => item.url))
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
  <div class="msg msg-to" v-if="listItem.msgType === MsgType.MsgText">
    <div class="content">
      <div class="time"></div>
      <div class="pao"></div>
    </div>
    <van-image />
  </div>
  <!-- 发送图片 -->
  <div class="msg msg-to" v-if="listItem.msgType === MsgType.MsgImage">
    <div class="content">
      <div class="time"></div>
      <van-image fit="contain" />
    </div>
    <van-image />
  </div>
  <!-- 接收文字 -->
  <div class="msg msg-from">
    <van-image />
    <div class="content">
      <div class="time"></div>
      <div class="pao"></div>
    </div>
  </div>
  <!-- 接收图片 -->
  <div class="msg msg-from">
    <van-image />
    <div class="content">
      <div class="time"></div>
      <van-image fit="contain" />
    </div>
  </div>
  <!-- 处方卡片 -->
  <div class="msg msg-recipe">
    <div class="content">
      <div class="head van-hairline--bottom">
        <div class="head-tit">
          <h3>电子处方</h3>
          <p>原始处方 <van-icon name="arrow"></van-icon></p>
        </div>
        <p></p>
        <p>开方时间：</p>
      </div>
      <div class="body">
        <div class="body-item" v-for="med in 5" :key="med">
          <div class="durg">
            <p></p>
            <p></p>
          </div>
          <div class="num">x</div>
        </div>
      </div>
      <div class="foot">
        <span>购买药品</span>
      </div>
    </div>
  </div>
  <!-- 评价卡片，后期实现 -->
  <div class="msg msg-comment">
    <evaluate-card></evaluate-card>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
h2 {
  font-size: 18px;
}
</style>
