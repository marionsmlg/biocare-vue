<template>
  <div>
    <h1>My Quiz</h1>
    <div v-if="!showResults">
      <div
        v-for="(question, index) in questions"
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
      <button @click="previousQuestion" v-show="currentQuestionIndex > 0">Précédent</button>
      <button @click="nextQuestion" v-show="currentQuestionIndex < questions.length - 1">
        Suivant
      </button>
      <button @click="submitQuiz" v-show="currentQuestionIndex === questions.length - 1">
        Submit
      </button>
    </div>
    <div v-else>
      <h2>Results</h2>
      <ul>
        <li v-for="(question, index) in questions" :key="index">
          {{ question.text }} - Your answer: {{ question.options[selectedAnswers[index]] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const questions = [
  {
    text: 'Question 1',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correctAnswerIndex: 0
  },
  {
    text: 'Question 2',
    options: ['Option A', 'Option B', 'Option C']
  }
]

const selectedAnswers = ref([])
const currentQuestionIndex = ref(0)
const showResults = ref(false)

const nextQuestion = () => {
  currentQuestionIndex.value++
}

const previousQuestion = () => {
  currentQuestionIndex.value--
}

const submitQuiz = () => {
  showResults.value = true
}
</script>

<style>
/* Ajoutez vos styles personnalisés ici */
</style>
