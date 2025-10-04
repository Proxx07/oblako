<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useQrGenerator } from '@/composables/useQr';

const props = defineProps<{
  stringForQr: string
}>();

const { qrLink, imageWrapper, generateQR } = useQrGenerator();

onBeforeMount(() => {
  qrLink.value = props.stringForQr;
  generateQR();
});
</script>

<template>
  <div class="qr-wrapper">
    <div class="canvas-wrapper">
      <div ref="imageWrapper" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.canvas-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: var(--radius-m);
  overflow: hidden;
}
</style>
