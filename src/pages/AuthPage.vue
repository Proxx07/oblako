<script setup lang="ts">
import { Button, Card } from 'primevue';
import { useI18n } from 'vue-i18n';
import { forwardArrow, phone } from '@/assets/icons';
import VInputMask from '@/components/Form/VInputMask.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useAuth } from '@/composables/useAuth';

const { t } = useI18n();
const { loading, phoneNumber, getCustomerInfo } = useAuth();
</script>

<template>
  <PageWrapper>
    <template #top>
      <div class="title">
        OBLACKO
      </div>
      <div class="note">
        {{ t('auth.login') }}
      </div>
    </template>
    <Card class="card">
      <template #content>
        <div class="card-inner">
          <VIcon :icon="phone" class="primary-gradient" />

          <div class="text-center">
            <div class="font-24-l">
              {{ t('auth.enterPhone') }}
            </div>
            <div class="note font-14-l">
              {{ t('auth.smsSend') }}
            </div>
          </div>

          <div class="phone-input">
            <div class="font-18-l">
              +998
            </div>
            <VInputMask
              v-model="phoneNumber"
              mask="## ### ## ##"
              placeholder="## ### ## ##"
              unmask
              :disabled="loading"
              :pt="{ root: { inputmode: 'numeric' } }"
            />
          </div>

          <Button
            :label="t('auth.enter')"
            :loading="loading"
            :icon="forwardArrow"
            fluid
            icon-pos="right"
            @click="getCustomerInfo"
          />
        </div>
      </template>
    </Card>
    <template #bottom>
      <div class="note font-14-l">
        Продолжая, вы соглашаетесь с политикой конфиденциальности
      </div>
    </template>
  </PageWrapper>
</template>

<style scoped lang="scss">
.phone-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.title {
  font: var(--font-36-r);
  color: var(--primary-500);
  margin-bottom: .8rem;
  text-align: center;
}
.card {
  width: 100%;
  max-width: 40rem;
  .card-inner {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    align-items: center;
  }
}
.note {
  text-align: center;
  color: var(--secondary-900);
  font: var(--font-16-l);
  padding: .8rem 0;
}
</style>
