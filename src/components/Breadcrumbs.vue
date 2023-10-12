<script setup>
import { ref, computed } from 'vue'
import { ChevronRightIcon, HomeIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'
import { RouterLink, useRouter } from 'vue-router'

const props = defineProps({
  pages: Array
})

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="px-8 pb-4 flex pt-12">
    <nav class="hidden lg:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-4">
        <li>
          <div>
            <RouterLink to="/" class="text-gray-400 hover:text-gray-500">
              <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span class="sr-only">Home</span>
            </RouterLink>
          </div>
        </li>
        <li v-for="page in props.pages" :key="page.name">
          <div class="flex items-center">
            <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <RouterLink
              :to="page.href"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              :aria-current="page.current ? 'page' : undefined"
              >{{ page.name }}</RouterLink
            >
          </div>
        </li>
      </ol>
    </nav>
    <div class="lg:hidden flex">
      <button @click="goBack" class="text-gray-400 hover:text-gray-500">
        <ChevronLeftIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
        <span class="sr-only">Back</span>
      </button>
    </div>
  </div>
</template>
