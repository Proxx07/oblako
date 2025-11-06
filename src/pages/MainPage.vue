<script setup lang="ts">
import { Button, Card, Dialog } from 'primevue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { calendar, delivery, logout, menu, rules, users } from '@/assets/icons';
import HistorySlider from '@/components/HistorySlider.vue';
import LoyaltyRules from '@/components/LoyaltyRules.vue';
import MenuSlider from '@/components/MenuSlider.vue';
import CreditCard from '@/components/UI/CreditCard.vue';
import RubberList from '@/components/UI/RubberList.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useToggle } from '@/composables/UI';
import { mockHistories } from '@/composables/useHistories/models';
import { $confirm } from '@/plugins/confirmation.ts';
import { useUserStore } from '@/store/userStore.ts';

const userStore = useUserStore();
const $router = useRouter();

const { show: showRules, open: openRules } = useToggle();
const { show: showMenu, open: openMenu } = useToggle();

const advantages = [
  { title: 'Доставка', icon: delivery, link: 'https://eats.yandex.com/uz/r/oblako_1681733515?placeSlug=oblako' },
  { title: 'Резерв', icon: calendar, link: 'https://t.me/oblacko_tashkent' },
  { title: 'Друзья', icon: users, action: () => $confirm.info({ title: 'confirmations.warning', subtitle: 'loyaltySystemInDev' }) },
  { title: 'Меню', icon: menu, action: () => openMenu() },
  { title: 'Правила', icon: rules, action: () => openRules() },
];

const validThru = computed(() => {
  if (!userStore.userInfo) return '';
  const date = new Date(userStore.userInfo.whenRegistered.replace(' ', 'T'));
  date.setFullYear(date.getFullYear() + 1);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
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
          Добро пожаловать, {{ userStore.userInfo.name }}
        </div>
      </div>
      <Button :icon="logout" outlined severity="secondary" @click="logOut" />
    </div>

    <CreditCard :balance="userStore.walletBalance" :card-number="userStore.cardNumberPreview" :valid-thru="validThru" />

    <RubberList :gap="1.6">
      <Card
        v-for="item in advantages"
        :key="item.title"
        style="position:relative"
        @click="item.action"
      >
        <template #content>
          <div style="padding: .5rem" class="text-center">
            <VIcon :icon="item.icon" color="var(--primary-500)" :size="32" style="margin-bottom: 1rem" />
            <div class="font-14-r">
              {{ item.title }}
            </div>
          </div>
          <a v-if="item.link" :href="item.link" style="position: absolute; inset: 0" target="_blank" />
        </template>
      </Card>
    </RubberList>

    <div class="font-18-r">
      Выгодные предложения
    </div>

    <HistorySlider :slides="mockHistories" />

    <LoyaltyRules v-model="showRules" />

    <Dialog v-model:visible="showMenu" modal class="full-dialog" header="Меню">
      <MenuSlider />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.greeting {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: space-between;
  :deep(.p-button) {
    padding-left: .4rem;
  }
  :deep(svg) {
    height: 2rem;
    width: 2rem;
  }
}

.main {
  display: flex;
  flex-direction: column;
  padding: 4rem 2.4rem 12rem;
  gap: 2.3rem;
}

.services {
  --gap: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  :deep(.p-card) {
    box-sizing: border-box;
    flex: 1 1 calc((100% - (var(--gap) * 2)) / 3);
    min-width: 0;
  }
}
</style>
