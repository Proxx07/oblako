<script setup lang="ts">
import AgeConfirm from '@/components/AgeConfirm.vue';
import OtpForm from '@/components/OtpForm.vue';
import PhoneNumberForm from '@/components/PhoneNumberForm.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import { useAuth } from '@/composables/useAuth';

const {
  code, loading, phoneNumber, time, otpError, verifyOtp,
  isTimerActive, authStep, setStep, getCustomerInfo,
} = useAuth();
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

    <OtpForm
      v-if="authStep === 'code'"
      v-model="code"
      :timer="time"
      :loading="loading"
      :is-timer-active="isTimerActive"
      :invalid="otpError"
      @submit-form="verifyOtp"
      @resend-otp="getCustomerInfo"
    />
  </PageWrapper>
</template>

<style scoped lang="scss"></style>
