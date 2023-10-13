<script setup>
import { ref, computed } from 'vue'
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="flex">
    <button @click="goBack" class="text-gray-400 hover:text-gray-500">
      <ChevronLeftIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
      <span class="sr-only">Back</span>
    </button>
  </div>
</template>
