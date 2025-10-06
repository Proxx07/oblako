<script setup lang="ts">
import { Button, Card, Dialog } from 'primevue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { aim, calendar, delivery, logout, qr, users } from '@/assets/icons';
import QrGenerator from '@/components/QrGenerator.vue';
import CreditCard from '@/components/UI/CreditCard.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useToggle } from '@/composables/UI';
import { $confirm } from '@/plugins/confirmation.ts';
import { useUserStore } from '@/store/userStore.ts';

const userStore = useUserStore();
const $router = useRouter();
const { show: showQr, open: openQr } = useToggle();

const advantages = [
  { title: 'Резерв', text: 'Забронировать', icon: calendar, link: 'https://t.me/Oblacko_10' },
  { title: 'Доставка', text: 'Заказать домой', icon: delivery, link: 'https://eats.yandex.com/uz/r/oblako_1681733515?placeSlug=oblako' },
  { title: 'Друзья', text: 'Мои друзья', icon: users },
  { title: 'Лояльность', text: 'Правила бонусов', icon: aim },
];

const walletBalance = computed<number>(() => {
  if (!userStore.userInfo) return 0;
  return userStore.userInfo.walletBalances.reduce((total, wallet) => {
    return total + wallet.balance;
  }, 0);
});

const userCardNumber = computed(() => {
  return userStore.userInfo?.cards[0]?.number ?? '';
});

const cardNumberPreview = computed(() => {
  const strArr = userCardNumber.value.match(/.{1,4}/g) || [];
  return strArr.join(' ');
});

const validThru = computed(() => {
  if (!userStore.userInfo) return '';
  const date = new Date(userStore.userInfo.whenRegistered.replace(' ', 'T'));
  date.setFullYear(date.getFullYear() + 1);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${year}`;
});

const logOut = async () => {
  const ok = await $confirm.default({ title: 'confirmations.warning', subtitle: 'logout' });
  if (ok) {
    userStore.resetUserData();
    await $router.push({ name: 'auth' });
  }
};
</script>

<template>
  <div v-if="userStore.userInfo" class="main">
    <div class="greeting">
      <div class="details">
        <div class="font-24-r">
          Привет, {{ userStore.userInfo.name }}!
        </div>
        <!-- <div class="font-16-r color-secondary">
          Добро пожаловать в OBLACKO
        </div> -->
      </div>
      <Button :icon="logout" label="Выйти" size="small" icon-pos="right" severity="secondary" @click="logOut" />
    </div>

    <CreditCard :balance="walletBalance" :card-number="cardNumberPreview" :valid-thru="validThru" />

    <Button label="Показать код кассиру" fluid :icon="qr" @click="openQr" />

    <div class="services">
      <Card v-for="item in advantages" :key="item.title" style="position:relative;">
        <template #content>
          <div style="padding: .5rem;">
            <VIcon :icon="item.icon" color="var(--primary-500)" :size="31" style="margin-bottom: 1rem" />
            <div class="font-14-r">
              {{ item.title }}
            </div>
            <div class="font-12-r" style="padding-top: .4rem">
              {{ item.text }}
            </div>
          </div>
          <a v-if="item.link" :href="item.link" style="position: absolute; inset: 0" target="_blank" />
        </template>
      </Card>
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

        <Card>
          <template #content>
            <div class="font-12-r color-secondary">
              Баланс
            </div>
            <div class="font-18-r" style="color: var(--primary-500); margin-top: 5px">
              {{ walletBalance.toLocaleString('ru') }} баллов
            </div>
          </template>
        </Card>
      </div>
      <template #footer>
        <div class="font-14-l color-secondary text-center w-full">
          Покажите этот код кассиру для списания баллов
        </div>
      </template>
    </dialog>
  </div>
</template>

<style scoped lang="scss">
.color-secondary {
  color: var(--secondary-900)
}
.greeting {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
  :deep(.p-button) {
    gap: .5rem;
    padding-left: 1.4rem;
  }
  :deep(svg) {
    height: 2rem;
    width: 2rem;
  }
}

.qr-inner {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.main {
  display: flex;
  flex-direction: column;
  padding: 4rem 2.4rem 12rem;
  gap: 2.3rem;
}

.services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
}
</style>
