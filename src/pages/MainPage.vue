<script setup lang="ts">
import { Card } from 'primevue';
import { computed } from 'vue';
import { calendar, delivery } from '@/assets/icons';
import CreditCard from '@/components/UI/CreditCard.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useUserStore } from '@/store/userStore.ts';

const userStore = useUserStore();

const advantages = [
  { title: 'Доставка', text: '', icon: delivery, link: 'https://eats.yandex.com/uz/r/oblako_1681733515?placeSlug=oblako' },
  { title: 'Резерв', text: '', icon: calendar, link: 'https://t.me/Oblacko_10' },
  // { title: 'Друзья', text: 'Мои друзья', icon: users },
  // { title: 'Лояльность', text: 'Правила бонусов', icon: aim },
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
</script>

<template>
  <div v-if="userStore.userInfo" class="main">
    <div class="greeting">
      <div class="details">
        <div class="font-24-r">
          Привет, <br> {{ userStore.userInfo.name }}!
        </div>
      </div>
    </div>

    <CreditCard :balance="walletBalance" :card-number="cardNumberPreview" :valid-thru="validThru" />

    <!-- <Button label="Показать код кассиру" fluid :icon="qr" @click="openQr" /> -->

    <div class="services">
      <Card v-for="item in advantages" :key="item.title" style="position:relative;">
        <template #content>
          <div style="padding: .5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <VIcon :icon="item.icon" color="var(--primary-500)" :size="32" style="margin-bottom: 1rem" />
            <div class="font-14-l">
              {{ item.title }}
            </div>
            <div class="font-12-l" style="padding-top: .4rem">
              {{ item.text }}
            </div>
          </div>
          <a v-if="item.link" :href="item.link" style="position: absolute; inset: 0" target="_blank" />
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
