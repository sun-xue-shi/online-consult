<script setup lang="ts">
import { createMedicalOrder, getAddresList, getMedicalOrderPre } from '@/api/order'
import type { AddressItem, OrderPre } from '@/types/order'
import { showToast } from 'vant'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrderMedical from '@/views/medicine/components/OrderMedicine.vue'

// 预支付信息
const route = useRoute()
const orderPre = ref<OrderPre>()
const getOrderPre = async () => {
  const res = await getMedicalOrderPre(route.query.id as string)
  orderPre.value = res.data
}

// 收货地址信息
const address = ref<AddressItem>()
const getAddress = async () => {
  const addRes = await getAddresList()
  // 如果有默认的收货地址就是它，如果没有就去第一个收货地址即可
  if (addRes.data.length) {
    const defAddress = addRes.data.find((item) => item.isDefault === 1)
    if (defAddress) address.value = defAddress
    else address.value = addRes.data[0]
  }
}

onMounted(() => {
  getAddress()
  getOrderPre()
})

// 创建订单
const agree = ref(false)
const loading = ref(false)
const orderId = ref('')
const show = ref(false)
const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选用户协议')
  if (!address.value?.id) return showToast('请选择收货地址')
  if (!orderPre.value?.id) return showToast('未找到处方')

  if (!orderId.value) {
    try {
      loading.value = true
      const res = await createMedicalOrder({
        id: orderPre.value.id,
        addressId: address.value.id,
        couponId: orderPre.value.couponId
      })
      orderId.value = res.data.id
      loading.value = false

      // 打开抽屉
      show.value = true
    } catch (error) {
      loading.value = false
    }
  } else {
    // 打开抽屉
    show.value = true
  }
}

const onClose = () => {
  show.value = false
}
</script>

<template>
  <div class="order-pay-page" v-if="orderPre && address">
    <nav-bar title="药品支付" />
    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ address.province + address.city + address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>

      <p>
        {{ address.receiver }}
        {{ address.mobile.replace(/^(\d{3})(?:\d{4})(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>

    <!-- 药品清单组件 -->
    <order-medical :medicines="orderPre.medicines"></order-medical>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${orderPre.payment}`" />
        <van-cell title="运费" :value="`￥${orderPre.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${orderPre.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${orderPre.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
        不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox v-model="agree"> 我已同意<a href="javascript:;">支付协议</a> </van-checkbox>
    </div>
    <van-submit-bar
      button-text="立即支付"
      button-type="primary"
      text-align="left"
      :loading="loading"
      @click="onSubmit"
    ></van-submit-bar>
    <!-- 支付抽屉 -->
    <pay-sheet
      v-model:show="show"
      :order-id="orderId"
      :pay-callback="`http://localhost:5173/order/pay/result`"
      :actual-payment="orderPre.actualPayment"
      :on-before-close="onClose"
    ></pay-sheet>
  </div>
  <div class="order-pay-page" v-else>
    <nav-bar title="药品支付" />
    <van-skeleton title avatar row="2" style="margin-top: 15px" loading></van-skeleton>
    <van-skeleton title row="4" style="margin-top: 50px"></van-skeleton>
    <van-skeleton title row="4" style="margin-top: 50px"></van-skeleton>
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: var(--primary);
  .van-nav-bar__arrow,
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
  }
  .van-cell__value {
    font-size: 16px;
  }
  &.price {
    .van-cell__value {
      font-size: 18px;
      color: var(--price);
    }
  }
}
:deep(.van-submit-bar) {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .van-button {
    width: 200px;
  }
}
.order-pay-page {
  padding: 46px 0 65px;
}
.order-address {
  padding: 15px 15px 0 15px;
  background-color: #fff;
  font-size: 13px;
  .area {
    color: var(--tag);
    margin-bottom: 5px;
    .van-icon-location {
      color: #ff7702;
      font-size: 14px;
    }
  }
  .detail {
    font-size: 17px;
    margin-bottom: 5px;
  }
  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--bg);
    margin: 0 -15px;
    margin-top: 15px;
  }
}

.order-tip {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  .tip {
    font-size: 12px;
    color: var(--tag);
    width: 100%;
    &::before {
      content: '*';
      color: var(--price);
      font-size: 14px;
    }
    margin-bottom: 30px;
  }
  .van-checkbox {
    a {
      color: var(--primary);
    }
  }
}
</style>
