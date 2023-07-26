<script setup>
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'
import { RouterLink } from 'vue-router'
import IconOilySkin from '@/components/icons/SkinTypes/IconOilySkin.vue'
import IconDrySkin from '@/components/icons/SkinTypes/IconDrySkin.vue'
import IconNormalSkin from '@/components/icons/SkinTypes/IconNormalSkin.vue'
import IconMixedSkin from '@/components/icons/SkinTypes/IconMixedSkin.vue'

const skinTypes = [
  {
    name: 'Peau sèche',
    description: "Texture rugueuse, manque d'hydratation et tendance à la desquamation.",
    icon: IconDrySkin
  },
  {
    name: 'Peau grasse',
    description: 'Production excessive de sébum, brillante, sujette aux imperfections.',
    icon: IconOilySkin
  },
  {
    name: 'Peau mixte',
    description:
      'Zone T grasse, joues sèches, nécessite un équilibre entre hydratation et contrôle de sébum.',
    icon: IconMixedSkin
  },
  {
    name: 'Peau normale',
    description: "Équilibrée, texture lisse, production régulée de sébum, peu d'imperfections.",
    icon: IconNormalSkin
  }
]

const selected = ref(skinTypes[0])
</script>

<template>
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Skin type</RadioGroupLabel>
    <div class="space-y-4">
      <RadioGroupOption
        as="template"
        v-for="skinType in skinTypes"
        :key="skinType.name"
        :value="skinType"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            active ? 'border-[#8CD4E0] ring-1 ring-[#8CD4E0]' : 'border-gray-300',
            'relative block cursor-pointer rounded-xl border bg-white px-4 py-2 shadow-sm focus:outline-none sm:flex sm:justify-between'
          ]"
        >
          <div class="flex">
            <component :is="skinType.icon" />
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
