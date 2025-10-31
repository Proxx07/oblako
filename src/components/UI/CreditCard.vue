<script setup lang="ts">
import { Card } from 'primevue';

defineProps<{
  balance: number
  cardNumber: string
  validThru: string
}>();
</script>

<template>
  <Card
    :pt="{ body: {
      class: 'credit-card',
    } }"
  >
    <template #content>
      <div class="card-inner">
        <div class="brand">
          OBLACKO
        </div>

        <div class="balance-top color-bg">
          Баланс
        </div>
        <div class="balance-value color-bg font-48-lb">
          {{ balance.toLocaleString('ru-RU') }}
        </div>
        <div class="balance-bottom color-bg">
          баллов
        </div>

        <div class="label-left color-bg">
          Номер карты
        </div>
        <div class="label-right color-bg">
          Действует до
        </div>

        <div class="value-left">
          {{ cardNumber }}
        </div>
        <div class="value-right">
          {{ validThru }}
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card-inner {
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto auto auto;
  grid-template-areas:
    "brand brand"
    "bal-top bal-top"
    "bal-val bal-val"
    "bal-bot bal-bot"
    "label-left label-right"
    "value-left value-right";
  align-items: center;
  row-gap: .8rem;
}

.brand { grid-area: brand; font: var(--font-16-lb); }
.balance-top { grid-area: bal-top; text-align: center; font: var(--font-12-l); }
.balance-value {
  grid-area: bal-val;
  text-align: center;
  line-height: 1;
}
.balance-bottom { grid-area: bal-bot; text-align: center; font: var(--font-12-l); }

.label-left { grid-area: label-left; font: var(--font-12-r); }
.label-right { grid-area: label-right; text-align: right; font: var(--font-10-r); }

.value-left { grid-area: value-left; font: var(--font-14-lb); }
.value-right { grid-area: value-right; text-align: right; font: var(--font-14-lb); }
</style>
