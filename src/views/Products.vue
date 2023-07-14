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
import { ref } from 'vue'

const products = ref([])

async function fetchData() {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    products.value = data.products
  } catch (error) {
    console.error(error)
  }
}
fetchData()
</script>
