<script setup lang="ts">
import { Card } from 'primevue';

defineProps<{
  balance: number
  cardNumber: string
  validThru: string
}>();
</script>

<template>
  <Card class="card">
    <template #content>
      <div class="card-inner">
        <div class="font-16-b colspan-2">
          OBLACKO
        </div>

        <div class="colspan-2">
          <div class="font-12-r text-center">
            Балланс
          </div>
          <div class="text-center" style="font-family: var(--primary-font-r); font-size: 6.4rem; font-weight: 700;">
            {{ balance.toLocaleString('ru-RU') }}
          </div>
          <div class="font-12-r text-center">
            Баллов
          </div>
        </div>
        <div class="colspan-2" style="height: 1.4rem" />

        <div class="font-12-r color-secondary">
          Номер карты
        </div>
        <div class="font-12-r color-secondary text-right">
          Действует до
        </div>

        <div class="font-16-b">
          {{ cardNumber }}
        </div>
        <div class="font-16-b text-right">
          {{ validThru }}
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card {
  color: var(--black);
  background: linear-gradient(to bottom, rgba(255, 193, 7, 1), rgba(255, 213, 79, 1));
}
.card-inner {
  padding: 1rem;
  display: grid;
  grid-template-columns: auto 10rem;
  gap: 1rem;
}
</style>
