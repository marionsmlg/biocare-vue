<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { ClockIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'
import HairIcon from '@/components/icons/RecipeCategories/Hair.vue'
import BodyIcon from '@/components/icons/RecipeCategories/Body.vue'
import FaceIcon from '@/components/icons/RecipeCategories/Face.vue'
const categories = [
  {
    name: 'Elixir de soin pointes sèches et abimées à la Grenade Bio',
    href: '/category/recipe',
    imageSrc:
      'https://images.unsplash.com/photo-1597854710119-dbb43d562f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1097&q=80'
  },
  {
    name: 'Sérum Réparateur de Pointes Phytokératine et Acide Hyaluronique',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1581453883350-288b2c19bea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Spray Racines Tonifiant au Thé Vert & Pamplemousse BIO',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=696&q=80'
  },
  {
    name: 'Shampoing Fortifiant Anti-Chute à l’Ylang Ylang Bio',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1560607162-26b0344e6943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Shampoing anti chute gingembre & pamplemousse',
    href: '#',
    imageSrc:
      'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  }
]
</script>

<template>
  <div class="bg-white mt-8">
    <div class="px-4 py-4 xl:px-44">
      <h1 class="text-xl font-semibold mb-4 lg:text-2xl text-gray-700">
        Voici les recettes pour vous !
      </h1>

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

    <div class="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 class="text-base font-bold tracking-tight text-gray-900 flex">
          Soins cheveux<HairIcon class="w-4 ml-3" />
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

    <!-- ////////////////////////////////// -->

    <div class="pb-12 sm:pb-24 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 class="text-base font-bold tracking-tight text-gray-900 flex">
          Soins visage<FaceIcon class="w-10 h-10 ml-3" />
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

    <!-- ////////////////////////////////// -->

    <div class="xl:mx-auto xl:max-w-7xl xl:px-8">
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
</template>
