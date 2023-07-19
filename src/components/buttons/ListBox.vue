<template>
  <div class="w-72">
    <Listbox v-model="selectedPerson">
      <div class="relative mt-1">
        <ListboxButton
          class="md:px-14 md:py-3 w-full rounded-xl bg-white px-3 py-2 text-md font-semibold shadow-sm border-2 hover:border-[#F3B8B4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:"
        >
          <span class="block truncate">{{ selectedPerson.name }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in people"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-[#FBDFDB] text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                  person.name
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'

const people = [{ name: 'Partie du corps' }, { name: 'Peau' }, { name: 'Cheveux' }]
const selectedPerson = ref(people[0])
</script>
