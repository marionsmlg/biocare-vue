<script setup>
import { ref } from 'vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/20/solid'

import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'

const props = defineProps({
  options: Array,
  placeholder: {
    type: String,
    default: 'Select options'
  },
  instance: String,
  isDisabled: Boolean
})

const selectedOption = ref('')

const emits = defineEmits(['update:model-value'])

const updateSelectedOption = () => {
  emits('update:model-value', selectedOption.value)
}
</script>

<template>
  <div class="w-full">
    <Listbox v-model="selectedOption" @update:model-value="updateSelectedOption">
      <div class="relative mt-1">
        <ListboxButton
          :disabled="props.isDisabled"
          :class="[
            isDisabled ? 'cursor-not-allowed' : 'hover:border-[#F3B8B4]',
            selectedOption ? 'border-[#F3B8B4]' : '',
            'md:px-14 md:py-3 w-full rounded-xl bg-white px-3 py-2 text-md font-semibold shadow-sm border-2'
          ]"
        >
          <span class="block truncate" v-if="selectedOption">{{ selectedOption.name }}</span>
          <span v-else :class="[isDisabled ? 'text-gray-400' : 'text-gray-500']">{{
            props.placeholder
          }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in props.options"
              :key="option.id"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-[#FBDFDB] ' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                  option.name
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#F19B95]"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
