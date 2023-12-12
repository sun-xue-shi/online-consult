<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { mobileRule, passwordRule, codeRule } from '@/utils/rule'
import { showToast, type FormInstance } from 'vant'
import { loginByPassword, sendCode, loginByMobile } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { useMobileCode } from '@/hooks/index'
// import { AxiosResponse } from 'axios'

const onClickRight = () => {
  console.log('5')
}

const agree = ref(false)
const isShowPwd = ref(false)
const mobile = ref('')
const password = ref('')

// 登录功能
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const login = async () => {
  if (!agree.value) {
    return showToast('请勾选用户协议')
  }

  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value)

  userStore.setUser(res.data)
  router.push((route.query.returnUrl as string) || '/user')
  showToast('登录成功')
}

const isPass = ref(true)

const { form, onSend, time, code } = useMobileCode(mobile, 'login')
</script>

<template>
  <NavBar title="登录" right="注册" @click-right="onClickRight" />
  <div class="login">
    <div class="login-head">
      <h3>{{ !isPass ? '验证码登录' : '密码登录' }}</h3>
      <a href="#" @click="isPass = !isPass">
        <span>{{ isPass ? '验证码登录' : '密码登录' }}</span>
        <VanIcon name="arrow"></VanIcon>
      </a>
    </div>
    <VanForm aria-autocomplete="off" @submit="login" ref="form">
      <VanField
        placeholder="请输入手机号"
        type="tel"
        v-model="mobile"
        :rules="mobileRule"
        label="手机号"
        colon
        name="mobile"
      ></VanField>
      <VanField
        placeholder="请输入密码"
        :type="isShowPwd ? 'text' : 'password'"
        v-model="password"
        :rules="passwordRule"
        label="密码"
        colon
        v-if="isPass"
      >
        <template #right-icon>
          <UseIcon
            @click="isShowPwd = !isShowPwd"
            :name="`login-eye-${isShowPwd ? 'on' : 'off'}`"
          />
        </template>
      </VanField>
      <VanField
        placeholder="请输入验证码"
        type="text"
        v-model="code"
        :rules="codeRule"
        label="验证码"
        colon
        v-else
      >
        <template #button>
          <span class="btn-send" @click="onSend">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}</span
          >
        </template>
      </VanField>

      <div class="forget" v-if="isPass">
        <a href="#">忘记密码?</a>
      </div>

      <div class="cell">
        <VanButton block round type="primary" native-type="submit">登录</VanButton>
      </div>
      <div class="cell">
        <VanCheckbox v-model="agree">
          <span>我已同意</span>
          <a href="#">用户协议</a>
          <span>及</span>
          <a href="#">隐私条款</a>
        </VanCheckbox>
      </div>
    </VanForm>
  </div>
</template>

<style scoped lang="scss">
.login {
  padding-top: 46px;
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-size: 24px;
      font-weight: normal;
    }

    a {
      font-size: 15px;
    }
  }
  .van-form {
    padding: 0 14px;
    .forget {
      padding: 15px 15px 15px 0;
      display: flex;
      justify-content: flex-end;
    }
    .cell {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 52px;
      // padding: 14px 16px;
      box-sizing: border-box;
      .van-checkbox {
        a {
          color: var(--primary);
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
