<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentStep: number
  stepsLength: number
}>();

const gridCount = computed(() => {
  return props.stepsLength - 1;
});

const stepIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
</script>

<template>
  <div class="steps">
    <div v-for="step in stepsLength" :key="step" class="step">
      <div class="item" :class="[step <= currentStep && 'active']" v-html="step < currentStep ? `${stepIcon}` : `${step}`" />
      <div v-if="step !== stepsLength" class="divider" :class="[step < currentStep && 'active']" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.steps {
  display: grid;
  grid-template-columns: repeat(v-bind(gridCount), 1fr) 3.2rem;
  align-items: center;
  gap: .8rem;
  width: 100%;
}
.step {
  display: flex;
  align-items: center;
  .divider {
    flex-grow: 1;
    height: .2rem;
    background: var(--form-field-bg);
    &.active {
      background: var(--primary-500);
    }
  }
  .item {
    background: var(--form-field-bg);
    color: var(--white);
    width: 3.2rem;
    height: 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-round);
    font: var(--font-14-l);
    &.active {
      background: var(--primary-500);
      color: var(--black);
    }
  }

}
</style>
