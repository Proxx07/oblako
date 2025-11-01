<script setup lang="ts">
import { Button, Card, Dialog, Toast } from 'primevue';
import { useRoute, useRouter } from 'vue-router';
import { contacts, history, home, oblacko, profile, qr } from '@/assets/icons';
import QrGenerator from '@/components/QrGenerator.vue';
import ConfirmationModal from '@/components/UI/confirmations/ConfirmationModal.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useToggle } from '@/composables/UI';
import { $confirm } from '@/plugins/confirmation.ts';
import { useConfirmationsStore } from '@/store/confirmations';
import { useGlobalLoader } from '@/store/globalLoader.ts';
import { useUserStore } from '@/store/userStore.ts';

const confirmationsStore = useConfirmationsStore();
const globalLoaderStore = useGlobalLoader();
const $route = useRoute();
const $router = useRouter();

const userStore = useUserStore();

const toolbarPages = [
  { name: 'Главная', icon: home, routerName: 'main' },
  { name: 'История', icon: history },
  { name: 'qr', icon: qr },
  { name: 'Контакты', icon: contacts, routerName: 'contacts' },
  { name: 'Профиль', icon: profile, routerName: 'profile' }];

const { show: showQr, open: openQr } = useToggle();

const clickHandler = async (page: { name: string, routerName?: string }) => {
  if (page.name === 'qr') return openQr();
  if (page.name === 'История') return $confirm.info({ title: 'confirmations.warning', subtitle: 'pageInDev' });
  if (page.routerName) return $router.push({ name: page.routerName });
};
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

  <template v-if="$route.name !== 'auth' && $route.name !== 'registration'">
    <Card class="toolbar">
      <template #content>
        <Button
          v-for="page in toolbarPages"
          :key="page.name"
          :label="page.name !== 'qr' ? page.name : undefined"
          :icon="page.icon"
          :severity="($route.name === page.routerName || page.name === 'qr') ? 'primary' : 'secondary'"
          icon-pos="top"
          size="small"
          :class="[page.name === 'qr' && 'qr-button']"
          :text="page.name !== 'qr'"
          :pt="{ label: { class: 'font-12-l' } }"
          @click="clickHandler(page)"
        />
      </template>
    </Card>
    <Dialog v-model:visible="showQr" modal header="Код для кассира">
      <div class="qr-inner text-center">
        <QrGenerator :string-for-qr="userStore.userCardNumber" />

        <div>
          <div class="font-16-r" style="margin-bottom: .8rem">
            Номер карты
          </div>
          <div class="font-14-l color-secondary">
            {{ userStore.cardNumberPreview }}
          </div>
        </div>

        <Card>
          <template #content>
            <div class="font-12-r color-secondary">
              Баланс
            </div>
            <div class="font-18-r" style="color: var(--primary-500); margin-top: 5px">
              {{ userStore.walletBalance.toLocaleString('ru') }} баллов
            </div>
          </template>
        </Card>
      </div>
      <template #footer>
        <div class="font-14-l color-secondary text-center w-full">
          Покажите этот код кассиру для списания баллов
        </div>
      </template>
    </Dialog>
  </template>
  <Transition name="fade">
    <div v-if="globalLoaderStore.loader" class="global-loader">
      <!-- <div class="title">
        OBLACKO
      </div>

      <div class="note">
        Smoke. Vibe. Repeat.
      </div> -->
      <VIcon :icon="oblacko" :size="256" />
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
  z-index: 1000;
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
  padding: .8rem;
  bottom: 1rem;
  left: 2.4rem;
  right: 2.4rem;
  z-index: 100;

  :deep(svg) {
    width: 2.1rem;
    height: 2.1rem;
  }

  .qr-button {
    aspect-ratio: 1;
    max-width: 6.4rem;
    height: auto;
    width: 100%;
    :deep(svg) {
      width: 3.2rem;
      height: 3.2rem;
    }
  }

  :deep(.p-card-body) {
    padding: 0;
  }
  :deep(.p-card-content) {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
  :deep(.p-button-sm) {
    padding: .8rem;
  }
}

.qr-inner {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
