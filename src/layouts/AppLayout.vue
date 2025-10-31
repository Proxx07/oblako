<script setup lang="ts">
import { Button, Dialog, Toast } from 'primevue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { contacts, history, home, profile, qr } from '@/assets/icons';
import QrGenerator from '@/components/QrGenerator.vue';
import ConfirmationModal from '@/components/UI/confirmations/ConfirmationModal.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useToggle } from '@/composables/UI';
import { useConfirmationsStore } from '@/store/confirmations';
import { useGlobalLoader } from '@/store/globalLoader.ts';
import { useUserStore } from '@/store/userStore.ts';

const confirmationsStore = useConfirmationsStore();
const globalLoaderStore = useGlobalLoader();
const $route = useRoute();
const $router = useRouter();

const toolbarPages = [
  { name: 'Главная', icon: home, routerName: 'main' },
  { name: 'История', icon: history, routerName: undefined },
  { name: 'Контакты', icon: contacts, routerName: 'contacts' },
  { name: 'Профиль', icon: profile, routerName: 'profile' }];

const { show: showQr, open: openQr } = useToggle();

const userStore = useUserStore();
const walletBalance = computed<number>(() => {
  if (!userStore.userInfo) return 0;
  return userStore.userInfo.walletBalances.reduce((total, wallet) => total + wallet.balance, 0);
});
const userCardNumber = computed(() => userStore.userInfo?.cards[0]?.number ?? '');
const cardNumberPreview = computed(() => (userCardNumber.value.match(/.{1,4}/g) || []).join(' '));

const openQrFab = () => openQr();
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

  <Dialog v-model:visible="showQr" modal header="Код для кассира">
    <div class="qr-inner text-center">
      <QrGenerator :string-for-qr="userCardNumber" />
      <div>
        <div class="font-16-r" style="margin-bottom: .8rem">
          Номер карты
        </div>
        <div class="font-14-l color-secondary">
          {{ cardNumberPreview }}
        </div>
      </div>
      <div class="font-12-r color-secondary">
        Баланс
      </div>
      <div class="font-18-r" style="color: var(--primary-500); margin-top: 5px">
        {{ walletBalance.toLocaleString('ru') }} баллов
      </div>
    </div>
  </Dialog>

  <Toast />

  <div v-if="$route.name !== 'auth' && $route.name !== 'registration' && $route.name !== 'age'" class="nav">
    <div class="nav__items">
      <div
        v-for="(page) in toolbarPages"
        :key="page.name"
        class="nav__item"
        :class="[{ active: $route.name === page.routerName, disabled: !page.routerName }]"
        @click="() => page.routerName && $router.push({ name: page.routerName })"
      >
        <VIcon :icon="page.icon" class="nav__icon" />
      </div>

      <button type="button" class="nav__fab" @click="openQrFab">
        <VIcon :icon="qr" class="nav__fab-icon" />
      </button>
    </div>
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
  background: var(--bg-color);
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
      font: normal 400 5rem/1 var(--primary-font-r);
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

.nav {
  position: fixed;
  bottom: 1rem;
  left: 2.4rem;
  right: 2.4rem;
  padding: 1.2rem 1.5rem;
  background: rgba(29, 29, 29, 1);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-radius: 30px;
  border: 1px solid rgba(66, 66, 66, 0.5);
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;

  .nav__items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.6rem;
    align-items: center;
  }

  .nav__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: .6rem 1.2rem;
    color: var(--secondary-800);
    cursor: pointer;
    user-select: none;
    position: relative;
    border-radius: 24px;
    overflow: visible;
    .nav__icon { color: currentColor; }
    :deep(svg) { width: 2.4rem; height: 2.4rem; }
    &.active { color: var(--primary-500); }
    &.active :deep(svg) { filter: none; }
    &.disabled { opacity: .5; pointer-events: none; }
  }

  .nav__fab {
    grid-column: 3;
    grid-row: 1;
    justify-self: center;
    align-self: center;
    height: 6.4rem;
    width: 6.4rem;
    border-radius: 50%;
    background: var(--primary-500);
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 18px color-mix(in srgb, var(--primary-500), transparent 60%);
    .nav__fab-icon { color: var(--primary-surface-color); }
    :deep(svg) { width: 2.8rem; height: 2.8rem; }
  }
}
</style>
