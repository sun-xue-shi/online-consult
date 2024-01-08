<script setup lang="ts">
import { useConsultStore } from '@/stores'
import type { Patient } from '@/types/user'
import { createConsultOrder, getConsultOrderPayUrl, getConsultOrderPre } from '@/api/consult'
import type { ConsultOrderPreParams, ConsultOrderPreData } from '@/types/consult'
import { showConfirmDialog, showDialog, showFailToast, showLoadingToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { getPatientDetail } from '@/api/user'

const consultStore = useConsultStore()
const router = useRouter()

// 订单预支付信息
const payInfo = ref<ConsultOrderPreData>()
const getPayInfo = async () => {
  console.log(consultStore.consult.illnessType)
  console.log(consultStore.consult.type)

  try {
    const res = await getConsultOrderPre({
      type: consultStore?.consult?.type,
      illnessType: consultStore?.consult?.illnessType
    })

    payInfo.value = res.data
    consultStore.setCouponId(res.data.couponId)
  } catch (error) {
    showFailToast('缺少订单信息')
    router.push('/home')
  }
}

// 患者信息
const patientDetail = ref<Patient>()
const getPatientDetailData = async () => {
  if (!consultStore.consult) return
  const res = await getPatientDetail(consultStore.consult.patientId!)
  patientDetail.value = res.data
}

onMounted(() => {
  getPayInfo()
  getPatientDetailData()
})

const show = ref(false)
const agree = ref(false)

const orderId = ref()
// const isLoading = ref(false)
const openPay = async () => {
  if (!agree.value) return showFailToast('请勾选支付协议')

  const res = createConsultOrder(consultStore.consult)
  orderId.value = (await res).data.id
  consultStore.clear()
  show.value = true
}
// 取消支付
const onBeforeClose = async () => {
  try {
    await showConfirmDialog({
      message: '取消支付将无法获得医生回复,是否关闭?',
      title: '关闭支付',
      confirmButtonText: '继续支付',
      cancelButtonText: '狠心离开'
    })
    return false
  } catch (error) {
    console.log(error)
    orderId.value = ''
    router.push('/user/consult')
    return false
  }
}

// 如果已经创建订单有了id，就不让返回
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
</script>

<template>
  <div class="consult-pay-page" v-if="true">
    <NavBar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo?.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patientDetail?.name} | ${patientDetail?.gender === 1 ? '男' : '女'} | ${
          patientDetail?.age
        }岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="consultStore.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree"> 我已同意 <span class="text">支付协议</span> </van-checkbox>
    </div>
    <van-submit-bar
      button-type="primary"
      :price="payInfo?.actualPayment! * 100"
      button-text="立即支付"
      text-align="left"
      @click="openPay"
    />
    <PaySheet
      :actual-payment="payInfo?.actualPayment"
      v-model:show="show"
      :on-before-close="onBeforeClose"
      :order-id="orderId"
      :pay-callback="`http://localhost:5173/room`"
    />
  </div>
  <div class="consult-pay-page" v-else>
    <NavBar title="支付" />
    <!-- 骨架组件 -->
    <van-skeleton title :row="10" style="margin-top: 18px" />
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--tag);
      &:first-child {
        font-size: 16px;
        color: var(--text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
</style>
