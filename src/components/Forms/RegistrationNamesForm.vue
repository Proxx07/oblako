<script setup lang="ts">
import { Button } from 'primevue';
import { useI18n } from 'vue-i18n';
import VForm from '@/components/Form/VForm.vue';
import VInputText from '@/components/Form/VInputText.vue';

defineProps<{
  name: string
  surName: string
}>();

const emit = defineEmits<{
  (e: 'submit-form'): void
}>();

const { t } = useI18n();

const nameModel = defineModel<string>('name', { default: '' });
const surNameModel = defineModel<string>('surName', { default: '' });
</script>

<template>
  <VForm @submit-form="emit('submit-form')">
    <div class="font-30-l">
      {{ t('auth.createAccount') }}
    </div>

    <div class="note-text" style="margin-bottom: 5rem;">
      {{ t('auth.setYourName') }}
    </div>

    <VInputText
      v-model="nameModel"
      :label="t('registration.name')"
      :placeholder="t('registration.namePlaceholder')"
      :rules="[$formRules.required()]"
    />

    <VInputText
      v-model="surNameModel"
      :label="t('registration.surName')"
      :placeholder="t('registration.surNamePlaceHolder')"
    />
    <Button type="submit" :label="t('continue')" />
  </VForm>
</template>
