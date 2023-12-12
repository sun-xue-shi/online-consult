import { sendCode } from '@/api/user'
import { showToast, type FormInstance } from 'vant'
import { onUnmounted, ref, type Ref } from 'vue'

export const useMobileCode = (mobile: Ref<string>, type: string) => {
  const form = ref<FormInstance>()
  const time = ref(0)
  const code = ref('')
  let timer: number
  // 发送验证码
  const onSend = async () => {
    if (time.value > 0) return
    try {
      await form.value?.validate('mobile')

      const res = await sendCode(mobile.value, type)
      code.value = res.data.code
      showToast('发送成功')
      time.value = 60
      timer = setInterval(() => {
        time.value--
        if (time.value <= 0) clearInterval(timer)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    onSend,
    time,
    form,
    code
  }
}
