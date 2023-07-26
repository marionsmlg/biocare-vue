<script setup>
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'
import IconSmoothHair from '@/components/icons/HairTypes/IconSmoothHair.vue'
import IconFrizzyHair from '@/components/icons/HairTypes/IconFrizzyHair.vue'
import IconWavyHair from '@/components/icons/HairTypes/IconWavyHair.vue'
import IconCurlyHair from '@/components/icons/HairTypes/IconCurlyHair.vue'

const hairTypes = [
  { name: 'Lisse', icon: IconSmoothHair },
  { name: 'Ondulée', icon: IconWavyHair },
  { name: 'Bouclée', icon: IconCurlyHair },
  { name: 'Frisée / Crépus', icon: IconFrizzyHair }
]

const selected = ref(hairTypes[0])
</script>

<template>
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Skin Problems</RadioGroupLabel>
    <div class="w-full flex flex-wrap justify-center">
      <RadioGroupOption
        as="template"
        v-for="hairType in hairTypes"
        :key="hairType.name"
        :value="hairType.name"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            active ? 'border-[#8CD4E0] ring-1 ring-[#8CD4E0]' : 'border-gray-300',
            'relative block cursor-pointer rounded-xl border bg-white px-6 py-4 shadow-sm focus:outline-none w-40 md:w-56 mx-2 my-2'
          ]"
        >
          <div class="flex flex-col items-center">
            <component :is="hairType.icon" />

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
