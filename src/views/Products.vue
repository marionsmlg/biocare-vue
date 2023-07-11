<template>
  <div>
    <h1>Liste des produits :</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    products.value = data.products
  } catch (error) {
    console.error(error)
  }
})
</script>
