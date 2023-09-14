<!-- <script setup>
import { ref } from 'vue'

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/beauty-issue')
    const data = await response.json()
    const skin = data.filter(
      (id) => id.recipe_category_id === '6c250d76-bfad-4968-a334-52e06119c591'
    )
    const hair = data.filter(
      (id) => id.recipe_category_id === '157bb376-f516-4cfe-9ce8-baa56f5dba89'
    )
    skinProblems.value = skin
    hairProblems.value = hair
  } catch (error) {
    console.error(error)
  }
}

fetchData()

const skinProblems = ref([])

const hairProblems = ref([])
</script>

<template>
  <div>
    <h1>{{ skinProblems }}</h1>
  </div>
  <div>
    <h1>{{ hairProblems }}</h1>
  </div>
</template> -->
<template>
  <div>
    <h1>LocalStorage Example</h1>
    <input v-model="message" placeholder="Enter a message" />
    <button @click="saveMessage">Save Message</button>
    <p>Saved Message: {{ savedMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Utilisez ref pour créer des réactifs
const message = ref('')
const savedMessage = ref(localStorage.getItem('message') || '')

// Fonction pour sauvegarder le message dans localStorage
const saveMessage = () => {
  localStorage.setItem('message', message.value)
  savedMessage.value = message.value
}
</script>
