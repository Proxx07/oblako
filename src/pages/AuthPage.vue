<script setup lang="ts">
import { Button, Card } from 'primevue';
import { useI18n } from 'vue-i18n';
import { forwardArrow, phone } from '@/assets/icons';
import VPhoneInput from '@/components/Form/VPhoneInput.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import { useAuth } from '@/composables/useAuth';

const { t } = useI18n();
const { loading, phoneNumber, getCustomerInfo } = useAuth();
</script>

<template>
  <PageWrapper :bottom-padding="false">
    <template #top>
      <div class="title">
        OBLACKO
      </div>
    </template>
    <div class="content">
      <div>
        <div class="main-note font-24-b">
          {{ t('auth.enterPhone') }}
        </div>
        <div class="note font-14-l">
          {{ t('auth.smsSend') }}
        </div>
      </div>
      <VPhoneInput v-model="phoneNumber" :disabled="loading" style="margin-top: 2rem;" />
    </div>

    <template #bottom>
      <div class="bottom">
        <div class="bottom-note font-14-l text-center">
          Продолжая, вы соглашаетесь с
        </div>
        <div style="text-align: center;" class="font-14-l">
          <a style="color: var(--primary-500);" @click="$router.push('/privacy-policy')">Политикой конфиденциальности</a>
        </div>
        <Button
          :label="t('auth.enter')"
          :loading="loading"
          :icon="forwardArrow"
          fluid
          icon-pos="right"
          style="margin-top: 25px;"
          @click="getCustomerInfo"
        />
      </div>
    </template>
  </PageWrapper>
</template>

<style scoped lang="scss">
.content {
  padding: 0 2rem;
}
.phone-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.title {
  font: var(--font-20-l);
  color: white;
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

.main-note {
  line-height: 32px !important;
  width: 70%;
}

.note {
  color: var(--secondary-900);
  font: var(--font-16-l);
  padding: 2rem 0;
  line-height: 24px !important;
  width: 80%;
}

.bottom-note {
  color: var(--secondary-900);
  font: var(--font-16-l);
  padding: 1rem 0;
}

.bottom {
  margin-bottom: 2rem;
}
</style>
