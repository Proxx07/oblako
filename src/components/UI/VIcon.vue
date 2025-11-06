<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  icon: string
  size?: number
  spanBg?: string
  color?: string
  noFill?: boolean
  padding?: string
}>();

const colorVal = computed(() => props.color || 'unset');
const iconSize = computed(() => props.size ? `${props.size}px` : 'auto');
const bg = computed(() => props.spanBg || 'transparent');
const pa = computed(() => props.padding || '0rem');
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
  background: v-bind(bg);
  padding: v-bind(pa);
  // border-radius: var(--radius-round);
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
