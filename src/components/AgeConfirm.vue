<script setup lang="ts">
import type { AuthSteps } from '@/composables/useAuth/models';
import { Button, Card } from 'primevue';
import { useI18n } from 'vue-i18n';
import { check, warning } from '@/assets/icons';
import VIcon from '@/components/UI/VIcon.vue';

const emit = defineEmits<{
  (e: 'change-step', value: AuthSteps): void
}>();

const { t } = useI18n();
</script>

<template>
  <Card class="card">
    <template #content>
      <div class="card-content">
        <VIcon
          :icon="warning"
          :size="32"
          span-bg="var(--form-field-bg)"
          padding="2rem"
        /> <span />

        <div class="font-24-b">
          {{ t('auth.ageQuestion') }}
        </div>
        <div class="note-text">
          {{ t('auth.serviceAge') }}
        </div>

        <span /> <span />
        <Button :label="t('auth.ageConfirm')" :icon="check" fluid @click="emit('change-step', 'phone')" />
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card {
  padding: 2rem;
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    align-items: center;
    text-align: center;
  }
}
</style>
