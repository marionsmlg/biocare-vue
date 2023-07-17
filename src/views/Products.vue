<!-- <template>
  <div>
    <h1>Liste des produits :</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([])

async function fetchData() {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    products.value = data.products
  } catch (error) {
    console.error(error)
  }
}
fetchData()
</script> -->

<template>
  <div>
    <div
      v-for="(question, index) in quiz.questions"
      :key="index"
      v-show="currentQuestionIndex === index"
    >
      <h3>{{ question.text }}</h3>
      <ul>
        <li v-for="(option, optionIndex) in question.options" :key="optionIndex">
          <label>
            <input type="radio" :value="optionIndex" v-model="selectedAnswers[index]" />
            {{ option }}
          </label>
        </li>
      </ul>
    </div>
    <button @click="nextQuestion" v-show="currentQuestionIndex < quiz.questions.length - 1">
      Suivant
    </button>
    <button v-show="currentQuestionIndex === quiz.questions.length - 1">
      Trouver mes recettes !
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const quiz = {
  questions: [
    {
      text: 'Question 1',
      options: ['Option 1', 'Option 2', 'Option 3'],
      correctAnswerIndex: 0
    },
    {
      text: 'Question 2',
      options: ['Option A', 'Option B', 'Option C'],
      correctAnswerIndex: 1
    },
    {
      text: 'Question 3',
      options: ['Option A', 'Option B', 'Option C'],
      correctAnswerIndex: 1
    },
    {
      text: 'Question 4',
      options: ['Option A', 'Option B', 'Option C'],
      correctAnswerIndex: 1
    },
    {
      text: 'Question 5',
      options: ['Option A', 'Option B', 'Option C'],
      correctAnswerIndex: 1
    }
    // Ajoutez plus de questions au besoin
  ]
}

const selectedAnswers = ref([])
const currentQuestionIndex = ref(0)

const nextQuestion = () => {
  currentQuestionIndex.value++
}
</script>

<style>
/* Ajoutez vos styles personnalisés ici */
</style>
