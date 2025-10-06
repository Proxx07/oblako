<script setup lang="ts">
import { Card } from 'primevue';
import { phone } from '@/assets/icons';
import VIcon from '@/components/UI/VIcon.vue';
</script>

<template>
  <div class="profile">
    <div class="top">
      <div class="font-24-r">
        Профиль
      </div>
      <div class="font-16-r color-secondary">
        Управление аккаунтом и настройками
      </div>
    </div>

    <div class="content">
      <div class="font-16-r" style="margin-bottom: .4rem">
        Связаться с нами
      </div>

      <Card style="padding: 0">
        <template #content>
          <VIcon :icon="phone" class="primary-gradient" />
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  padding: 4rem 2.4rem 12rem;
  gap: 2.3rem;
}
.top {
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>
