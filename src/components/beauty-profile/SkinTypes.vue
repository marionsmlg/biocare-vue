<script setup>
import { ref, markRaw } from 'vue'
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'
import { addIcon, apiUrl } from '@/utils.js'

async function fetchPhysicalTraits() {
  try {
    const queryString = `/api/physical-trait`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const data = await response.json()
    const types = data.filter(
      (id) => id.recipe_category_id === '6c250d76-bfad-4968-a334-52e06119c591'
    )
    addIcon(types)
    skinTypes.value = types
  } catch (error) {
    console.error(error)
  }
}
fetchPhysicalTraits()

const skinTypes = ref([])
const selectedSkinType = ref('')
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
            checked ? 'border-[#8CD4E0] ring-1 ring-[#8CD4E0]' : 'border-gray-300',
            'relative block cursor-pointer rounded-xl border bg-white px-4 py-2 shadow-sm focus:outline-none sm:flex sm:justify-between'
          ]"
        >
          <div class="flex">
            <component :is="skinType.icon" class="w-20 h-20" />
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
              checked ? 'border-[#8CD4E0]' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-lg'
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
