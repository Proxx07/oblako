<script setup lang="ts">
import type { MaskaDetail } from 'maska';
import type { InputTextProps } from 'primevue/inputtext';
import { vMaska } from 'maska/vue';
import { InputText } from 'primevue';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: string
  disabled?: boolean
  loading?: boolean
  inputProps?: Partial<InputTextProps>
}>(), { disabled: false, loading: false });

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const focused = ref(false);

const maska = {
  mask: '## ### ## ##',
  eager: true,
};

const onMask = (e: CustomEvent<MaskaDetail>) => {
  emit('update:modelValue', e.detail.unmasked);
};
</script>

<template>
  <div class="v-phone-input" :class="[{ 'is-focused': focused }]">
    <div class="prefix-wrap">
      <div class="prefix font-24-l">
        +998
      </div>
      <div class="baseline baseline--prefix" />
    </div>

    <div class="number-wrap">
      <InputText
        v-maska="maska"
        class="number"
        v-bind="inputProps"
        :disabled="disabled || loading"
        :pt="{ root: { inputmode: 'numeric' } }"
        :value="modelValue"
        @maska="onMask"
        @focus="focused = true"
        @blur="focused = false"
      />
      <div class="baseline baseline--number" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-phone-input {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
  min-height: 56px;

  .prefix-wrap, .number-wrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .prefix {
    color: var(--secondary-900);
  }

  .number {
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
    color: var(--white);
    font: var(--font-24-l) !important;
  }

  .baseline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 3px;
  }
  .baseline--prefix { background: var(--secondary-700); }
  .baseline--number { background: var(--primary-500); }
}

.v-phone-input :deep(.p-inputtext) {
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}
</style>
