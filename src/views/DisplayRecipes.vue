<script setup>
import Category from './Category.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '../components/Breadcrumbs.vue'

const route = useRoute()
const recipeCategoryName = route.params.category
console.log(recipeCategoryName)

const hairTypeId = ref(localStorage.getItem('hairType') || '')
const skinTypeId = ref(localStorage.getItem('skinType') || '')
const strOfHairProblemId = ref(localStorage.getItem('hairProblem') || '')
const strOfSkinProblemId = ref(localStorage.getItem('skinProblem') || '')
const arrOfSkinProblemId = JSON.parse(strOfSkinProblemId.value)
const arrOfHairProblemId = JSON.parse(strOfHairProblemId.value)

const noHairProblemId = '77b4ae6d-a31f-4de5-a731-1249cd87eeff'
const noSkinProblemId = '1ddab218-5489-4891-8fbb-1c7061271dc8'

function addnoProblemId(arrOfProblemId, noProblemId) {
  arrOfProblemId.push(noProblemId)
  return arrOfProblemId
}

const hairPb = addnoProblemId(arrOfHairProblemId, noHairProblemId)
const skinPb = addnoProblemId(arrOfSkinProblemId, noSkinProblemId)

const skinRecipes = ref([])
const hairRecipes = ref([])

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
    console.log(hairRecipes.value.length)
    console.log({ limit })
    console.log(hairRecipes.value.length > limit)
    return hairRecipes.value.length >= limit
  } else {
    return skinRecipes.value.length >= limit
  }
})

async function fetchSkinRecipeBySkinTypeId() {
  const queryParamsSkinType = new URLSearchParams({
    physical_trait_id: `${skinTypeId.value},b9f90678-ea3f-4fde-952f-a26a88e13259`,
    beauty_issue_id: skinPb.join(','),
    limit: limit
  })
  try {
    const apiUrl = `http://localhost:3000/api/recipe?${queryParamsSkinType}`
    const response = await fetch(apiUrl)
    const recipes = await response.json()
    skinRecipes.value = recipes
    console.log(recipes)
  } catch (error) {
    console.error(error)
  }
}

async function fetchHairRecipeByHairTypeId() {
  const queryParamsHairType = new URLSearchParams({
    physical_trait_id: `${hairTypeId.value},c8898a24-04cb-4b1f-bb8b-38633aa3c670`,
    beauty_issue_id: hairPb.join(','),
    limit: limit
  })
  try {
    const apiUrl = `http://localhost:3000/api/recipe?${queryParamsHairType}`
    const response = await fetch(apiUrl)
    const recipes = await response.json()
    hairRecipes.value = recipes
    console.log(recipes)
  } catch (error) {
    console.error(error)
  }
}

fetchSkinRecipeBySkinTypeId()
fetchHairRecipeByHairTypeId()
const pages = [
  {
    name: 'Recettes',
    href: `/personal-space`,
    current: false
  },
  {
    name: `Cheveux`,
    href: `/recipe/Visage/10113597-a00c-4761-8d01-0e81ec9b30cd`,
    current: true
  }
]
</script>

<template>
  <Breadcrumbs :pages="pages" />
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
