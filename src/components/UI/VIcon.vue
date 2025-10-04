<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  icon: string
  size?: number
  spanBg?: string
  color?: string
  noFill?: boolean
}>();

const colorVal = computed(() => props.color || 'unset');
const iconSize = computed(() => props.size ? `${props.size}px` : 'auto');
// const background = computed(() => props.spanBg || 'transparent');
</script>

<template>
  <span
    :class="[noFill && 'no-fill']"
    v-html="props.icon"
  />
</template>

<style scoped lang="scss">
span {
  display: inline-block;
  font-size: 0;
  overflow: hidden;
  text-align: center;
  color: v-bind(colorVal);
  &.primary-gradient {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: var(--radius-l);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-500);
    border: 1px solid color-mix(in oklab, var(--primary-500) 30%, transparent);
  }
  :deep(svg) {
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    max-width: 100%;
    max-height: 100%;
    transition: var(--transition-fast);

    &[fill]:not([fill='none']) {
      fill: currentColor;
    }
  }
  &:not(.no-fill) {
    :deep(svg) {
      [fill]:not([fill='none']) {
        fill: currentColor;
      }
      [stroke]:not([stroke='none']) {
        stroke: currentColor;
      }
    }
  }
}
</style>
