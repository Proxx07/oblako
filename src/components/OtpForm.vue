<script setup lang="ts">
import { Button, InputOtp } from 'primevue';
import { nextTick } from 'vue';

const props = defineProps<{
  modelValue: string
  timer: string
  invalid: boolean
  loading: boolean
  isTimerActive: boolean
}>();

const emit = defineEmits<{
  (e: 'resend-otp'): void
  (e: 'submit-form'): void
}>();

const inputFieldConfigs = {
  pcinputtext: {
    root: {
      inputmode: 'numeric',
      type: 'number',
    },
  },
};

const otp = defineModel<string>('modelValue');

const resend = () => {
  if (props.isTimerActive || props.loading) return;
  emit('resend-otp');
};

const inputValueChangeHandle = () => {
  nextTick(() => {
    if (props.modelValue.length === 4) {
      emit('submit-form');
    }
  });
};
</script>

<template>
  <div class="form-wrapper text-center">
    <div class="font-30-l">
      Введите код из смс
    </div>
    <div class="note-text">
      Пожалуйста, введите код подтверждения, который мы только что отправили на ваш номер телефона
    </div>

    <InputOtp
      v-model="otp"
      class="otp"
      :pt="inputFieldConfigs"
      :disabled="loading"
      :invalid="invalid"
      @update:model-value="inputValueChangeHandle"
    />

    <Button severity="secondary" text @click="resend">
      Отправить код повторно {{ isTimerActive ? timer : '' }}
    </Button>
  </div>
</template>

<style scoped lang="scss">
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  .otp {
    --p-inputotp-gap: 1.6rem;
    :deep(.p-inputtext) {

      border-top: 0;
      border-right: 0;
      border-left: 0;
      border-radius: 0;
      outline: none !important;
      box-shadow: none !important;
      border-width: 2px;

      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
}
</style>
