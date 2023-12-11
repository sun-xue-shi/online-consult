<script setup lang="ts">
import { getPatientInfo } from '@/api/user'
import type { Patient } from '@/types/user'
import { ref, onMounted } from 'vue'

const patientList = ref<Patient[]>([])
const getPatientData = async () => {
  const res = await getPatientInfo()
  patientList.value = res.data
}

onMounted(() => {
  getPatientData()
})

const isShow = ref(false)
const openPopup = () => {
  isShow.value = true
}

const closePopup = () => {
  isShow.value = false
}

const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

const gender = ref(1)
</script>

<template>
  <div class="patient-page">
    <NavBar title="家庭档案" />
    <!-- 头部提示 -->
    <div class="patient-change">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div class="patient-item" v-for="patient in patientList" :key="patient.id">
        <div class="info">
          <span class="name">{{ patient.name }}</span>
          <span class="id">{{ patient.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span>
          <span>{{ patient.gender === 0 ? '女' : '男' }}</span>
          <span>{{ patient.age }}岁</span>
        </div>
        <div class="icon">
          <UseIcon name="user-edit" />
        </div>
        <div class="tag" v-if="patient.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" v-if="patientList.length < 6" @click="openPopup">
        <UseIcon name="user-add" class="cp-icon" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 底部按钮 -->
    <div class="patient-next">
      <van-button type="primary" round block>下一步</van-button>
    </div>
    <!-- 使用 popup 组件 -->
    <van-popup position="right" v-model:show="isShow">
      <NavBar :title="'添加患者'" right="保存" @click-right="closePopup" :back="closePopup" />
      <van-form autocomplete="off" ref="form">
        <van-field label="真实姓名" placeholder="请输入真实姓名" />
        <van-field label="身份证号" placeholder="请输入身份证号" />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input> </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox :icon-size="18" round />
          </template>
        </van-field>
      </van-form>
      <!-- 删除按钮 -->
      <van-action-bar>
        <van-action-bar-button text="删除" />
      </van-action-bar>
    </van-popup>
  </div>

  <RadioButton :options="options" v-model="gender" />
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}

// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--price);
    background-color: var(--bg);
  }
}

.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--primary);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--primary);
    background-color: var(--plain);
    .icon {
      color: var(--primary);
    }
  }
}
.patient-add {
  background-color: var(--bg);
  color: var(--primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>
