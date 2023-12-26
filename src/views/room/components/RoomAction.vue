<script setup lang="ts">
import { showLoadingToast } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { ref } from 'vue'
import { uploadImage } from '@/api/consult'
import type { Image } from '@/types/home'

// 发送消息 文字 + 图片
const text = ref('')
const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-img', img: Image): void
}>()

const sendText = () => {
  emit('send-text', text.value)
  text.value = ''
}

const sendImage: UploaderAfterRead = async (data) => {
  if (Array.isArray(data)) return
  if (!data.file) return
  const t = showLoadingToast('正在上传...')
  const res = await uploadImage(data.file!)
  console.log(res.data)

  t.close()
  emit('send-img', res.data)
}

defineProps<{
  disabled: boolean
}>()
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
      @keyup.enter="sendText"
      :disabled="disabled"
    ></van-field>
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="sendImage">
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
