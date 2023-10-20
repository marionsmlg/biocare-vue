<script setup>
import Category from '@/components/Category.vue'
import { ref, computed } from 'vue'
import BackButton from '@/components/buttons/BackButton.vue'
import { apiUrl } from '@/utils.js'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const category = route.params.category
const beautyIssueSlug = route.query.issue
const beautyIssueName = ref()

const recipesByProblem = ref([])

let page = 1
let limit = 9

function displayNextRecipes() {
  page++

  if (recipesByProblem.value.length === limit) {
    limit = 9 * page

    fetchRecipeProblemId()
  }
}

const canDisplayMoreRecipes = computed(() => {
  return recipesByProblem.value.length > limit
})

async function fetchRecipeProblemId() {
  const queryParams = new URLSearchParams({
    beauty_issue_slug: beautyIssueSlug,
    limit: limit
  })
  try {
    const queryString = `/api/v1/recipes?${queryParams}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const recipes = await response.json()
    recipesByProblem.value = recipes
    beautyIssueName.value = recipes[0].beauty_issue_name
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
  <Category :categoryName="category" :recipes="recipesByProblem" :beautyIssue="beautyIssueName" />
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
