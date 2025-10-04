<script setup lang="ts">
import { Button, Toast } from 'primevue';
import { useRoute } from 'vue-router';
import { contacts, history, home, profile } from '@/assets/icons';
import ConfirmationModal from '@/components/UI/confirmations/ConfirmationModal.vue';
import { useConfirmationsStore } from '@/store/confirmations';
import { useGlobalLoader } from '@/store/globalLoader.ts';

const confirmationsStore = useConfirmationsStore();
const globalLoaderStore = useGlobalLoader();
const $route = useRoute();
const toolbarPages = [
  { name: 'Главная', icon: home },
  { name: 'История', icon: history },
  { name: 'Контакты', icon: contacts },
  { name: 'Профиль', icon: profile }];
</script>

<template>
  <component :is="$route.meta.layoutComponent">
    <slot />
  </component>

  <div v-if="confirmationsStore.confirmations.length" id="confirmations-wrapper">
    <ConfirmationModal v-for="confirmation in confirmationsStore.confirmations" :key="confirmation.id">
      <component :is="confirmation.component" />
    </ConfirmationModal>
  </div>

  <Toast />

  <div v-if="$route.name === 'main'" class="toolbar">
    <Button
      v-for="page in toolbarPages"
      :key="page.name"
      :label="page.name"
      :icon="page.icon"
      :severity="page.name === 'Главная' ? 'primary' : 'secondary'"
      icon-pos="top"
      size="small"
      :outlined="page.name === 'Главная'"
      :text="page.name !== 'Главная'"
      class="toolbar-button"
      :class="[page.name === 'Главная' && 'doted']"
    />
  </div>

  <Transition name="fade">
    <div v-if="globalLoaderStore.loader" class="global-loader">
      <div class="title">
        OBLACKO
      </div>

      <div class="note">
        Smoke. Vibe. Repeat.
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.global-loader {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 3.2rem;
  .title {
    position: relative;
    font: normal 400 9.6rem/1 var(--primary-font-r);
    padding-bottom: 2.4rem;
    letter-spacing: 0.25em;
    @include media-max($tablet) {
      font: normal 400 6rem/1 var(--primary-font-r);
    }
    &:before {
      content: '';
      position: absolute;
      background: var(--primary-500);
      height: .2rem;
      width: 12.5rem;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .note {
    font: var(--font-14-l);
    color: var(--secondary-900);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
}

.toolbar {
  position: fixed;
  padding: 1.6rem 2.4rem;
  bottom: 1rem;
  left: 2.4rem;
  right: 2.4rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: space-around;
  gap: 1.2rem;
  .toolbar-button {
    border: 0 !important;
    --p-button-sm-padding-x: 1.2rem;
    &.doted {
      &:after {
        content:'';
        position: absolute;
        top: -3px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: var(--radius-round);
        width: 8px;
        height: 8px;
        background: currentColor;
      }
    }
  }
}
</style>
