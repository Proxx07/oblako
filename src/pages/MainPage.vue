<script setup lang="ts">
import { Button, Card, Dialog } from 'primevue';
import { computed } from 'vue';
import { aim, calendar, delivery, qr, users } from '@/assets/icons';
import QrGenerator from '@/components/QrGenerator.vue';
import CreditCard from '@/components/UI/CreditCard.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useToggle } from '@/composables/UI';
import { useUserStore } from '@/store/userStore.ts';

const userStore = useUserStore();

const { show: showQr, open: openQr } = useToggle();

const advantages = [
  { title: 'Резерв', text: 'Забронировать', icon: calendar },
  { title: 'Доставка', text: 'Заказать домой', icon: delivery },
  { title: 'Друзья', text: 'Мои друзья', icon: users },
  { title: 'Лояльность', text: 'Правила бонусов', icon: aim },
];

const walletBalance = computed<number>(() => {
  if (!userStore.userInfo) return 0;
  return userStore.userInfo.walletBalances.reduce((total, wallet) => {
    return total + wallet.balance;
  }, 0);
});

let cardNumber = '';
for (let i = 0; i < 16; i++) {
  cardNumber += Math.floor(Math.random() * 10); // digit 0–9
}

const cardNumberPreview = computed(() => {
  const strArr = cardNumber.match(/.{1,4}/g) || [];

  return strArr.join(' ');
});
</script>

<template>
  <div v-if="userStore.userInfo" class="main">
    <div class="greeting">
      <div class="font-24-r">
        Привет, {{ userStore.userInfo.name }}!
      </div>
      <div class="font-16-r color-secondary">
        Добро пожаловать в OBLACKO
      </div>
    </div>

    <CreditCard :balance="walletBalance" :card-number="cardNumberPreview" />

    <Button label="Показать код кассиру" fluid :icon="qr" @click="openQr" />

    <div class="advantages">
      <Card v-for="item in advantages" :key="item.title">
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
        </template>
      </Card>
    </div>
    <div class="advantages">
      <Card v-for="item in advantages" :key="item.title">
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
        </template>
      </Card>
    </div>
    <div class="advantages">
      <Card v-for="item in advantages" :key="item.title">
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
        </template>
      </Card>
    </div>

    <Dialog v-model:visible="showQr" modal header="Код для кассира">
      <div class="qr-inner text-center">
        <QrGenerator :string-for-qr="cardNumber" />

        <div class="bar-code">
          <div style="display: flex; gap: 0.2rem; justify-content: center; padding-bottom: .8rem;">
            <span v-for="i in 15" :key="i" style="height: 2.4rem; width: .4rem; background: var(--white)" />
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
  flex-direction: column;
  gap: 1.2rem;
}

.qr-inner {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.main {
  display: flex;
  flex-direction: column;
  padding: 4rem 2.4rem;
  gap: 2.3rem;
}

.advantages {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
}
</style>
