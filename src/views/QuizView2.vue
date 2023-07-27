<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import SkinTypes from '../components/beauty-profile/SkinTypes.vue'
import SkinHairProblems from '../components/beauty-profile/SkinHairProblems.vue'
import HairTypes from '../components/beauty-profile/HairTypes.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const skinProblems = ['Acné', 'Sensibilité cutanée', 'Rougeurs', 'Relâchement cutané']

const hairProblems = [
  'Cheveux abîmés/fourchus/cassants',
  'Cheveux secs',
  'Cheveux gras',
  'Chute de cheveux',
  'Pellicules'
]

const questions = [
  { text: 'Quel est votre type de peau ?', component: SkinTypes, data: '' },
  {
    text: 'Avez-vous des problèmes de peau spécifiques ?',
    component: SkinHairProblems,
    data: skinProblems
  },
  { text: 'Quelle est votre texture de cheveux naturelle ?', component: HairTypes, data: '' },
  {
    text: 'Avez-vous des problèmes capillaires spécifiques ?',
    component: SkinHairProblems,
    data: hairProblems
  }
]
</script>

<template>
  <div class="py-12">
    <h1 class="text-center text-2xl font-semibold text-[#6ECDDF]">Mon profil beauté</h1>
    <div v-for="(question, index) in questions" :key="index" class="xl:px-72 px-6 py-16">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold text-center mb-8">{{ question.text }}</h1>
        <component :problems="question.data" :is="question.component" />
      </div>
    </div>
    <div class="flex justify-center">
      <RouterLink to="/personal-space">
        <button
          type="button"
          class="rounded-xl bg-[#8CD4E0] px-24 py-3 text-md font-bold shadow-sm hover:bg-[#6ECDDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Trouver mes recettes !
        </button></RouterLink
      >
    </div>
  </div>
</template>
