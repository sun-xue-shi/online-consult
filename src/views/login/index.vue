<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'

const onClickRight = () => {
  console.log('5')
}

const agree = ref(false)
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
    <VanForm aria-autocomplete="off">
      <VanField placeholder="请输入手机号" type="tel"></VanField>
      <VanField placeholder="请输入密码" type="password"></VanField>
      <div class="forget">
        <a href="#">忘记密码?</a>
      </div>

      <div class="cell">
        <VanButton block round type="primary">登录</VanButton>
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
