<script setup lang="ts">
import { getConsultOrderPayUrl } from '@/api/consult'
import { showConfirmDialog, showFailToast, showLoadingToast } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const payMethod = ref<0 | 1>()

const props = defineProps<{
  show?: boolean
  orderId: string
  actualPayment?: number | undefined
  onBeforeClose?: () => void
  payCallback: string
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()

// 支付
const payOrder = async () => {
  if (!payMethod.value) return showFailToast('请选择支付方式')
  showLoadingToast('正在跳转支付~')
  const res = await getConsultOrderPayUrl({
    payCallback: props.payCallback,
    paymentMethod: payMethod.value,
    orderId: props.orderId
  })
  window.location.href = res.data.payUrl
}
</script>

<template>
  <!-- 支付抽屉，控制面板 -->
  <VanActionSheet
    :show="show"
    title="请选择支付方式"
    :close-on-popstate="false"
    :before-close="onBeforeClose"
    @click="onBeforeClose"
  >
    <div class="pay-type">
      <p class="amount">￥ {{ actualPayment?.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="payMethod = 0" class="cell">
          <template #icon><UseIcon name="consult-wechat" /></template>
          <template #extra>
            <van-checkbox :checked="payMethod === 0" />
          </template>
        </van-cell>
        <van-cell title="支付宝支付" @click="payMethod = 1" class="cell">
          <template #icon>
            <UseIcon name="consult-alipay" class="icon" />
          </template>
          <template #extra>
            <van-checkbox :checked="payMethod === 1" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button type="primary" round block @click="payOrder"> 立即支付 </van-button>
      </div>
    </div>
  </VanActionSheet>
</template>

<style scoped lang="scss">
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .cell {
    align-items: center;
    .icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
