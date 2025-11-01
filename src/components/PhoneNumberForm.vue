<script setup lang="ts">
import { Button } from 'primevue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';

defineProps<{
  modelValue: string
  loading: boolean
}>();

const emit = defineEmits<{
  (e: 'form-submit'): void
}>();

const { t } = useI18n();
const phone = defineModel<string>('modelValue');
const privacyDialog = ref(false);
</script>

<template>
  <VForm class="form" @submit-form="emit('form-submit')">
    <div class="font-24-b">
      {{ t('auth.enterPhone') }}
    </div>
    <div class="note-text">
      Войдите, чтобы получить доступ к программе лояльности. Мы вышлем одноразовый пароль для проверки.
    </div>
    <div class="phone-number">
      <div class="p-inputtext font-24-l static">
        +998
      </div>
      <VInputMask
        v-if="phone !== undefined"
        v-model="phone"
        placeholder="00 000 00 00"
        mask="## ### ## ##"
        size="large"
        unmask
        :rules="[$formRules.required()]"
      />
    </div>

    <div class="note-text text-center">
      Регистрируясь, вы соглашаетесь с
      <div class="link-text" @click="privacyDialog = true">
        политикой конфиденциальности
      </div>
    </div>

    <Button type="submit" :label="t('continue')" :loading="loading" fluid />
    <PrivacyPolicy v-model="privacyDialog" @close="privacyDialog = false" />
  </VForm>
</template>

<style scoped lang="scss">
.form {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-self: stretch;
}
.link-text {
  color: var(--primary-500);
  text-decoration: underline;
  cursor: pointer;
}
.phone-number {
  margin-bottom: auto;
  padding-top: 2.4rem;
  display: flex;
  gap: 1.6rem;
  .static {
    display: flex;
    align-items: center;
  }
  :deep(.p-inputtext) {
    background: transparent;
    border-radius: 0;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    outline: none !important;
    box-shadow: none !important;
  }
}
</style>
