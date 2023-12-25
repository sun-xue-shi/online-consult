<script setup lang="ts">
// import type { Image } from '@/types/consult'
// import { showLoadingToast } from 'vant'
// import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { ref } from 'vue'

// 提交图片

// 发送消息
const text = ref('')
const emit = defineEmits<{
  (e: 'sent-text', data: string): void
}>()
const sentText = () => {
  emit('sent-text', text.value)
}
</script>

<template>
  <div class="room-action">
    <van-field
      v-model="text"
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      @keyup.enter="sentText"
    ></van-field>
    <van-uploader :preview-image="false">
      <UseIcon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
