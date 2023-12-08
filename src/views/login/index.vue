<script setup lang="ts">
import { ref } from 'vue'
import { mobileRule, passwordRule } from '@/utils/rule'
import { showToast } from 'vant'
import { loginByPassword } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'

const onClickRight = () => {
  console.log('5')
}

const agree = ref(false)
const isShowPwd = ref(false)
const mobile = ref('')
const password = ref('')

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const login = async () => {
  if (!agree.value) {
    return showToast('请勾选用户协议')
  }

  const res = await loginByPassword(mobile.value, password.value)
  userStore.setUser(res.data)
  router.push((route.query.returnUrl as string) || '/user')
  showToast('登录成功')
}
</script>

<template>
  <NavBar title="登录" right="注册" @click-right="onClickRight" />
  <div class="login">
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="#">
        <span>短信验证码登录</span>
        <VanIcon name="arrow"></VanIcon>
      </a>
    </div>
    <VanForm aria-autocomplete="off" @submit="login">
      <VanField
        placeholder="请输入手机号"
        type="tel"
        v-model="mobile"
        :rules="mobileRule"
        label="手机号"
        colon
      ></VanField>
      <VanField
        placeholder="请输入密码"
        :type="isShowPwd ? 'text' : 'password'"
        v-model="password"
        :rules="passwordRule"
        label="密码"
        colon
      >
        <template #right-icon>
          <UseIcon
            @click="isShowPwd = !isShowPwd"
            :name="`login-eye-${isShowPwd ? 'on' : 'off'}`"
          />
        </template>
      </VanField>

      <div class="forget">
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
