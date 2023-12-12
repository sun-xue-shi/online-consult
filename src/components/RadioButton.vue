<script setup lang="ts">
defineProps<{
  options: { label: string; value: number | string }[]
  modelValue?: number | string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
}>()
</script>

<template>
  <div class="radio-btn">
    <span
      class="item"
      v-for="item in options"
      :key="item.value"
      :class="{ active: item.value === modelValue }"
      @click="emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.radio-btn {
  display: flex;
  // flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--bg);
    background-color: var(--bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.2s;
    &.active {
      border-color: var(--primary);
      background-color: var(--plain);
    }
  }
}
</style>
