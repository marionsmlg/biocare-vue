<script setup>
import { ref } from 'vue'
import IconChevronLeft from '../components/icons/IconChevronLeft.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'

const categories = ['Soins cheveux', 'Soins corps', 'Soins visage']

const recipes = [
  {
    title: 'Elixir de soin pointes sèches et abimées à la Grenade Bio',
    time: '5 min',
    category: 'Soins cheveux',
    level: 'Facile',
    imgUrl:
      'https://images.unsplash.com/photo-1597854710119-dbb43d562f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1097&q=80'
  },
  {
    title: 'Salade de quinoa aux légumes frais',
    time: '20 min',
    category: 'Salades',
    level: 'Facile',
    imgUrl:
      'https://images.unsplash.com/photo-1581453883350-288b2c19bea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  },
  {
    title: 'Poulet au citron et romarin',
    time: '30 min',
    category: 'Plats principaux',
    level: 'Intermédiaire',
    imgUrl:
      'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=696&q=80'
  },
  {
    title: 'Smoothie aux baies',
    time: '10 min',
    category: 'Boissons',
    level: 'Facile',
    imgUrl:
      'https://images.unsplash.com/photo-1560607162-26b0344e6943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80'
  },
  {
    title: 'Tarte aux pommes maison',
    time: '1 h',
    category: 'Desserts',
    level: 'Avancé',
    imgUrl:
      'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  },
  {
    title: "Soupe aux légumes d'été",
    time: '40 min',
    category: 'Soupes',
    level: 'Facile',
    imgUrl:
      'https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    title: "Pâtes à l'ail et tomates séchées",
    time: '25 min',
    category: 'Plats principaux',
    level: 'Facile',
    imgUrl:
      'https://images.unsplash.com/photo-1425934398893-310a009a77f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
  },
  {
    title: 'Muffins aux myrtilles',
    time: '35 min',
    category: 'Desserts',
    level: 'Facile',
    imgUrl:
      'https://images.unsplash.com/photo-1623227866882-c005c26dfe41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80'
  },
  {
    title: 'Muffins aux myrtilles',
    time: '35 min',
    category: 'Desserts',
    level: 'Facile',
    imgUrl:
      'https://images.unsplash.com/photo-1614173417106-242690007604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  }
]
</script>

<template>
  <div class="ml-8 mb-4 flex">
    <div class="hidden lg:flex"><Breadcrumbs /></div>

    <div class="text-gray-400 hover:text-gray-500 flex lg:hidden">
      <button class="flex">
        <IconChevronLeft />
      </button>
    </div>
  </div>

  <div class="px-4 flex flex-col items-center">
    <h1 class="text-2xl font-bold text-center mb-8 text-gray-900">Soins cheveux</h1>
    <div class="flex space-x-3 mb-8">
      <span
        v-for="category in categories"
        class="bg-[#C7E8F1] inline-flex items-center text-center gap-x-1.5 rounded-full px-2 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
        >{{ category }}
      </span>
    </div>

    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 px-4 lg:w-3/5">
      <div v-for="recipe in recipes" class="mb-4 w-full">
        <a href="/category/recipe">
          <div class="relative flex w-full h-96 overflow-hidden lg:mb-8 rounded-xl">
            <span
              class="bg-white bg-opacity-80 absolute top-4 left-4 px-2 py-1 text-sm text-gray-600 rounded-tl-lg rounded-br-lg sm:top-2 xl:top-4 sm:left-2 xl:left-4"
            >
              {{ recipe.category }}
            </span>

            <img :src="recipe.imgUrl" class="w-full h-auto object-cover" />

            <div
              class="absolute right-0 left-0 bottom-4 px-4 mx-auto sm:px-2 lg:px-4 sm:bottom-2 lg:bottom-4"
            >
              <div class="p-4 w-full bg-white bg-opacity-80 rounded rounded-lg">
                <div class="flex flex-row items-center">
                  <p class="ml-2 text-sm">{{ recipe.level }} | {{ recipe.time }}</p>
                </div>
                <p class="mt-4 text-base text-gray-800 sm:mt-2 lg:mt-3 font-bold">
                  {{ recipe.title }}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </ul>

    <button
      type="button"
      class="md:px-14 md:py-3 w-auto rounded-xl bg-[#8CD4E0] px-3 py-2 text-md font-bold shadow-sm hover:bg-[#1AB2CC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Afficher plus de recettes
    </button>
  </div>
</template>
