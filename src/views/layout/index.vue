<script setup lang="ts"></script>

<template>
  <RouterView />
  <div class="layout">
    <van-tabbar route>
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template #icon="props">
          <UseIcon :name="`home-index-${props.active ? 'active' : 'default'}`"></UseIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/article">
        <span>健康百科</span>
        <template #icon="props">
          <UseIcon :name="`home-article-${props.active ? 'active' : 'default'}`"></UseIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/notify">
        <span>消息中心</span>
        <template #icon="props">
          <UseIcon :name="`home-notice-${props.active ? 'active' : 'default'}`"></UseIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/user">
        <span>我的</span>
        <template #icon="props">
          <UseIcon :name="`home-mine-${props.active ? 'active' : 'default'}`"></UseIcon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss"></style>
