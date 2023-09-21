<template>
  <div>
    <label v-for="(item, index) in items" :key="index">
      <input
        type="checkbox"
        :value="item"
        :checked="item === selectedItem"
        @change="updateSelectedItem(items)"
      />
      {{ item }}
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref(['Option 1', 'Option 2', 'Option 3'])
const selectedItem = ref(null)

const updateSelectedItem = (value) => {
  if (value === 'Option 3' && selectedItem.value !== 'Option 3') {
    // Si Option 3 est sélectionnée et n'était pas déjà sélectionnée,
    // sélectionnez uniquement Option 3
    selectedItem.value = 'Option 3'
  } else if (value !== 'Option 3' && selectedItem.value === 'Option 3') {
    // Si une autre option est sélectionnée alors que Option 3 était sélectionnée,
    // décochez Option 3
    selectedItem.value = null
  }
}
</script>
