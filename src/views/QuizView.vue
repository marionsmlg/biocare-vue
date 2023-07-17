<script setup>
import IconChevronLeft from '../components/icons/IconChevronLeft.vue'
import StepsQuiz from '../components/StepsQuiz.vue'
import SkinTypes from '../components/SkinTypes.vue'
import SkinProblems from '../components/SkinProblems.vue'
import HairTypes from '../components/HairTypes.vue'
import { RouterLink } from 'vue-router'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { ref } from 'vue'

const quiz = {
  questions: [
    { text: 'Quel est votre type de peau ?', component: SkinTypes },
    { text: 'Avez-vous des problèmes de peau spécifiques ?', component: SkinProblems },
    { text: 'Quelle est votre texture de cheveux naturelle ?', component: HairTypes },
    { text: 'Avez-vous des problèmes capillaires spécifiques ?', component: SkinProblems }
  ]
}

const currentQuestionIndex = ref(0)

const nextQuestion = () => {
  currentQuestionIndex.value++
}
const previousQuestion = () => {
  currentQuestionIndex.value--
}
</script>

<template>
  <div class="ml-8 mb-4 flex">
    <div v-show="currentQuestionIndex === 0"><Breadcrumbs /></div>

    <div class="text-gray-400 hover:text-gray-500 flex">
      <button @click="previousQuestion" v-show="currentQuestionIndex > 0" class="flex">
        <IconChevronLeft /><span class="ml-2">Précédent</span>
      </button>
    </div>
  </div>
  <!-- <div class="flex justify-center mb-20"><StepsQuiz /></div> -->
  <div class="xl:px-72 px-10 flex flex-col justify-center items-center">
    <div
      v-for="(question, index) in quiz.questions"
      :key="index"
      v-show="currentQuestionIndex === index"
      class="flex flex-col items-center"
    >
      <h1 class="text-xl font-bold text-center mb-4">{{ question.text }}</h1>
      <component :is="question.component" />
    </div>
    <div class="flex justify-center mt-10">
      <button
        @click="nextQuestion"
        v-show="currentQuestionIndex < quiz.questions.length - 1"
        type="button"
        class="rounded-xl bg-[#8CD4E0] px-24 py-3 text-md font-bold shadow-sm hover:bg-[#6ECDDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Suivant
      </button>
      <button
        v-show="currentQuestionIndex === quiz.questions.length - 1"
        type="button"
        class="rounded-xl bg-[#8CD4E0] px-24 py-3 text-md font-bold shadow-sm hover:bg-[#6ECDDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Trouver mes recettes !
      </button>
    </div>
  </div>
</template>
