const mobileRule = [
  {
    require: true,
    message: '请输入手机号'
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号格式不正确'
  }
]

const passwordRule = [
  {
    require: true,
    message: '请输入密码'
  },
  {
    pattern: /^\w{8,24}$/,
    message: '密码格式不正确'
  }
]

export { mobileRule, passwordRule }
