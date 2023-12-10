<script setup lang="ts"></script>

<template>
  <RouterView />
  <div class="layout">
    <van-tabbar route>
      <van-tabbar-item replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/article">健康百科</van-tabbar-item>
      <van-tabbar-item replace to="/notify">消息中心</van-tabbar-item>
      <van-tabbar-item replace to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss"></style>
