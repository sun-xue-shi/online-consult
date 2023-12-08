<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <svg aria-hidden="true" class="icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
}
</style>
