<script setup lang="ts">
import { Button, Card } from 'primevue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { backArrow, forwardArrow, user, users } from '@/assets/icons';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import VInputText from '@/components/Form/VInputText.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useRegistration } from '@/composables/useRegistration';
import { sexOptions } from '@/composables/useRegistration/models';

const { t } = useI18n();
const { loading, fullName, birthDate, sex, email, phone, createCustomer } = useRegistration();
const $router = useRouter();
</script>

<template>
  <PageWrapper>
    <template #top>
      <div class="page-header">
        <Button
          severity="secondary"
          :icon="backArrow"
          class="back-button"
          @click="$router.push({ name: 'auth' })"
        />
        <div class="details">
          <div class="font-24-r">
            {{ t('registration.title') }}
          </div>
          <div class="font-14-l" style="color: var(--secondary-900);">
            {{ t('registration.description') }}
          </div>
        </div>
      </div>
    </template>
    <Card class="card">
      <template #content>
        <div class="card-inner">
          <VIcon :icon="user" class="primary-gradient" />

          <VForm class="form-wrapper" @submit-form="createCustomer">
            <VInputText
              v-model="fullName"
              :label="t('registration.fio')"
              :placeholder="t('registration.fioPlaceHolder')"
              :rules="[$formRules.fullName()]"
            />

            <VInputMask
              v-model="birthDate"
              :label="t('registration.birthDate')"
              :loading="loading"
              mask="##/##/####"
              placeholder="__-__-____"
              :pt="{ root: { inputmode: 'numeric' } }"
              :rules="[$formRules.required(), $formRules.birthDate()]"
            />

            <div class="sex-wrapper">
              <div class="font-14-r colspan-2 text-left" style="color: var(--secondary-900)">
                {{ t('registration.sex') }}
              </div>
              <Button
                v-for="item in sexOptions"
                :key="item.value"
                :severity="sex === item.value ? 'primary' : 'secondary'"
                :icon="users"
                :label="t(`registration.${item.name}`)"
                fluid
                outlined
                @click.prevent="sex = item.value"
              />
            </div>

            <VInputText
              v-model="email"
              :label="t('registration.email')"
              placeholder="example@email.com"
              :rules="[$formRules.email()]"
            />

            <VInputMask
              v-model="phone"
              mask="+### ## ### ## ##"
              :label="t('registration.phoneNumber')"
              disabled
              readonly
            />

            <Button
              type="submit"
              :label="t('registration.createAccount')"
              :icon="forwardArrow"
              :loading="loading"
              fluid
              icon-pos="right"
            />
          </VForm>
        </div>
      </template>
    </Card>
  </PageWrapper>
</template>

<style scoped lang="scss">
.page-header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  gap: 1.6rem;
  .back-button {
    background: rgba(255, 255, 255, 0.1) !important;
    color: var(--white) !important;
    border-color: var(--secondary-800) !important;
    padding: .5rem;
    width: 3.8rem;
    height: 3.8rem;
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: .4rem;
    color: var(--primary-500);
  }
}

.card {
  width: 100%;
  max-width: 40rem;
  .card-inner {
    padding: 1rem;
    text-align: center;
  }
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  padding-top: 2.4rem;
}

.sex-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}
</style>
