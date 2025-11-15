<script setup lang="ts">
// import { Carousel, Pagination, Slide } from 'vue3-carousel';

// const open = (link: string) => {
//   window.open(link);
// };

// const slides = ['/oblaco-menu-1.jpg', '/oblaco-menu-2.jpg'];
</script>

<template>
  <div class="menu-container">
    <embed src="/menu.pdf" type="application/pdf" class="menu-pdf" />
  </div>

  <!-- <Carousel class="slider" :items-to-show="1" :wrap-around="true" :autoplay="6000">
      <Slide v-for="slide in slides" :key="slide">
        <img :src="slide" @click="open(slide)">
        <img :src="slide">
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel> -->
</template>

<style scoped lang="scss">
.menu-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.menu-pdf {
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>
