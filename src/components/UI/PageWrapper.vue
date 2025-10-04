<script setup lang="ts">
import { onMounted, ref } from 'vue';

const topAnimate = ref(false);
const centerAnimate = ref(false);
const footerAnimate = ref(false);

const setQueuedAnimations = async () => {
  topAnimate.value = true;
  await new Promise(resolve => setTimeout(resolve, 200));
  centerAnimate.value = true;
  await new Promise(resolve => setTimeout(resolve, 200));
  footerAnimate.value = true;
};

onMounted(() => {
  setQueuedAnimations();
});
</script>

<template>
  <div class="page-wrapper">
    <div class="page-top" :class="[!topAnimate && 'slide-in-down-enter-from']">
      <slot name="top" />
    </div>
    <div class="page-content" :class="[!centerAnimate && 'scale-fade-enter-from']">
      <slot />
    </div>
    <div class="page-bottom" :class="[!footerAnimate && 'slide-in-up-enter-from']">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4.8rem 1.6rem 0;
  width: 100%;
  flex-grow: 1;
}

.page-top,
.page-content,
.page-bottom {
  transition: var(--transition-slow);
}

.page-top {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
}
.page-bottom {
  padding-bottom: 4rem;
}
</style>
