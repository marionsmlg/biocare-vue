<script setup>
import Category from '@/components/Category.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from '@/components/buttons/BackButton.vue'
import { apiUrl, pushObjectValueInNewArr } from '@/utils.js'
import { firebaseApp } from '@/firebaseconfig.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const route = useRoute()
const recipeCategoryName = route.params.category
const auth = getAuth(firebaseApp)

const isUserLoggedIn = ref(false)

const hairTypeId = ref()
const skinTypeId = ref()
const strOfHairProblemId = localStorage.getItem('hairProblem') || ''
const strOfSkinProblemId = localStorage.getItem('skinProblem') || ''
const arrOfSkinProblemId = ref()
const arrOfHairProblemId = ref()

const noHairProblemId = '77b4ae6d-a31f-4de5-a731-1249cd87eeff'
const noSkinProblemId = '1ddab218-5489-4891-8fbb-1c7061271dc8'

function addnoProblemId(arrOfProblemId, noProblemId) {
  arrOfProblemId.push(noProblemId)
  return arrOfProblemId
}

let page = 1
let limit = 9

function displayNextRecipes() {
  page++
  if (recipeCategoryName === 'cheveux') {
    if (hairRecipes.value.length === limit) {
      limit = 9 * page
      fetchHairRecipeByHairTypeId()
    }
  } else {
    if (skinRecipes.value.length === limit) {
      limit = 9 * page
    }
    fetchSkinRecipeBySkinTypeId()
  }
}

const canDisplayMoreRecipes = computed(() => {
  if (recipeCategoryName === 'cheveux') {
    return hairRecipes.value.length >= limit
  } else {
    return skinRecipes.value.length >= limit
  }
})

async function fetchUserRecipes(userId) {
  await fetchUserPhysicalTraitsById(userId)
  await fetchUserHairIssueId(userId)
  await fetchUserSkinIssueId(userId)
  await fetchSkinRecipeBySkinTypeId()
  await fetchHairRecipeByHairTypeId()
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    isUserLoggedIn.value = true
    fetchUserRecipes(user.uid)
  } else {
    isUserLoggedIn.value = false
    hairTypeId.value = localStorage.getItem('hairType') || ''
    skinTypeId.value = localStorage.getItem('skinType') || ''
    arrOfHairProblemId.value = JSON.parse(strOfHairProblemId)
    arrOfSkinProblemId.value = JSON.parse(strOfSkinProblemId)
    fetchSkinRecipeBySkinTypeId()
    fetchHairRecipeByHairTypeId()
  }
})

async function fetchUserPhysicalTraitsById(userId) {
  try {
    const queryString = `/api/user-physical-trait-fetch?user_id=${userId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedPhysicalTraits = await response.json()
    skinTypeId.value = fetchedPhysicalTraits[0].skin_type_id
    hairTypeId.value = fetchedPhysicalTraits[0].hair_type_id
  } catch (error) {
    console.error(error)
  }
}

async function fetchUserHairIssueId(userId) {
  try {
    const queryString = `/api/user-hair-issue?user_id=${userId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedHairIssueId = await response.json()
    arrOfHairProblemId.value = pushObjectValueInNewArr(fetchedHairIssueId)
  } catch (error) {
    console.error(error)
  }
}

async function fetchUserSkinIssueId(userId) {
  try {
    const queryString = `/api/user-skin-issue?user_id=${userId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedSkinIssueId = await response.json()
    arrOfSkinProblemId.value = pushObjectValueInNewArr(fetchedSkinIssueId)
  } catch (error) {
    console.error(error)
  }
}

///////////////////////////////////////

const skinRecipes = ref([])
const hairRecipes = ref([])

async function fetchSkinRecipeBySkinTypeId() {
  const skinPb = addnoProblemId(arrOfSkinProblemId.value, noSkinProblemId)
  const queryParamsSkinType = new URLSearchParams({
    physical_trait_id: `${skinTypeId.value},b9f90678-ea3f-4fde-952f-a26a88e13259`,
    beauty_issue_id: skinPb.join(','),
    limit: limit
  })
  try {
    const queryString = `/api/recipe?${queryParamsSkinType}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const recipes = await response.json()
    skinRecipes.value = recipes
  } catch (error) {
    console.error(error)
  }
}

async function fetchHairRecipeByHairTypeId() {
  const hairPb = addnoProblemId(arrOfHairProblemId.value, noHairProblemId)
  const queryParamsHairType = new URLSearchParams({
    physical_trait_id: `${hairTypeId.value},c8898a24-04cb-4b1f-bb8b-38633aa3c670`,
    beauty_issue_id: hairPb.join(','),
    limit: limit
  })
  try {
    const queryString = `/api/recipe?${queryParamsHairType}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const recipes = await response.json()
    hairRecipes.value = recipes
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="xl:px-8 px-4 py-8">
    <BackButton />
  </div>
  <Category
    :recipes="recipeCategoryName === 'cheveux' ? hairRecipes : skinRecipes"
    :categoryName="recipeCategoryName"
  />
  <div class="flex justify-center" v-if="canDisplayMoreRecipes">
    <button
      @click="displayNextRecipes"
      type="button"
      class="md:px-14 md:py-3 w-auto rounded-xl bg-[#8CD4E0] px-3 py-2 text-md font-bold shadow-sm hover:bg-[#1AB2CC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Afficher plus de recettes
    </button>
  </div>
</template>
