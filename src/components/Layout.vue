<script setup>
import { UserIcon } from '@heroicons/vue/20/solid'
import { RouterLink } from 'vue-router'
import logoBiocare from '@/assets/biocare-logo.svg'
</script>

<template>
  <nav>
    <div class="flex justify-between items-center px-7 py-4 mb-12 shadow-md">
      <div class="w-28">
        <RouterLink to="/"><img :src="logoBiocare" alt="logoBiocare" /></RouterLink>
      </div>

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
