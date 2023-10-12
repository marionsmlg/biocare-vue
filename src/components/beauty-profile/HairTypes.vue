<script setup>
import { ref, markRaw } from 'vue'
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'

import { addIcon, apiUrl } from '@/utils.js'

async function fetchHairTypes() {
  try {
    const queryString = `/api/physical-trait`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const data = await response.json()
    const hairData = data.filter(
      (id) => id.recipe_category_id === '157bb376-f516-4cfe-9ce8-baa56f5dba89'
    )
    const filteredData = hairData.filter((obj) => obj.name !== 'Tous types')
    addIcon(hairData)
    hairTypes.value = filteredData
  } catch (error) {
    console.error(error)
  }
}
fetchHairTypes()
const hairTypes = ref([])

const selectedHairType = ref('')
</script>

<template>
  <RadioGroup v-model="selectedHairType">
    <RadioGroupLabel class="sr-only">Hair Types</RadioGroupLabel>
    <div class="w-full grid grid-cols-2 gap-3 justify-center">
      <RadioGroupOption
        as="template"
        v-for="hairType in hairTypes"
        :key="hairType.id"
        :value="hairType.id"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            checked ? 'border-[#8CD4E0] ring-1 ring-[#8CD4E0]' : 'border-gray-300',
            'relative block cursor-pointer rounded-xl border bg-white px-6 py-4 shadow-sm focus:outline-none w-40 md:w-56'
          ]"
        >
          <div class="flex flex-col items-center">
            <component :is="hairType.icon" class="w-20 h-20" />

            <span class="text-sm">
              <RadioGroupLabel as="span" class="font-medium text-gray-900">{{
                hairType.name
              }}</RadioGroupLabel>
            </span>
          </div>

          <span
            :class="[
              active ? 'border' : 'border-1',
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
