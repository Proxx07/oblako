<script setup lang="ts">
import type { IHistory } from '@/composables/useHistories/types';
import { Card } from 'primevue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

defineProps<{
  slides: IHistory[]
}>();
</script>

<template>
  <Carousel class="history-slider" :items-to-show="1" :wrap-around="true" :autoplay="6000">
    <Slide v-for="slide in slides" :key="slide.title">
      <Card class="w-full">
        <template #content>
          <div class="card-inner">
            <div style="font-size: 48px">
              {{ slide.emoji }}
            </div>
            <span />
            <div class="font-16-r" style="text-transform: uppercase">
              {{ slide.title }}
            </div>
            <div class="note-text">
              {{ slide.text }}
            </div>
          </div>
        </template>
      </Card>
    </Slide>
    <template #addons>
      <Pagination v-if="slides.length > 1" />
    </template>
  </Carousel>
</template>

<style scoped lang="scss">
.history-slider {
  :deep(.carousel__pagination) {
    position: static;
    transform: none;
    padding-top: 1.6rem;
  }
}
.card-inner {
  padding: .6rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
}
</style>
