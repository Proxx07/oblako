<script setup lang="ts">
import { Dialog } from 'primevue';
import { ref } from 'vue';

const menuPdfPath = '/menu.pdf';

const menuPreview = '/oblaco-menu-1.jpg';
const showPdfDialog = ref(false);
</script>

<template>
  <div class="menu-preview">
    <div class="preview-content" @click="showPdfDialog = true">
      <img
        :src="menuPreview"
        alt="Меню"
        class="preview-image"
      >
      <div class="preview-overlay">
        <div class="preview-text">
          Нажмите, чтобы открыть меню
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="showPdfDialog"
      modal
      class="pdf-dialog full-dialog"
      :show-header="true"
      header="Меню"
      :closable="true"
      :dismissable-mask="true"
      :pt="{
        content: {
          style: 'height: 100%',
        },
      }"
    >
      <iframe
        :src="`${menuPdfPath}#toolbar=1&navpanes=1&scrollbar=1`"
        class="pdf-iframe"
        frameborder="0"
      />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.menu-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20rem;
}

.preview-content {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 20rem;
  cursor: pointer;
  border-radius: var(--radius-m);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;

  .preview-content:hover & {
    opacity: 1;
  }
}

.preview-text {
  font: var(--font-16-r);
  color: white;
  text-align: center;
  padding: 1.6rem;
}

:deep(.pdf-dialog) {
  .p-dialog-content {
    padding: 0;
    height: 100% !important;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  flex: 1;
}
</style>
