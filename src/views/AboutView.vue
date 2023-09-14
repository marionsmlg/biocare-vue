<template>
  <div>
    <div v-for="(item, index) in checkboxItems" :key="index">
      <input
        type="checkbox"
        :id="'checkbox' + index"
        v-model="selectedCheckboxes[index]"
        @change="updateParent"
      />
      <label :for="'checkbox' + index">{{ item }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  checkboxItems: Array // Liste des valeurs des cases à cocher
})

const emits = defineEmits(['updateCheckboxes'])

const selectedCheckboxes = ref([])

const updateParent = () => {
  emits('updateCheckboxes', selectedCheckboxes.value)
}
</script>
