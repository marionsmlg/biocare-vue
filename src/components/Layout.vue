<script setup>
import BurgerIcon from './icons/IconBurger.vue'
import UserIcon from './icons/IconUser.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <div class="flex justify-between items-center px-7 py-4 mb-12 shadow-md">
      <a href="/" aria-label="logoBiocare" class="mr-40">
        <img
          src="@/assets/biocare-logo.png"
          class="lg:w-32 min-w-28 max-w-28 min-h-28"
          alt="logo biocare"
          width="109"
          height="158"
        />
      </a>
      <div class="hidden lg:flex md:text-left">
        <RouterLink to="/login" class="px-10">Se connecter</RouterLink>
        <RouterLink to="/sign-up" class="font-bold">S'inscrire</RouterLink>
      </div>

      <button class="lg:hidden">
        <UserIcon />
      </button>
    </div>
  </nav>
</template>
