<script setup>
import { ref } from 'vue'
const props = defineProps({
  problems: Array,
  instance: String
})

const emits = defineEmits(['updateCheckboxes'])

const selectedOption = ref([])

function updateBeautyIssues() {
  emits('updateCheckboxes', { instance: props.instance, values: selectedOption.value })
}
</script>

<template>
  <p class="mb-8 text-sm text-gray-500">Plusieurs choix sont possibles</p>
  <fieldset class="grid grid-cols-1 gap-4">
    <div
      class="relative flex items-center px-12 py-4 rounded-xl border border-gray-300"
      v-for="problem in props.problems"
      :key="problem.id"
      :value="problem.id"
    >
      <div class="min-w-0 flex-1 text-sm leading-6">
        <label for="problems" class="font-medium text-gray-900">{{ problem.name }}</label>
      </div>
      <div class="ml-3 flex h-6 items-center">
        <input
          :id="problem.id"
          :name="problem.name"
          :value="problem.id"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300"
          v-model="selectedOption"
          @change="updateBeautyIssues"
        />
      </div>
    </div>
  </fieldset>
</template>
