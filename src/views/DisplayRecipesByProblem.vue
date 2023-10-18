<script setup>
import Category from '@/components/Category.vue'
import { ref, computed } from 'vue'
import BackButton from '@/components/buttons/BackButton.vue'
import { apiUrl } from '@/utils.js'

const strOfBodyPart = ref(localStorage.getItem('category') || '')
const strOfProblem = ref(localStorage.getItem('problem') || '')
const bodyPart = JSON.parse(strOfBodyPart.value)
const problem = JSON.parse(strOfProblem.value)

const recipesByProblem = ref([])

const bodyPartName = bodyPart.name.toLowerCase()

let page = 1
let limit = 9

function displayNextRecipes() {
  page++

  if (recipesByProblem.value.length === limit) {
    limit = 9 * page

    fetchRecipeProblemId()
  }
}

function getPhysicalTrait(categoryName) {
  const allSkinTypesId = `b9f90678-ea3f-4fde-952f-a26a88e13259`
  const allHairTypesId = 'c8898a24-04cb-4b1f-bb8b-38633aa3c670'
  if (categoryName === 'Cheveux') {
    return allHairTypesId
  } else {
    return allSkinTypesId
  }
}

const canDisplayMoreRecipes = computed(() => {
  return recipesByProblem.value.length > limit
})

async function fetchRecipeProblemId() {
  const queryParams = new URLSearchParams({
    physical_trait_id: getPhysicalTrait(bodyPart.name),
    beauty_issue_id: problem.id,
    limit: limit
  })
  try {
    const queryString = `/api/v1/recipes?${queryParams}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const recipes = await response.json()
    recipesByProblem.value = recipes
  } catch (error) {
    console.error(error)
  }
}
fetchRecipeProblemId()
</script>

<template>
  <div class="xl:px-8 px-4 py-8">
    <BackButton />
  </div>
  <Category :categoryName="bodyPartName" :recipes="recipesByProblem" :beautyIssue="problem.name" />
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
