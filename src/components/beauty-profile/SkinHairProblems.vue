<script setup>
import { ref, watch } from 'vue'
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
  // Vérifier si noHairProblemId ou noSkinProblemId sont cochés
  const hairChecked = selectedOption.value.includes(noHairProblemId)
  const skinChecked = selectedOption.value.includes(noSkinProblemId)

  // Si l'une des cases est cochée et d'autres éléments sont cochés, décochez les autres
  if ((hairChecked || skinChecked) && selectedOption.value.length > 1) {
    selectedOption.value = [hairChecked ? noHairProblemId : noSkinProblemId]
  }
}

function updateBeautyIssues() {
  updateSelectedOption()

  emits('updateCheckboxes', { instance: props.instance, values: selectedOption.value })
}
</script>

<template>
  <p class="mb-8 text-sm text-gray-500">Plusieurs choix sont possibles</p>
  <fieldset class="grid grid-cols-1 gap-4">
    <label
      :class="[
        selectedOption.includes(problem.id)
          ? 'border-cyan-500 ring-1 ring-cyan-500'
          : 'border-gray-300',
        'relative flex items-center justify-center text-center px-12 py-4 rounded-xl border'
      ]"
      v-for="problem in props.problems"
      :key="problem.id"
      :value="problem.id"
      :for="problem.id"
    >
      <input
        :id="problem.id"
        :name="problem.name"
        :value="problem.id"
        type="checkbox"
        class="hidden"
        @change="updateBeautyIssues"
        v-model="selectedOption"
      />
      <span class="font-medium text-gray-900 text-sm">{{ problem.name }}</span>
    </label>
  </fieldset>
</template>
