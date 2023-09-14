<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { ClockIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import HairIcon from '@/components/icons/RecipeCategories/IconHair.vue'
import SkinCareIcon from '@/components/icons/RecipeCategories/SkinCare.vue'
import DamagedHairIcon from '@/components/icons/RecipeCategories/DamagedHair.vue'
import { addIcon } from '@/utils.js'

const hairTypeId = ref(localStorage.getItem('hairType') || '')
const skinTypeId = ref(localStorage.getItem('skinType') || '')
const strOfHairProblemId = ref(localStorage.getItem('hairProblem') || '')
const strOfSkinProblemId = ref(localStorage.getItem('skinProblem') || '')
const arrOfSkinProblemId = JSON.parse(strOfSkinProblemId.value)
const arrOfHairProblemId = JSON.parse(strOfHairProblemId.value)

const skinProblemCount = arrOfSkinProblemId.length
const hairProblemCount = arrOfHairProblemId.length

const skinType = ref('')
const hairType = ref('')

async function findSkinHairTypeById() {
  try {
    const response = await fetch('http://localhost:3000/api/physical-trait')
    const data = await response.json()
    const skinTypeData = data.find((skinType) => skinType.id === skinTypeId.value)
    const hairTypeData = data.find((hairType) => hairType.id === hairTypeId.value)
    addIcon(skinTypeData)
    addIcon(hairTypeData)
    skinType.value = skinTypeData
    hairType.value = hairTypeData
  } catch (error) {
    console.error(error)
  }
}

const highlightSkinRecipes = ref([])
const highlightHairRecipes = ref([])

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/recipe')
    const data = await response.json()
    const skinRecipe = data.filter(
      (id) => id.recipe_category_id === '6c250d76-bfad-4968-a334-52e06119c591'
    )
    highlightSkinRecipes.value = skinRecipe.slice(0, 5)
    const hairRecipe = data.filter(
      (id) => id.recipe_category_id === '157bb376-f516-4cfe-9ce8-baa56f5dba89'
    )
    highlightHairRecipes.value = hairRecipe.slice(0, 5)
  } catch (error) {
    console.error(error)
  }
}

fetchData()

// Appeler la fonction une fois que les données sont prêtes (peut-être dans onMounted)
onMounted(async () => {
  await findSkinHairTypeById()
  // Vous pouvez également mettre à jour d'autres données ici si nécessaire
})

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
</script>

<template>
  <div class="bg-white mt-8">
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
            class="w-14 h-14"
          />
          <p class="text-center text-xs md:text-sm font-bold">
            {{
              element.text === 'Peau'
                ? `Peau ${skinType.name}`
                : element.text === 'Cheveux'
                ? `Cheveux ${hairType.name}`
                : element.text === 'Problèmes de peau'
                ? `Problèmes de peau (${skinProblemCount})`
                : element.text === 'Problèmes capillaires'
                ? `Problèmes capillaires (${hairProblemCount})`
                : element.text
            }}
          </p>
        </li>
      </ul>

      <div
        class="relative isolate flex items-center gap-x-6 rounded-xl overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
      >
        <div
          class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style="
              clip-path: polygon(
                74.8% 41.9%,
                97.2% 73.2%,
                100% 34.9%,
                92.5% 0.4%,
                87.5% 0%,
                75% 28.6%,
                58.5% 54.6%,
                50.1% 56.8%,
                46.9% 44%,
                48.3% 17.4%,
                24.7% 53.9%,
                0% 27.9%,
                11.9% 74.2%,
                24.9% 54.1%,
                68.6% 100%,
                74.8% 41.9%
              );
            "
          />
        </div>
        <div
          class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style="
              clip-path: polygon(
                74.8% 41.9%,
                97.2% 73.2%,
                100% 34.9%,
                92.5% 0.4%,
                87.5% 0%,
                75% 28.6%,
                58.5% 54.6%,
                50.1% 56.8%,
                46.9% 44%,
                48.3% 17.4%,
                24.7% 53.9%,
                0% 27.9%,
                11.9% 74.2%,
                24.9% 54.1%,
                68.6% 100%,
                74.8% 41.9%
              );
            "
          />
        </div>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p class="text-sm leading-6 text-gray-900">
            Vous voulez enregistrer votre <span class="font-bold">profil beauté</span> ?
            <span class="font-bold">Inscrivez-vous</span> et retrouvez toutes vos recettes dans
            votre espace personnel !
          </p>
          <a
            href="/sign-up"
            class="flex-none rounded-full bg-[#27304D] px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >S'inscrire <span aria-hidden="true">&rarr;</span></a
          >
        </div>
        <div class="flex flex-1 justify-end">
          <button type="button">
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-5 w-5 text-gray-900" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <div class="py-10 sm:py-26 xl:mx-auto xl:max-w-7xl xl:px-8">
      <h1 class="text-xl font-semibold mb-4 lg:text-2xl text-gray-700 px-4 sm:px-6 lg:px-8 xl:px-0">
        Voici vos recettes beauté !
      </h1>
      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <div class="flex items-center">
          <h2 class="text-base font-bold tracking-tight text-gray-900">Soins cheveux</h2>
          <HairIcon class="w-8 ml-3" />
        </div>

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
                v-for="recipe in highlightHairRecipes"
                :key="recipe.name"
                :href="'/category/recipe'"
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
                  <div class="p-4 w-full bg-white bg-opacity-80 rounded rounded-lg">
                    <div class="flex flex-row items-center text-gray-800">
                      <p class="ml-2 text-sm flex items-center">
                        <ClockIcon class="w-4 h-4 mx-1" />5 min
                      </p>
                    </div>
                    <p class="mt-4 text-sm text-gray-800 sm:mt-2 lg:mt-3 font-bold">
                      {{ recipe.title }}
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

    <!-- ////////////////////////////////// -->

    <div class="pb-12 sm:pb-24 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 class="text-base font-bold tracking-tight text-gray-900 flex">
          Soins visage<SkinCareIcon class="w-10 h-10 ml-3" />
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
                v-for="recipe in highlightSkinRecipes"
                :key="recipe.id"
                :href="'/category/recipe'"
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
                  <div class="p-4 w-full bg-white bg-opacity-80 rounded rounded-lg">
                    <div class="flex flex-row items-center text-gray-800">
                      <p class="ml-2 text-sm flex items-center">
                        <ClockIcon class="w-4 h-4 mx-1" />{{ recipe.preparation_time }}
                      </p>
                    </div>
                    <p class="mt-4 text-sm text-gray-800 sm:mt-2 lg:mt-3 font-bold">
                      {{ recipe.title }}
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
