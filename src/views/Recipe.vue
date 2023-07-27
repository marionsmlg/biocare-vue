<script setup>
import { ref } from 'vue'
import {
  BeakerIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  InformationCircleIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import IconConservation from '../components/icons/Recipe/IconConservation.vue'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const recipes = [
  {
    title: 'Elixir de soin pointes sèches et abimées à la Grenade Bio',
    benefits: ["Révélateur d'éclat", 'Hydratant - Nourrissant', 'Protecteur'],
    hairType: 'Tous types',
    level: 'Facile',
    time: '5 min',
    quantity: '50 g',
    imgUrl:
      'https://images.unsplash.com/photo-1597854710119-dbb43d562f78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1097&q=80',
    use: 'Appliquez une noisette sur pointes sèches ou mouillées.',
    precautions:
      "Faites toujours un test de votre préparation dans le pli du coude 24h avant utilisation afin de vous assurer que vous ne faites aucune réaction. Dans le cas contraire, n'utilisez pas la préparation. Tenir hors de portée des enfants.",
    allergens: 'Limonene, Linalool',
    conservationTime: '3 mois',
    conservation:
      "Environ 3 mois (en ayant respecté les règles d'hygiène et stocké le produit à l'abri de la lumière, de la chaleur et de l'air).",
    steps: [
      'Dans un bol, ajoutez tous les ingrédients un à un, en prenant soin de bien mélanger entre chaque ajout.',
      "Mélangez le tout à l'aide du mini-fouet.",
      "Transvasez la préparation dans le contenant, étiquetez, c'est prêt !"
    ],
    ingredients: [
      {
        name: 'Huile végétale de grenade BIO',
        quantity: '27mL',
        description:
          'Connues pour ses propriétés anti-oxydantes, régénérantes, elle redonne éclat et hydrate les cheveux.',
        imgUrl:
          'https://www.jaimefruitsetlegumes.ca/wp-content/uploads/2019/09/grenade-scaled-e1643120930744.jpg'
      },
      {
        name: 'Huile végétale de Jojoba BIO',
        quantity: '20mL',
        description:
          'Réputée pour ses propriétés sébo-régulatrices, hydratantes, assouplissantes et régénérantes sans graisser.',
        imgUrl:
          'https://t3.ftcdn.net/jpg/04/59/82/42/360_F_459824261_02e8jwgYCvQhKxWXvqL1Od6hGtkYITPR.jpg'
      },
      {
        name: 'Huile végétale Argan BIO',
        quantity: '8mL',
        description: 'Connue pour ses propriétés réparatrices, antioxydantes et protectrices.',
        imgUrl:
          'https://media.istockphoto.com/id/1177329454/fr/photo/huile-dargan.jpg?s=612x612&w=0&k=20&c=MReCt3tXRWebEvos3W6gIrV6jjTZn52VX3XAZR1ms-k='
      },
      {
        name: 'Fragrance Monoï',
        quantity: '17 gouttes',
        description: "Réputée pour son parfum sensuel rappelant l'été.",
        imgUrl:
          'https://i.pinimg.com/736x/e8/7e/19/e87e1966bf98a7bd6602bccc6bc4e78f--monoi-homemade-cosmetics.jpg'
      }
    ]
  }
]

// const data = ref(recipes[0])
</script>

<template>
  <div class="ml-8 mb-4 flex mt-12">
    <div class="hidden lg:flex"><Breadcrumbs /></div>

    <div class="text-gray-400 hover:text-gray-500 flex lg:hidden">
      <button class="flex">
        <ChevronLeftIcon />
      </button>
    </div>
  </div>

  <div v-for="recipe in recipes" class="flex flex-col">
    <div class="px-4 flex flex-col items-center">
      <h1 class="text-2xl font-bold text-center mb-8 text-gray-900">
        {{ recipe.title }}
      </h1>
      <div class="flex space-x-3 mb-8">
        <span
          v-for="benefit in recipe.benefits"
          class="bg-[#FBDFDB] inline-flex items-center text-center gap-x-1.5 rounded-full px-2 py-1 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
        >
          {{ benefit }}
        </span>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="flex w-full lg:w-4/5 h-96 overflow-hidden lg:mb-8">
        <img :src="recipe.imgUrl" class="w-full h-auto object-cover lg:rounded-xl" />
      </div>
      <div class="bg-[#FBDFDB] lg:w-4/5 lg:rounded-xl w-full px-4 py-6">
        <div class="flex items-center justify-center">
          <div class="flex flex-col items-center px-8">
            <ClockIcon class="w-8 h-8" />
            <p class="font-semibold mt-2">{{ recipe.time }}</p>
          </div>
          <div class="flex flex-col items-center px-8">
            <ChartBarIcon class="w-8 h-8" />
            <p class="font-semibold mt-2">{{ recipe.level }}</p>
          </div>
          <div class="flex flex-col items-center px-8">
            <IconConservation />
            <p class="font-semibold mt-2">{{ recipe.conservationTime }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-end px-4 py-4 lg:w-4/5 text-gray-600">
        <p class="truncate text-sm mr-2">Pour {{ recipe.quantity }}</p>
        <div><BeakerIcon class="w-6 h-6" /></div>
      </div>
    </div>

    <div class="px-4 py-8 w-full">
      <div class="flex flex-col items-center mb-12 w-full">
        <h2 class="text-2xl font-semibold mb-4">Ingrédients</h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full lg:w-7/12">
          <div
            v-for="ingredient in recipe.ingredients"
            class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
          >
            <img
              class="mx-auto h-14 w-14 flex-shrink-0 rounded-full object-cover"
              :src="ingredient.imgUrl"
              alt=""
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-center">
                <p class="text-sm font-medium text-gray-900">
                  {{ ingredient.name }}
                </p>

                <div class="inline-flex rounded-md shadow-sm">
                  <Menu as="div" class="relative -ml-px block">
                    <MenuButton
                      class="relative inline-flex items-center rounded-full bg-white px-2 py-2 text-gray-500 hover:text-gray-700 focus:z-10"
                    >
                      <span class="sr-only">Open options</span>
                      <InformationCircleIcon class="h-5 w-5" aria-hidden="true" />
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
              </div>

              <p class="truncate text-sm text-gray-500">{{ ingredient.quantity }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center mb-12 w-full">
        <h2 class="text-2xl font-semibold mb-4">Recette</h2>

        <div class="flex flex-col border rounded-xl px-8 py-2 lg:w-7/12">
          <div v-for="(step, index) in recipe.steps" class="py-8 border-b last:border-none">
            <p class="font-semibold text-gray-900">Étape {{ index + 1 }}</p>
            <p class="text-gray-500">{{ step }}</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center w-full">
        <h2 class="text-2xl font-semibold mb-4">Mode d'emploi</h2>

        <div class="flex flex-col border rounded-xl px-8 pt-4 pb-8 w-full lg:w-7/12">
          <div class="py-8 border-b">
            <p>{{ recipe.use }}</p>
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
                {{ recipe.precautions }}
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
                {{ recipe.allergens }}
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
                {{ recipe.conservation }}
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      </div>
    </div>

    <!-- <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4"
    >
      <li
        v-for="ingredient in recipe.ingredients"
        class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      >
        <div class="flex flex-1 flex-col p-8">
          <img
            class="mx-auto h-32 w-32 flex-shrink-0 rounded-full object-cover"
            :src="ingredient.imgUrl"
            alt=""
          />
          <h3 class="mt-6 text-sm font-medium text-gray-900">{{ ingredient.name }}</h3>
          <div class="mt-1 flex flex-grow flex-col justify-between">
            <p class="text-sm text-gray-500">{{ ingredient.description }}</p>
          </div>
        </div>
        <div></div>
      </li>
    </ul> -->
  </div>
</template>
