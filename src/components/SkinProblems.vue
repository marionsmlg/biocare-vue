<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const problems = [
  'Acné',
  'Sensibilité cutanée',
  'Rougeurs',
  'Relâchement cutané',
  'Aucun problème particulier'
]

const hairProblems = [
  'Cheveux abîmés/fourchus/cassants',
  'Cheveux secs',
  'Cheveux gras',
  'Chute de cheveux',
  'Pellicules',
  'Aucun problème particulier'
]

const selected = ref(problems[0])
</script>

<template>
  <p class="mb-8 text-sm text-gray-500">Plusieurs choix sont possibles</p>
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Skin Problems</RadioGroupLabel>
    <div class="space-y-4 w-full lg:w-80">
      <RadioGroupOption
        as="template"
        v-for="problem in problems"
        :key="problem.name"
        :value="problem"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            active ? 'border-[#8CD4E0] ring-1 ring-[#8CD4E0]' : 'border-gray-300',
            'flex justify-center relative block cursor-pointer rounded-xl border bg-white px-6 py-4 shadow-sm focus:outline-none'
          ]"
        >
          <span class="flex items-center">
            <span class="flex flex-col text-sm">
              <RadioGroupLabel as="span" class="font-medium text-gray-900">{{
                problem
              }}</RadioGroupLabel>
            </span>
          </span>

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
