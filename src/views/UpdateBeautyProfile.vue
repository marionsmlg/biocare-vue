<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import SkinTypes from '../components/beauty-profile/SkinTypes.vue'
import SkinHairProblems from '../components/beauty-profile/SkinHairProblems.vue'
import HairTypes from '../components/beauty-profile/HairTypes.vue'
import BackButton from '../components/buttons/BackButton.vue'
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { apiUrl, pushObjectValueInNewArr, updateData, fetchUserBeautyProfile } from '@/utils.js'
import { firebaseApp } from '@/firebaseconfig.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(firebaseApp)

const skinProblems = ref([])
const hairProblems = ref([])

async function fetchBeautyIssues() {
  try {
    const queryString = `/api/v1/beauty-issue`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const data = await response.json()
    skinProblems.value = data.skinIssue
    hairProblems.value = data.hairIssue
  } catch (error) {
    console.error(error)
  }
}

fetchBeautyIssues()

const selectedSkinType = ref('')
const selectedHairType = ref('')
const selectedSkinProblem = ref([])
const selectedHairProblem = ref([])

async function fetchUserData(userId) {
  const dataUser = await fetchUserBeautyProfile(userId)
  selectedSkinType.value = dataUser.physicalTrait[0].skin_type_id
  selectedHairType.value = dataUser.physicalTrait[0].hair_type_id

  for (const object of dataUser.hairIssue) {
    const arrOfkey = Object.keys(object)
    const key = arrOfkey[0]
    selectedHairProblem.value.push(object[key])
  }
  for (const object of dataUser.skinIssue) {
    const arrOfkey = Object.keys(object)
    const key = arrOfkey[0]
    selectedSkinProblem.value.push(object[key])
  }
}

const allQuestionsAnswered = computed(() => {
  return (
    selectedSkinType &&
    selectedHairType &&
    selectedSkinProblem.value.length !== 0 &&
    selectedHairProblem.value.length !== 0
  )
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchUserData(user.uid)
  }
})

function updateCheckboxes({ instance, values }) {
  if (instance === 'skinProblems') {
    selectedSkinProblem.value = values
  } else if (instance === 'hairProblems') {
    selectedHairProblem.value = values
  }
}

const router = useRouter()

async function quizDataExists() {
  const queryParams = new URLSearchParams({
    skin_type_id: selectedSkinType.value,
    hair_type_id: selectedHairType.value,
    skin_issue_id: selectedSkinProblem.value.join(','),
    hair_issue_id: selectedHairProblem.value.join(',')
  })
  try {
    const queryString = `/api/v1/quiz-data-exists?${queryParams}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('les donnees n existent pas')
  }
}

async function findRecipes() {
  const quizDataAreValid = await quizDataExists()
  onAuthStateChanged(auth, async (user) => {
    if (user && quizDataAreValid) {
      await updateData(`${apiUrl}/api/v1/users`, {
        skin_type_id: selectedSkinType.value,
        hair_type_id: selectedHairType.value,
        skin_issue_id: selectedSkinProblem.value.join(','),
        hair_issue_id: selectedHairProblem.value.join(',')
      })
      router.push('/mes-recettes')
    } else {
      console.log('Pas connecte!!')
    }
  })
}
</script>

<template>
  <div class="py-12 max-w-6xl m-auto px-4">
    <BackButton />
    <div class="py-10">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold text-center mb-8">Quel est votre type de peau ?</h1>
        <SkinTypes v-model="selectedSkinType" />
      </div>
    </div>

    <div class="xl:px-72 px-6 py-10">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold text-center mb-8">
          Avez-vous des problèmes de peau spécifiques ?
        </h1>
        <SkinHairProblems
          :problems="skinProblems"
          :instance="'skinProblems'"
          @updateCheckboxes="updateCheckboxes"
          :initialSelectedOptions="selectedSkinProblem"
        />
      </div>
    </div>

    <div class="xl:px-72 px-6 py-10">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold text-center mb-8">
          Quelle est votre texture de cheveux naturelle ?
        </h1>
        <HairTypes v-model="selectedHairType" />
      </div>
    </div>

    <div class="xl:px-72 px-6 py-10">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold text-center mb-8">
          Avez-vous des problèmes capillaires spécifiques ?
        </h1>
        <SkinHairProblems
          :problems="hairProblems"
          :instance="'hairProblems'"
          @updateCheckboxes="updateCheckboxes"
          :initialSelectedOptions="selectedHairProblem"
        />
      </div>
    </div>

    <div class="flex justify-center">
      <button
        :disabled="!allQuestionsAnswered"
        type="submit"
        :class="[
          !allQuestionsAnswered
            ? 'bg-sky-200 text-gray-500 cursor-not-allowed'
            : 'bg-[#8CD4E0] hover:bg-[#6ECDDF]',
          'rounded-xl px-24 py-3 text-sm md:text-md font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        ]"
        @click="findRecipes"
      >
        Trouver mes recettes !
      </button>
    </div>
  </div>
</template>
