<script setup lang="ts">
import type { AuthSteps } from '@/composables/useAuth/models';
import { ref } from 'vue';
import AgeConfirm from '@/components/AgeConfirm.vue';
import PhoneNumberForm from '@/components/PhoneNumberForm.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import { useAuth } from '@/composables/useAuth';

const { loading, phoneNumber, getCustomerInfo } = useAuth();

const authStep = ref<AuthSteps>('age');
const setStep = (step: AuthSteps) => {
  authStep.value = step;
};
</script>

<template>
  <PageWrapper>
    <template #top>
      <div v-if="authStep !== 'age'" class="font-20-l">
        OBLACKO
      </div>
    </template>
    <AgeConfirm
      v-if="authStep === 'age'"
      @change-step="setStep"
    />
    <PhoneNumberForm
      v-if="authStep === 'phone'"
      v-model="phoneNumber"
      :loading="loading"
      @form-submit="getCustomerInfo"
    />
  </PageWrapper>
</template>

<style scoped lang="scss"></style>
