<script setup>
import { ClockIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'

const props = defineProps({
  recipes: Array,
  categoryName: String,
  beautyIssue: String
})
</script>

<template>
  <div class="p-4 flex flex-col items-center">
    <h1 class="text-2xl font-bold text-center mb-8 text-gray-900">
      Soins {{ props.categoryName }}
    </h1>
    <div
      class="flex space-x-3 mb-8"
      v-if="props.beautyIssue && props.beautyIssue !== 'Aucun problème'"
    >
      <span
        class="bg-[#C7E8F1] inline-flex items-center text-center gap-x-1.5 rounded-full px-3 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
        >{{ props.beautyIssue }}
      </span>
    </div>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 px-4 lg:w-3/5">
      <div v-for="recipe in props.recipes" class="mb-4 w-full hover:opacity-75">
        <RouterLink :to="`/recettes/${props.categoryName}/${recipe.slug}`">
          <div class="relative flex w-full h-96 overflow-hidden lg:mb-8 rounded-xl">
            <!-- <span
              class="bg-white bg-opacity-80 absolute top-4 left-4 px-2 py-1 text-sm text-gray-600 rounded-tl-lg rounded-br-lg sm:top-2 xl:top-4 sm:left-2 xl:left-4"
            >
              {{ recipe.recipe_category_name }}
            </span> -->

            <img :src="recipe.img_url" class="w-full h-auto object-cover" />

            <div
              class="absolute right-0 left-0 bottom-4 px-4 mx-auto sm:px-2 lg:px-4 sm:bottom-2 lg:bottom-4"
            >
              <div class="p-4 w-full bg-white bg-opacity-80 rounded rounded-lg">
                <div class="flex flex-row items-center">
                  <p class="text-sm flex items-center">
                    <ClockIcon class="w-4 h-4 mr-1" />{{ recipe.preparation_time }} |
                    {{ recipe.ingredient_count }} ingrédients
                  </p>
                </div>
                <p class="mt-4 text-base text-gray-800 sm:mt-2 lg:mt-3 font-bold">
                  {{ recipe.title }}
                </p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </ul>
  </div>
</template>
