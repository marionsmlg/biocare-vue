<script setup>
import { ref } from 'vue'
const props = defineProps({
  problems: Array,
  instance: String,
  initialSelectedOptions: Object
})

const emits = defineEmits(['updateCheckboxes'])

const selectedOption = ref(props.initialSelectedOptions)

const noHairProblemId = '77b4ae6d-a31f-4de5-a731-1249cd87eeff'
const noSkinProblemId = '1ddab218-5489-4891-8fbb-1c7061271dc8'

function updateSelectedOption() {
  if (selectedOption.value.includes(noHairProblemId)) {
    return (selectedOption.value = [noHairProblemId])
  } else if (selectedOption.value.includes(noSkinProblemId)) {
    return (selectedOption.value = [noSkinProblemId])
  }
}

function updateBeautyIssues() {
  updateSelectedOption()
  emits('updateCheckboxes', { instance: props.instance, values: selectedOption.value })
  console.log(Boolean(selectedOption.value))
  console.log(selectedOption.value)
}
</script>

<template>
  <p class="mb-8 text-sm text-gray-500">Plusieurs choix sont possibles</p>
  <fieldset class="grid grid-cols-1 gap-4">
    <div
      :class="[
        selectedOption.includes(problem.id)
          ? 'border-cyan-500 ring-1 ring-cyan-500'
          : 'border-gray-300',
        'relative flex items-center px-12 py-4 rounded-xl border'
      ]"
      v-for="problem in props.problems"
      :key="problem.id"
      :value="problem.id"
    >
      <div class="min-w-0 flex-1 text-sm leading-6">
        <label :for="problem.id" class="font-medium text-gray-900">{{ problem.name }}</label>
      </div>
      <div class="ml-3 flex h-6 items-center">
        <input
          :id="problem.id"
          :name="problem.name"
          :value="problem.id"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300"
          @change="updateBeautyIssues"
          v-model="selectedOption"
        />
      </div>
    </div>
  </fieldset>
</template>
