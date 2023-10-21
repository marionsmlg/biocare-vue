<script setup>
import { ref, markRaw } from 'vue'
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'
import { addIcon, apiUrl } from '@/utils.js'

const skinTypes = ref([])
const selectedSkinType = ref('')

async function fetchSkinTypes() {
  try {
    const queryString = `/api/v1/skin-types`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const data = await response.json()
    addIcon(data)
    skinTypes.value = data
  } catch (error) {
    console.error(error)
  }
}
fetchSkinTypes()
</script>

<template>
  <RadioGroup v-model="selectedSkinType">
    <RadioGroupLabel class="sr-only">Skin type</RadioGroupLabel>
    <div class="space-y-4">
      <RadioGroupOption
        as="template"
        v-for="skinType in skinTypes"
        :key="skinType.id"
        :value="skinType.id"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            checked ? 'border-cyan-500 ring-1 ring-cyan-500' : 'border-gray-300',
            'relative block cursor-pointer rounded-xl border bg-white px-4 py-2 shadow-sm focus:outline-none sm:flex sm:justify-between'
          ]"
        >
          <div class="flex items-center">
            <component :is="skinType.icon" class="w-16 h-16 md:w-20 md:h-20 min-w-max" />
            <span class="flex items-center ml-3">
              <span class="flex flex-col text-sm">
                <RadioGroupLabel as="span" class="font-medium text-gray-900">{{
                  skinType.name
                }}</RadioGroupLabel>
                <RadioGroupDescription as="span" class="text-gray-500">
                  <span class="block sm:inline">{{ skinType.description }}</span>
                </RadioGroupDescription>
              </span>
            </span>
          </div>

          <span
            :class="[
              active ? 'border' : 'border-transparent',
              checked ? 'border-cyan-500' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-xl'
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
