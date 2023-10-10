<script setup>
import { ClockIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import HairIcon from '@/components/icons/RecipeCategories/IconHair.vue'
import SkinCareIcon from '@/components/icons/RecipeCategories/SkinCare.vue'
import DamagedHairIcon from '@/components/icons/RecipeCategories/DamagedHair.vue'
import recipeIcon from '@/components/icons/Recipe/IconRecipe.vue'
import { addIcon, capitalizeFirstLetter, apiUrl, pushObjectValueInNewArr } from '@/utils.js'
import Banner from '@/components/Banner.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { firebaseApp } from '@/firebaseconfig.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(firebaseApp)

const isUserLoggedIn = ref(false)

const hairTypeId = ref()
const skinTypeId = ref()
const strOfHairProblemId = localStorage.getItem('hairProblem') || ''
const strOfSkinProblemId = localStorage.getItem('skinProblem') || ''
const arrOfSkinProblemId = ref()
const arrOfHairProblemId = ref()

const skinType = ref('')
const hairType = ref('')

const skinTypeName = ref('')
const hairTypeName = ref('')

const highlightSkinRecipes = ref([])
const highlightHairRecipes = ref([])

async function fetchUserPhysicalTraitsById(userId) {
  try {
    const queryString = `/api/user-physical-trait-fetch?user_id=${userId}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const fetchedPhysicalTraits = await response.json()
    skinTypeId.value = fetchedPhysicalTraits[0].skin_type_id
    hairTypeId.value = fetchedPhysicalTraits[0].hair_type_id
    console.log(fetchedPhysicalTraits)
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
    const hairProblemCount = countProblems(arrOfHairProblemId.value)
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

async function fetchUserRecipes(userId) {
  await fetchUserPhysicalTraitsById(userId)
  await fetchUserHairIssueId(userId)
  await fetchUserSkinIssueId(userId)
  await findSkinHairTypeById()
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
    findSkinHairTypeById()
    fetchSkinRecipeBySkinTypeId()
    fetchHairRecipeByHairTypeId()
  }
  // console.log({ skinTypeId: skinTypeId.value, hairTypeId: hairTypeId.value })
})

const noHairProblemId = '77b4ae6d-a31f-4de5-a731-1249cd87eeff'
const noSkinProblemId = '1ddab218-5489-4891-8fbb-1c7061271dc8'

function countProblems(arrOfProblemId) {
  if (arrOfProblemId[0] !== noHairProblemId && arrOfProblemId[0] !== noSkinProblemId) {
    return arrOfProblemId.length
  } else {
    return 0
  }
}
const skinProblemCount = ref('')
const hairProblemCount = ref('')

async function findSkinHairTypeById() {
  try {
    const queryString = `/api/physical-trait`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const data = await response.json()
    const skinTypeData = data.find((skinType) => skinType.id === skinTypeId.value)
    const hairTypeData = data.find((hairType) => hairType.id === hairTypeId.value)
    addIcon(skinTypeData)
    addIcon(hairTypeData)
    skinType.value = skinTypeData
    hairType.value = hairTypeData
    skinTypeName.value = skinTypeData.name.toLowerCase()
    hairTypeName.value = hairTypeData.name.toLowerCase()
  } catch (error) {
    console.error(error)
  }
}

////////////////////////////

const skinCategoryName = ref()
const hairCategoryName = ref()

async function fetchSkinRecipeBySkinTypeId() {
  const queryParamsSkinType = new URLSearchParams({
    physical_trait_id: `${skinTypeId.value},b9f90678-ea3f-4fde-952f-a26a88e13259`,
    beauty_issue_id: arrOfSkinProblemId.value.join(','),
    limit: 5
  })
  try {
    const queryString = `/api/recipe?${queryParamsSkinType}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const recipes = await response.json()
    highlightSkinRecipes.value = recipes
    skinCategoryName.value = recipes[0].recipe_category_name.toLowerCase()
    skinProblemCount.value = countProblems(arrOfSkinProblemId.value)
  } catch (error) {
    console.error(error)
  }
}

async function fetchHairRecipeByHairTypeId() {
  const queryParamsHairType = new URLSearchParams({
    physical_trait_id: `${hairTypeId.value},c8898a24-04cb-4b1f-bb8b-38633aa3c670`,
    beauty_issue_id: arrOfHairProblemId.value.join(','),
    limit: 5
  })
  try {
    const queryString = `/api/recipe?${queryParamsHairType}`
    const url = apiUrl + queryString
    const response = await fetch(url)
    const recipes = await response.json()
    highlightHairRecipes.value = recipes
    hairCategoryName.value = recipes[0].recipe_category_name.toLowerCase()
    hairProblemCount.value = countProblems(arrOfHairProblemId.value)
  } catch (error) {
    console.error(error)
  }
}

const beautyProfile = [
  {
    icon: SkinCareIcon,
    text: `Peau`
  },
  {
    icon: SkinCareIcon,
    text: 'Problèmes de peau'
  },
  {
    icon: HairIcon,
    text: `Cheveux`
  },
  {
    icon: DamagedHairIcon,
    text: 'Problèmes capillaires'
  }
]

// const pages = [
//   {
//     name: `Questionnaire`,
//     href: `/quiz`,
//     current: false
//   },
//   {
//     name: `Recettes`,
//     href: `/personal-space`,
//     current: true
//   }
// ]
</script>

<template>
  <Breadcrumbs />
  <div class="bg-white">
    <div class="px-4 py-4 xl:px-44">
      <!-- <h1 class="text-xl font-semibold mb-4 lg:text-xl text-gray-700">Votre profil beauté</h1> -->
      <ul class="flex justify-around border border-2 py-2 px-2 rounded-xl mb-3 border-[#6ECDDF]">
        <li v-for="element in beautyProfile" class="flex flex-col items-center p-2">
          <component
            :is="
              element.text === 'Peau'
                ? skinType.icon
                : element.text === 'Cheveux'
                ? hairType.icon
                : element.icon
            "
            class="w-12 h-12"
          />
          <p class="text-center text-xs md:text-sm font-bold">
            {{
              element.text === 'Peau'
                ? `Peau ${skinTypeName}`
                : element.text === 'Cheveux'
                ? `Cheveux ${hairTypeName}`
                : element.text === 'Problèmes de peau'
                ? `Problèmes de peau (${skinProblemCount})`
                : element.text === 'Problèmes capillaires'
                ? `Problèmes capillaires (${hairProblemCount})`
                : element.text
            }}
          </p>
        </li>
      </ul>
      <Banner v-if="!isUserLoggedIn" />
    </div>

    <div class="py-10 sm:py-26 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div class="mb-4 px-4 sm:px-6 lg:px-8 xl:px-0 flex items-center">
        <h1 class="text-xl font-semibold lg:text-2xl text-gray-700 pb-3">Vos recettes beauté</h1>
        <recipeIcon class="ml-2 w-14" />
      </div>

      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <div class="flex items-center">
          <h2 class="text-base font-bold tracking-tight text-gray-900">Soins cheveux</h2>
          <HairIcon class="w-8 ml-3" />
        </div>

        <RouterLink
          :to="`/recipe/${hairCategoryName}`"
          class="hidden text-sm font-semibold text-[##27304D] hover:text-gray-500 sm:block"
        >
          Voir tout
          <span aria-hidden="true"> &rarr;</span>
        </RouterLink>
      </div>

      <div class="mt-4 flow-root">
        <div class="-my-2">
          <div
            class="relative box-content h-80 overflow-y-hidden overflow-x-auto pb-5 pt-2 xl:overflow-visible"
          >
            <div
              class="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0"
            >
              <RouterLink
                v-for="recipe in highlightHairRecipes"
                :key="recipe.id"
                :to="`/recipe/${hairCategoryName}/${recipe.id}`"
                class="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
              >
                <span aria-hidden="true" class="absolute inset-0">
                  <img
                    :src="recipe.img_url"
                    alt=""
                    class="h-full w-full object-cover object-center"
                  />
                </span>
                <span
                  aria-hidden="true"
                  class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                />
                <div
                  class="absolute right-0 left-0 bottom-4 px-4 mx-auto sm:px-2 lg:px-4 sm:bottom-2 lg:bottom-4"
                >
                  <div class="p-3 w-full bg-white bg-opacity-80 rounded rounded-lg">
                    <div class="flex flex-row items-center text-gray-800">
                      <p class="text-sm flex items-center">
                        <ClockIcon class="w-4 h-4 mr-1" />{{ recipe.preparation_time }} |
                        {{ recipe.ingredient_count }}
                        ingrédients
                      </p>
                    </div>
                    <p class="mt-4 text-sm text-gray-800 sm:mt-2 lg:mt-3 font-bold">
                      {{ recipe.title }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 px-4 sm:hidden text-right">
        <RouterLink
          :to="`/recipe/${hairCategoryName}`"
          class="block text-sm font-semibold text-[##27304D] hover:text-gray-500"
        >
          Voir tout
          <span aria-hidden="true"> &rarr;</span>
        </RouterLink>
      </div>
    </div>

    <!-- ////////////////////////////////// -->

    <div class="pb-12 sm:pb-24 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 class="text-base font-bold tracking-tight text-gray-900 flex">
          Soins visage<SkinCareIcon class="w-10 h-10 ml-3" />
        </h2>
        <RouterLink
          :to="`/recipe/${skinCategoryName}`"
          class="hidden text-sm font-semibold text-[##27304D] hover:text-gray-500 sm:block"
        >
          Voir tout
          <span aria-hidden="true"> &rarr;</span>
        </RouterLink>
      </div>

      <div class="mt-4 flow-root">
        <div class="-my-2">
          <div
            class="relative box-content h-80 overflow-y-hidden overflow-x-auto pb-5 pt-2 xl:overflow-visible"
          >
            <div
              class="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0"
            >
              <RouterLink
                v-for="recipe in highlightSkinRecipes"
                :key="recipe.id"
                :to="`/recipe/${skinCategoryName}/${recipe.id}`"
                class="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
              >
                <span aria-hidden="true" class="absolute inset-0">
                  <img
                    :src="recipe.img_url"
                    alt=""
                    class="h-full w-full object-cover object-center"
                  />
                </span>
                <span
                  aria-hidden="true"
                  class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                />
                <div
                  class="absolute right-0 left-0 bottom-4 px-4 mx-auto sm:px-2 lg:px-4 sm:bottom-2 lg:bottom-4"
                >
                  <div class="p-3 w-full bg-white bg-opacity-80 rounded rounded-lg">
                    <div class="flex flex-row items-center text-gray-800">
                      <p class="text-sm flex items-center">
                        <ClockIcon class="w-4 h-4 mr-1" />{{ recipe.preparation_time }} |
                        {{ recipe.ingredient_count }}
                        ingrédients
                      </p>
                    </div>
                    <p class="mt-4 text-sm text-gray-800 sm:mt-2 lg:mt-3 font-bold">
                      {{ recipe.title }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 px-4 sm:hidden text-right">
        <RouterLink
          :to="`/recipe/${skinCategoryName}`"
          class="block text-sm font-semibold text-[##27304D] hover:text-gray-500"
        >
          Voir tout
          <span aria-hidden="true"> &rarr;</span>
        </RouterLink>
      </div>
    </div>

    <!-- ////////////////////////////////// -->

    <!-- <div class="xl:mx-auto xl:max-w-7xl xl:px-8">
      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 class="text-base font-bold tracking-tight text-gray-900 flex">
          Soins corps<BodyIcon class="w-7 ml-3" />
        </h2>
        <a
          href="/category"
          class="hidden text-sm font-semibold text-[##27304D] hover:text-gray-500 sm:block"
        >
          Voir tout
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div class="mt-4 flow-root">
        <div class="-my-2">
          <div
            class="relative box-content h-80 overflow-y-hidden overflow-x-auto pb-5 pt-2 xl:overflow-visible"
          >
            <div
              class="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0"
            >
              <a
                v-for="category in categories"
                :key="category.name"
                :href="category.href"
                class="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
              >
                <span aria-hidden="true" class="absolute inset-0">
                  <img
                    :src="category.imageSrc"
                    alt=""
                    class="h-full w-full object-cover object-center"
                  />
                </span>
                <span
                  aria-hidden="true"
                  class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                />
                <div
                  class="absolute right-0 left-0 bottom-4 px-4 mx-auto sm:px-2 lg:px-4 sm:bottom-2 lg:bottom-4"
                >
                  <div class="p-4 w-full bg-white bg-opacity-80 rounded rounded-lg">
                    <div class="flex flex-row items-center text-gray-800">
                      <p class="ml-2 text-sm flex items-center">
                        Facile | <ClockIcon class="w-4 h-4 mx-1" />5 min
                      </p>
                    </div>
                    <p class="mt-4 text-sm text-gray-800 sm:mt-2 lg:mt-3 font-bold">
                      {{ category.name }}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 px-4 sm:hidden text-right">
        <RouterLink
          to="/category"
          class="block text-sm font-semibold text-[##27304D] hover:text-gray-500"
        >
          Voir tout
          <span aria-hidden="true"> &rarr;</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template> -->
  </div>
</template>
