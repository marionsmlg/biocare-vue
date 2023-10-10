<script setup>
import {
  UserIcon,
  IdentificationIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
import { RouterLink, useRouter } from 'vue-router'
import PurecareLogo from '@/components/PurecareLogo.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseApp } from '@/firebaseconfig.js'
import { ref, computed } from 'vue'

const auth = getAuth(firebaseApp)

const isUserLoggedIn = ref(false)

onAuthStateChanged(auth, (user) => {
  if (user) {
    isUserLoggedIn.value = true
  } else {
    isUserLoggedIn.value = false
  }
})

const router = useRouter()

function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log('je suis deconnecte !')
      router.push('/logout')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <nav>
    <div class="flex justify-between items-center px-7 py-4 shadow-md">
      <div class="w-40 md:w-56">
        <RouterLink to="/"><PurecareLogo /></RouterLink>
      </div>

      <!-- <div class="hidden lg:flex md:text-left text-gray-700">
        <RouterLink to="/login" class="px-10">Se connecter</RouterLink>
        <RouterLink to="/sign-up" class="font-bold">S'inscrire</RouterLink>
      </div> -->

      <!-- //////////////////////////// -->

      <div v-if="isUserLoggedIn" class="w-56 text-right">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center rounded-md text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <UserIcon class="w-5" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <RouterLink
                    to="/personal-space"
                    :class="[
                      active ? 'bg-[#C7E8F1]' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    <UserIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-[#0C8294]"
                      aria-hidden="true"
                    />
                    Mes recettes
                  </RouterLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <RouterLink
                    to="/user-settings"
                    :class="[
                      active ? 'bg-[#C7E8F1]' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    <IdentificationIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-[#0C8294]"
                      aria-hidden="true"
                    />
                    Mes informations
                  </RouterLink>
                </MenuItem>
              </div>
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="signOutUser"
                    :class="[
                      active ? 'bg-[#C7E8F1]' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    <ArrowRightOnRectangleIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-[#0C8294]"
                      aria-hidden="true"
                    />
                    Se déconnecter
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>

      <!-- /////////////////////////////// -->

      <div v-else class="w-56 text-right">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center rounded-md text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <UserIcon class="w-5" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <RouterLink
                    to="/login"
                    :class="[
                      active ? 'bg-[#C7E8F1]' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    <ArrowLeftOnRectangleIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-[#0C8294]"
                      aria-hidden="true"
                    />
                    Se connecter
                  </RouterLink>
                </MenuItem>
              </div>
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <RouterLink
                    to="/sign-up"
                    :class="[
                      active ? 'bg-[#C7E8F1]' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    <PencilSquareIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-[#0C8294]"
                      aria-hidden="true"
                    />
                    S'inscrire
                  </RouterLink>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </nav>
</template>
