<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  BeakerIcon,
  ChevronUpIcon,
  InformationCircleIcon,
  ShoppingBagIcon
} from '@heroicons/vue/24/outline'
import HairIcon from '@/components/icons/RecipeCategories/IconHair.vue'
import SkinIcon from '@/components/icons/RecipeCategories/IconSkin.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import IconConservation from '../components/icons/Recipe/IconConservation.vue'
import IconTexture from '../components/icons/Recipe/IconTexture.vue'
import IconClock from '../components/icons/Recipe/IconClock.vue'
import { capitalizeFirstLetter, apiUrl } from '@/utils.js'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const recipe = ref({})
const pages = ref()

const router = useRouter()
const route = useRoute()
const recipeId = route.params.id
const catgeoryName = route.params.category

async function fetchRecipeById() {
  try {
    const queryString = `/api/recipe?id=${recipeId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedRecipe = await response.json()
    recipe.value = fetchedRecipe[0]

    pages.value = [
      {
        name: `${capitalizeFirstLetter(catgeoryName)}`,
        href: '',
        current: false
      },
      {
        name: `${capitalizeFirstLetter(fetchedRecipe[0].title)}`,
        href: `/recipe/${catgeoryName}/${fetchedRecipe[0].id}`,
        current: true
      }
    ]
  } catch (error) {
    console.error(error)
  }
}
fetchRecipeById()

const recipeIngredients = ref()

async function fetchRecipeIngredientsById() {
  try {
    const queryString = `/api/recipe-ingredient?recipe_id=${recipeId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedIngredients = await response.json()
    recipeIngredients.value = fetchedIngredients
  } catch (error) {
    console.error(error)
  }
}
const recipeSteps = ref([])

async function fetchRecipeStepsById() {
  try {
    const queryString = `/api/recipe-step?recipe_id=${recipeId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedSteps = await response.json()
    recipeSteps.value = fetchedSteps
  } catch (error) {
    console.error(error)
  }
}

const recipeBenefits = ref([])
async function fetchRecipeBenefitsById() {
  try {
    const queryString = `/api/recipe-product-benefit?recipe_id=${recipeId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedBenefits = await response.json()
    recipeBenefits.value = fetchedBenefits
  } catch (error) {
    console.error(error)
  }
}

const recipeAllergens = ref([])

function displayAllergens(fetchedAllergens) {
  if (fetchedAllergens.length === 0) {
    return "Pas d'allergènes"
  } else {
    const arrOfAllergens = []
    for (const objet of fetchedAllergens) {
      arrOfAllergens.push(objet.name)
    }
    return arrOfAllergens.join(', ')
  }
}

async function fetchRecipeAllergensById() {
  try {
    const queryString = `/api/recipe-product-allergen?recipe_id=${recipeId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedAllergens = await response.json()
    recipeAllergens.value = displayAllergens(fetchedAllergens)
  } catch (error) {
    console.error(error)
  }
}

function displayPhysicalTraits(arrOfPhysicalTrait) {
  const arrOfPhysicalTraitWithoutObject = []
  for (const physicalTrait of arrOfPhysicalTrait) {
    if (physicalTrait.name === 'Normale') {
      arrOfPhysicalTraitWithoutObject.push('Tous types')
    } else {
      arrOfPhysicalTraitWithoutObject.push(physicalTrait.name)
    }
  }
  return arrOfPhysicalTraitWithoutObject.join(' | ')
}

function displayBeautyIssues(arrOfBeautyIssues) {
  const arrOfBeautyIssuesWithoutObject = []
  for (const beautyIssue of arrOfBeautyIssues) {
    if (beautyIssue.name !== 'Aucun problème') {
      arrOfBeautyIssuesWithoutObject.push(beautyIssue.name)
    }
  }
  return arrOfBeautyIssuesWithoutObject
}
const recipeBeautyIssues = ref([])
const recipePhysicalTrait = ref([])

async function fetchRecipeBeautyIssuesById() {
  try {
    const queryStringBeautyIssue = `/api/recipe-beauty-issue?recipe_id=${recipeId}`
    const apiUrlBeautyIssue = apiUrl + queryStringBeautyIssue
    const responseBeautyIssue = await fetch(apiUrlBeautyIssue)
    const fetchedDataBeautyIssue = await responseBeautyIssue.json()
    const queryStringPhysicalTrait = `/api/recipe-physical-trait?recipe_id=${recipeId}`
    const apiUrlPhysicalTrait = apiUrl + queryStringPhysicalTrait
    const responsePhysicalTrait = await fetch(apiUrlPhysicalTrait)
    const fetchedDataPhysicalTrait = await responsePhysicalTrait.json()
    recipeBeautyIssues.value = displayBeautyIssues(fetchedDataBeautyIssue)
    recipePhysicalTrait.value = displayPhysicalTraits(fetchedDataPhysicalTrait)
  } catch (error) {
    console.error(error)
  }
}

fetchRecipeBeautyIssuesById()
fetchRecipeAllergensById()
fetchRecipeBenefitsById()
fetchRecipeStepsById()
fetchRecipeIngredientsById()
</script>

<template>
  <Breadcrumbs :pages="pages" />
  <div class="flex flex-col">
    <div class="px-4 pt-6 flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center mb-8 text-gray-900">
        {{ recipe.title }}
      </h1>

      <div class="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8">
        <span
          v-for="benefit in recipeBenefits"
          class="bg-[#FBDFDB] inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
        >
          {{ benefit.name }}
        </span>
      </div>

      <div
        class="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-8"
        v-if="recipeBeautyIssues.length !== 0"
      >
        <span
          v-for="beautyIssue in recipeBeautyIssues"
          class="bg-[#C7E8F1] inline-flex items-center text-center gap-x-1.5 rounded-full px-2 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
        >
          {{ beautyIssue }}
        </span>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="flex w-full lg:w-4/5 h-96 overflow-hidden lg:mb-8">
        <img :src="recipe.img_url" class="w-full h-auto object-cover lg:rounded-xl" />
      </div>
      <div class="bg-[#FBDFDB] lg:w-4/5 lg:rounded-xl w-full px-4 py-3">
        <div class="flex items-baseline justify-center">
          <div class="flex flex-col items-center px-8">
            <IconTexture class="w-8 h-8" />
            <p class="text-xs md:text-sm mt-2">{{ recipe.product_texture_type_name }}</p>
          </div>
          <div class="flex flex-col items-center px-8">
            <IconClock class="w-8 h-8" />
            <p class="text-xs md:text-sm mt-2">{{ recipe.preparation_time }}</p>
          </div>
          <div class="flex flex-col items-center px-8">
            <component
              :is="recipe.recipe_category_name === 'Cheveux' ? HairIcon : SkinIcon"
              class="w-8"
            ></component>
            <p class="text-xs md:text-sm flex flex-row mt-2">{{ recipePhysicalTrait }}</p>
          </div>

          <div class="flex flex-col items-center px-8">
            <IconConservation class="w-10 h-10" />
            <p class="text-xs md:text-sm mt-2">{{ recipe.storage_time }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-end px-4 py-4 text-gray-600">
        <p class="truncate text-sm mr-2">
          Pour {{ recipe.product_quantity }} {{ recipe.product_quantity_unit }}
        </p>
        <div><BeakerIcon class="w-6 h-6" /></div>
      </div>
    </div>

    <div class="px-4 py-8 w-full">
      <div class="flex flex-col items-center mb-12 w-full">
        <h2 class="text-2xl font-semibold mb-4">Ingrédients</h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full lg:w-7/12">
          <div
            v-for="ingredient in recipeIngredients"
            class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
          >
            <img
              class="mx-auto h-14 w-14 flex-shrink-0 rounded-full object-cover"
              :src="ingredient.img_url"
              alt=""
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between">
                <p class="text-sm font-medium text-gray-900">
                  {{ ingredient.name }}
                </p>
                <div class="flex items-start">
                  <div class="inline-flex">
                    <Menu as="div" class="relative -ml-px block">
                      <MenuButton
                        class="relative inline-flex items-center mx-2 bg-white text-gray-500 hover:text-gray-700 focus:z-10"
                      >
                        <span class="sr-only">Open options</span>
                        <InformationCircleIcon
                          v-if="ingredient.description"
                          class="h-5 w-5"
                          aria-hidden="true"
                        />
                      </MenuButton>

                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <MenuItems
                          class="absolute right-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div class="py-1">
                            <MenuItem>
                              <p class="block px-4 py-2 text-sm text-gray-500">
                                {{ ingredient.description }}
                              </p>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>

                  <button
                    class="relative inline-flex items-center rounded-full bg-white text-gray-500 hover:text-gray-700 focus:z-10"
                  >
                    <a v-if="ingredient.product_url" :href="ingredient.product_url" target="_blank">
                      <ShoppingBagIcon class="h-5 w-5" />
                    </a>
                  </button>
                </div>
              </div>

              <p class="truncate text-sm text-gray-500">{{ ingredient.ingredient_quantity }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center mb-12 w-full">
        <h2 class="text-2xl font-semibold mb-4">Recette</h2>

        <div class="flex flex-col border rounded-xl px-8 py-2 lg:w-7/12">
          <div v-for="step in recipeSteps" class="py-8 border-b last:border-none">
            <p class="font-semibold text-gray-900">Étape {{ step.step_number }}</p>
            <p class="text-gray-500">{{ step.step }}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center w-full">
        <h2 class="text-2xl font-semibold mb-4">Mode d'emploi</h2>

        <div class="flex flex-col border rounded-xl px-8 pt-4 pb-8 w-full lg:w-7/12">
          <div class="py-8 border-b">
            <p>{{ recipe.instructions }}</p>
          </div>

          <div class="w-full">
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                class="flex w-full justify-between pt-8 text-left font-medium font-semibold text-gray-900"
              >
                <span>Précautions</span>
                <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel class="pt-4 pb-4 text-gray-500">
                {{ recipe.safety_precautions }}
              </DisclosurePanel>
            </Disclosure>

            <Disclosure as="div" class="mt-8 border-t" v-slot="{ open }">
              <DisclosureButton
                class="flex w-full justify-between pt-8 text-left font-medium font-semibold text-gray-900"
              >
                <span>Allergènes</span>
                <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel class="pt-4 pb-4 text-gray-500">
                {{ recipeAllergens }}
              </DisclosurePanel>
            </Disclosure>

            <Disclosure as="div" class="mt-8 border-t" v-slot="{ open }">
              <DisclosureButton
                class="flex w-full justify-between pt-8 text-left font-medium font-semibold text-gray-900"
              >
                <span>Conservation</span>
                <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel class="pt-4 pb-4 text-gray-500">
                {{ recipe.storage_method }}
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
