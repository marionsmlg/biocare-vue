<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import SkinTypes from '../components/beauty-profile/SkinTypes.vue'
import SkinHairProblems from '../components/beauty-profile/SkinHairProblems.vue'
import HairTypes from '../components/beauty-profile/HairTypes.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { ref, markRaw, shallowRef } from 'vue'
import { RouterLink } from 'vue-router'

const questions = [
  { text: 'Quel est votre type de peau ?', component: SkinTypes },
  { text: 'Avez-vous des problèmes de peau spécifiques ?', component: SkinProblems },
  { text: 'Quelle est votre texture de cheveux naturelle ?', component: HairTypes },
  { text: 'Avez-vous des problèmes capillaires spécifiques ?', component: SkinProblems }
]

const currentQuestionIndex = ref(0)

const nextQuestion = () => {
  currentQuestionIndex.value++
}
const previousQuestion = () => {
  currentQuestionIndex.value--
}
</script>

<template>
  <div class="py-12">
    <div class="ml-8 mb-4 mt-12 flex">
      <div v-show="currentQuestionIndex === 0"><Breadcrumbs /></div>

      <div class="text-gray-400 hover:text-gray-500 flex">
        <button v-show="currentQuestionIndex > 0" class="flex" @click="previousQuestion">
          <ChevronLeftIcon /><span class="ml-2">Précédent</span>
        </button>
      </div>
    </div>
    <!-- <div class="flex justify-center mb-20"><StepsQuiz /></div> -->
    <div class="xl:px-72 px-6">
      <div v-for="(question, index) in questions" :key="index">
        <div v-if="currentQuestionIndex === index" class="flex flex-col items-center">
          <h1 class="text-xl font-bold text-center mb-8">{{ question.text }}</h1>
          <component :is="question.component" />
        </div>
      </div>

      <div class="flex justify-center mt-10">
        <button
          @click="nextQuestion"
          v-show="currentQuestionIndex < questions.length - 1"
          type="button"
          class="rounded-xl bg-[#8CD4E0] px-24 py-3 text-md font-bold shadow-sm hover:bg-[#6ECDDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Suivant
        </button>
        <button
          v-show="currentQuestionIndex === questions.length - 1"
          type="button"
          class="rounded-xl bg-[#8CD4E0] px-24 py-3 text-md font-bold shadow-sm hover:bg-[#6ECDDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Trouver mes recettes !
        </button>
      </div>
    </div>
  </div>
</template>
