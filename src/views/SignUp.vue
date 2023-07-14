<script setup>
import IconChevronLeft from '../components/icons/IconChevronLeft.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="ml-4">
    <RouterLink to="/"><IconChevronLeft /></RouterLink>
  </div>
  <div class="md:px-36 flex justify-center">
    <div>
      <h1 class="text-xl font-bold">Je me m'inscris</h1>
      <p>ou je me connecte</p>
    </div>
  </div>
</template>
