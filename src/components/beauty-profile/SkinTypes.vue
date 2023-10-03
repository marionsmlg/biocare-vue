<script setup>
import { ref, markRaw } from 'vue'
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'
import { addIcon } from '../../utils'

async function fetchData() {
  try {
    const response = await fetch('https://biocare-api-production.up.railway.app/api/physical-trait')
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
fetchData()

const skinTypes = ref([])
const selectedSkinType = ref(skinTypes[0])
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
      >
        <div
          :class="[
            selectedSkinType === skinType.id
              ? 'border-[#8CD4E0] ring-1 ring-[#8CD4E0]'
              : 'border-gray-300',
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
              selectedSkinType === skinType.id ? 'border' : 'border-1',
              selectedSkinType === skinType.id ? 'border-[#8CD4E0]' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-lg'
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
