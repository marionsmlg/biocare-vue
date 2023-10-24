<script setup>
import Layout from './components/Layout.vue'
import BiocareFooter from './components/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <Layout />
  </header>

  <RouterView />
  <BiocareFooter />
</template>
