<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onClickLeft = () => {
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}

defineProps<{
  title: string
  right: string
}>()

const emit = defineEmits<{
  (e: 'click-right'): void
}>()
</script>

<template>
  <div class=""></div>
  <VanNavBar
    @click-left="onClickLeft"
    @click-right="emit('click-right')"
    fixed
    :title="title"
    :right-text="right"
    left-arrow
  ></VanNavBar>
</template>

<style scoped lang="scss">
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--text1);
    }
    &__text {
      font-size: 15px;
      color: var(--primary);
    }
  }
}
</style>
