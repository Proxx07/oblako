<script setup lang="ts">
const menuPdfPath = '/menu.pdf#zoom=175';
</script>

<template>
  <div style="height: 100%;">
    <object
      :data="menuPdfPath"
      type="application/pdf"
      width="100%"
      height="100%"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
