<script setup lang="ts">
import { Card } from 'primevue';

defineProps<{
  balance: number
  cardNumber: string
}>();
</script>

<template>
  <Card>
    <template #content>
      <div class="card-inner">
        <div class="font-12-r color-secondary colspan-2">
          OBLACKO CARD
        </div>
        <div class="font-24-r colspan-2">
          {{ balance.toLocaleString('ru-RU') }} баллов
        </div>

        <div class="colspan-2" style="height: 1.4rem" />

        <div class="font-12-r color-secondary">
          CARD NUMBER
        </div>
        <div class="font-12-r color-secondary text-right">
          VALID THRU
        </div>

        <div class="font-14-r">
          {{ cardNumber }}
        </div>
        <div class="font-14-r text-right">
          12/26
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card-inner {
  padding: 1rem;
  display: grid;
  grid-template-columns: auto 80px;
  gap: 1rem;
}
</style>
