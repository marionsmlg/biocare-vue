<script setup>
import BurgerIcon from './icons/IconBurger.vue'
import UserIcon from './icons/IconUser.vue'
</script>

<template>
  <nav class="flex justify-between items-center px-7 py-4">
    <div class="flex">
      <button class="mr-4">
        <BurgerIcon />
      </button>
    </div>

    <a href="/" aria-label="logoBiocare">
      <img
        src="@/assets/biocare-logo.png"
        class="logo_biocare"
        alt="logo biocare"
        width="109"
        height="158"
      />
    </a>
    <button>
      <UserIcon />
    </button>
  </nav>
</template>
