<script setup lang="ts">
import { Button } from 'primevue';
import { useI18n } from 'vue-i18n';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import VInputText from '@/components/Form/VInputText.vue';
import { sexOptions } from '@/composables/useRegistration/models';

defineProps<{
  birthDate: string
  sex: number
  email: string
}>();

const emit = defineEmits<{
  (e: 'submit-form'): void
}>();

const { t } = useI18n();

const birthDateModel = defineModel<string>('birthDate', { default: '' });
const sexModel = defineModel<number>('sex', { default: 0 });
const emailModel = defineModel<string>('email', { default: '' });
</script>

<template>
  <VForm @submit-form="emit('submit-form')">
    <div class="font-30-l">
      {{ t('auth.setRegInfo') }}
    </div>

    <div class="note-text" style="margin-bottom: 4rem;">
      {{ t('auth.fillRequiredInfo') }}
    </div>
    <VInputText
      v-model="emailModel"
      :label="t('registration.email')"
      placeholder="example@email.com"
    />
    <VInputMask
      v-model="birthDateModel"
      :label="t('registration.birthDate')"
      mask="##/##/####"
      placeholder="__-__-____"
      :pt="{ root: { inputmode: 'numeric' } }"
      :rules="[$formRules.required(), $formRules.birthDate()]"
    />

    <div class="sex-wrapper">
      <div class="font-14-r colspan-2 text-left" style="color: var(&#45;&#45;secondary-900)">
        {{ t('registration.sex') }}
      </div>
      <Button
        v-for="item in sexOptions"
        :key="item.value"
        :severity="sexModel === item.value ? 'primary' : 'secondary'"
        :label="t(`registration.${item.name}`)"
        fluid
        outlined
        @click.prevent="sexModel = item.value"
      />
    </div>

    <Button type="submit" :label="t('continue')" />
  </VForm>
</template>

<style lang="scss" scoped>
.sex-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}
</style>
