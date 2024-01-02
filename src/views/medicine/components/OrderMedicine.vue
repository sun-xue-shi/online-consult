<script setup lang="ts">
import type { Medical } from '@/types/room'

// defineProps<{
//   medicines: Medical[]
// }>()
</script>

<template>
  <div class="order-medical">
    <div class="head">
      <h3>优医药房</h3>
      <small>优医质保 假一赔十</small>
    </div>
    <div class="item van-hairline--top" v-for="med in 1" :key="med">
      <img class="img" alt="" />
      <div class="info">
        <p class="name">
          <span>青霉素</span>
          <span>x5</span>
        </p>
        <p class="size">
          <van-tag>处方药</van-tag>
          <span>描述</span>
        </p>
        <p class="price">￥5</p>
      </div>
      <div class="desc"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-medical {
  background-color: #fff;
  padding: 0 15px;
  .head {
    display: flex;
    height: 54px;
    align-items: center;
    > h3 {
      font-size: 16px;
      font-weight: normal;
    }
    > small {
      font-size: 13px;
      color: var(--tag);
      margin-left: 10px;
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      padding-left: 15px;
      width: 250px;
      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }
      .size {
        margin-bottom: 5px;
        .van-tag {
          background-color: var(--primary);
          vertical-align: middle;
        }
        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--tag);
          vertical-align: middle;
        }
      }
      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }
    .desc {
      width: 100%;
      background-color: var(--bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--tip);
    }
  }
}
</style>
