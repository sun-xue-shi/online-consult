<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import type { ConsultIllness, Image } from '@/types/home'
import { ref, computed, onMounted } from 'vue'
import { useConsultStore } from '@/stores'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'
import { type UploaderAfterRead, type UploaderFileListItem } from 'vant/lib/uploader/types'
import { uploadImage } from '@/api/consult'
import { timeOptions, consultOptions } from '@/api/const'

const formData = ref<ConsultIllness>({
  pictures: [],
  illnessTime: undefined,
  illnessDesc: '',
  consultFlag: undefined
})

const disabled = computed(() => {
  return (
    formData.value.consultFlag === undefined ||
    !formData.value.illnessDesc ||
    formData.value.illnessTime === undefined
  )
})

const consultStore = useConsultStore()
const router = useRouter()
const onNext = () => {
  consultStore.setIllness(formData.value)
  router.push('/user/patient?isSel=1')
}

// 数据回显
onMounted(async () => {
  if (consultStore.consult.illnessDesc) {
    const isRecover = ref(false)
    await showConfirmDialog({
      title: '提示',
      message: '是否恢复上一次数据',
      closeOnPopstate: false
    })
    isRecover.value = true
    if (isRecover.value) {
      formData.value = consultStore.consult
    }
  }
})

const fileList = ref([])
const onAfterRead: UploaderAfterRead = (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return
  item.status = 'uploading'
  item.message = '图片上传中...'
  uploadImage(item.file)
    .then((res) => {
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      formData.value.pictures?.push(res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '图片上传失败'
    })
}
const onDeleteImg = (item: UploaderFileListItem) => {
  formData.value.pictures = formData.value.pictures?.filter((pic) => pic.url !== item.url)
}
</script>

<template>
  <div class="consult-illness-page">
    <nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><UseIcon name="consult-safe" /><span>内容仅医生可见</span></p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="formData.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <RadioButton :options="timeOptions" v-model="formData.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <RadioButton :options="consultOptions" v-model="formData.consultFlag" />
      </div>
      <!-- 上传组件 -->
      <div class="illness-img">
        <van-uploader
          upload-icon="photo-o"
          upload-text="上传图片"
          max-count="5"
          :max-size="5 * 1024 * 1024"
          v-model="fileList"
          :after-read="onAfterRead"
          @delete="onDeleteImg"
        ></van-uploader>
        <p class="tip" v-if="true">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>
      <!-- 下一步 -->
      <van-button type="primary" block round :class="{ disabled }" @click="onNext">
        下一步
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
  .van-button {
    font-size: 16px;
    margin-bottom: 30px;
    &.disabled {
      opacity: 1;
      background: #fafafa;
      color: #d9dbde;
      border: #fafafa;
    }
  }
}
.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--text3);
      }
    }
  }
}

.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--bg);
      color: var(--text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--text3);
      padding: 15px 0;
    }
  }
}
</style>
