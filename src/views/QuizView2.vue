<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import SkinTypes from '../components/beauty-profile/SkinTypes.vue'
import SkinHairProblems from '../components/beauty-profile/SkinHairProblems.vue'
import HairTypes from '../components/beauty-profile/HairTypes.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const skinProblems = ref([])
const hairProblems = ref([])

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/beauty-issue')
    const data = await response.json()
    const skinData = data.filter(
      (id) => id.recipe_category_id === '6c250d76-bfad-4968-a334-52e06119c591'
    )
    const hairData = data.filter(
      (id) => id.recipe_category_id === '157bb376-f516-4cfe-9ce8-baa56f5dba89'
    )
    skinProblems.value = skinData
    hairProblems.value = hairData
  } catch (error) {
    console.error(error)
  }
}

fetchData()

const quizData = [
  { text: 'Quel est votre type de peau ?', component: SkinTypes, instance: 'skinType' },
  {
    text: 'Avez-vous des problèmes de peau spécifiques ?',
    component: SkinHairProblems,
    instance: 'skinProblems'
  },
  {
    text: 'Quelle est votre texture de cheveux naturelle ?',
    component: HairTypes,
    instance: 'hairType'
  },
  {
    text: 'Avez-vous des problèmes capillaires spécifiques ?',
    component: SkinHairProblems,
    instance: 'hairProblems'
  }
]

const selectedOption = ref({})
const selectedSkinProblem = ref([])
const selectedHairProblem = ref([])

const allQuestionsAnswered = ref(false)

function checkAllQuestionsAnswered() {
  if (selectedHairProblem.value) {
    allQuestionsAnswered.value = true
  }
}

function updateCheckboxes({ instance, values }) {
  if (instance === 'skinProblems') {
    selectedSkinProblem.value = values
  } else if (instance === 'hairProblems') {
    selectedHairProblem.value = values
  }
  checkAllQuestionsAnswered()
}

const router = useRouter()

function findRecipes() {
  localStorage.setItem('skinType', selectedOption.value['skinType'])
  localStorage.setItem('hairType', selectedOption.value['hairType'])
  localStorage.setItem('skinProblem', JSON.stringify(selectedSkinProblem.value))
  localStorage.setItem('hairProblem', JSON.stringify(selectedHairProblem.value))
  router.push('/personal-space')
}
</script>

<template>
  <!-- <div>Skintype : {{ selectedOption }}</div>
  <div>HairProblems :{{ selectedHairProblem }}</div>
  <div>SkinProblems :{{ selectedSkinProblem }}</div> -->
  <div class="py-12">
    <div v-for="(question, index) in quizData" :key="index" class="xl:px-72 px-6 py-16">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold text-center mb-8">{{ question.text }}</h1>
        <component
          v-if="question.instance === 'skinProblems' || question.instance === 'hairProblems'"
          :problems="
            question.instance === 'skinProblems'
              ? skinProblems
              : question.instance === 'hairProblems'
              ? hairProblems
              : ''
          "
          :is="question.component"
          :instance="question.instance"
          @updateCheckboxes="updateCheckboxes"
        />
        <component
          v-else
          :is="question.component"
          :instance="question.instance"
          v-model="selectedOption[question.instance]"
        />
      </div>
    </div>
    <div class="flex justify-center" v-if="allQuestionsAnswered">
      <button
        type="submit"
        class="rounded-xl bg-[#8CD4E0] px-24 py-3 text-md font-bold shadow-sm hover:bg-[#6ECDDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="findRecipes"
      >
        Trouver mes recettes !
      </button>
    </div>
  </div>
</template>
