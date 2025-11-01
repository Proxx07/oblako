<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  gap: number
}>();

const gapVal = computed(() => `${props.gap}rem`);
</script>

<template>
  <div class="list" :style="{ '--gap': gapVal }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  width: 100%;
  > * {
    box-sizing: border-box;
    flex: 1 1 calc((100% - (var(--gap) * 2)) / 3);
    min-width: 0;
  }
}
</style>
