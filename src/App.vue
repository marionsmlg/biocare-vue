<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Layout from './components/Layout.vue'
import BiocareFooter from './components/Footer.vue'
</script>

<template>
  <header>
    <Layout />
  </header>
  <section class="my-4">
    <div class="text-center">
      <div class="md:absolute md:pl-4">
        <h1 class="text-[#918F9E] text-xl font-medium mb-3 md:text-2xl lg:text-4xl">
          Vous cherchez une recette cosmétique adaptée à <span class="text-[#62D0E3]">vous</span> ?
        </h1>
        <h2 class="text-[#918F9E] md:text-xl lg:text-2xl">
          BioCare selectionne des recettes de cosmetiques DIY qui vous ressemble !
        </h2>
      </div>

      <img src="@/assets/femme-qui-sinterroge.png" class="w-full mb-4 mt-4" alt="" />
      <button
        type="button"
        class="rounded-xl bg-[#6ECDDF] px-3 py-2 text-sm font-semibold shadow-sm hover:bg-[#C7E8F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Je cherche les recettes qui me ressemble !
      </button>
    </div>
  </section>

  <section class="bg-[#FBDFDB] py-6 px-20 md:rounded-xl md:mx-4">
    <div class="flex flex-col text-center">
      <h2 class="font-semibold mb-4">Trouver ma recette en 2 clics !</h2>
      <button
        type="button"
        class="mb-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-[#C7E8F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Partie du corps
      </button>
      <!-- <button
        type="button"
        class="mb-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-[#C7E8F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Type de probleme
      </button> -->
      <button
        type="button"
        class="rounded-xl bg-[#F3B8B4] px-3 py-2 text-sm font-semibold shadow-sm hover:bg-[#C7E8F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Trouver ma recette
      </button>
    </div>
  </section>

  <section class="md:flex md:my-4 md:mx-4">
    <div class="text-center bg-[#C7E8F1] py-6 px-10 md:w-2/4 md:rounded-xl md:mr-4">
      <h2 class="font-semibold mb-4">Une composition douteuse ?</h2>
      <p>
        De nombreux produits cosmétiques contiennent des ingrédients potentiellement nocifs tels que
        les parabènes, sulfates et phtalates, pouvant être irritants pour la peau et avoir des
        effets néfastes à long terme.
      </p>
    </div>
    <div class="text-center py-6 px-10 md:w-2/4 md:rounded-xl md:border">
      <h2 class="font-semibold mb-4">Des produits trop generiques ?</h2>
      <p>
        Les cosmétiques commerciaux ne sont pas adaptés à vos besoins individuels, car ils sont
        fabriqués en masse pour répondre à une grande variété de consommateurs.
      </p>
    </div>
  </section>

  <div class="bg-[#FBDFDB] py-6 px-6 text-center">
    <h1 class="text-xl font-semibold">
      BioCare vous recommande des recettes de cosmetiques qui vous ressemble !
    </h1>
  </div>

  <section class="mx-8 pb-8 border border-transparent border-b-[#949494]">
    <div div class="flex flex-col items-center md:flex-row">
      <img src="@/assets/composition-cosmetics.jpg" class="w-full mb-4 mt-4 md:w-2/4" alt="" />
      <div class="text-center md:w-2/4">
        <h2 class="font-semibold mb-4 lg:text-xl">
          Evitez les ingredients nocifs, priviligiez le fait maison
        </h2>
        <p class="text-sm lg:text-base">
          Ayez un contrôle total sur les ingrédients utilisés, optant ainsi pour des ingrédients
          naturels, biologiques et adaptés à votre type de peau.
        </p>
      </div>
    </div>

    <div class="flex flex-col items-center md:flex-row md:justify-between">
      <div class="mb-4 mt-4 order-none md:order-1 md:w-2/4 flex md:justify-center">
        <img src="@/assets/unique-products.png" class="md:w-80" alt="" width="153" height="153" />
      </div>

      <div class="text-center md:w-2/4">
        <h2 class="font-semibold mb-4 lg:text-xl">Creez des produits uniques !</h2>
        <p class="text-sm lg:text-base">
          Grace a notre questionnaire, nous selectionnons des recettes de cosmetiques qui repondent
          a vos besoins specifiques afin d’obtenir des produits uniques qui vous conviennent
          parfaitement.
        </p>
      </div>
    </div>

    <div class="flex flex-col items-center md:flex-row">
      <div class="mb-4 mt-4 md:w-2/4 flex md:justify-center">
        <img src="@/assets/save-money.png" class="md:w-60" alt="" width="111" height="111" />
      </div>

      <div class="text-center md:w-2/4">
        <h2 class="font-semibold mb-4 lg:text-xl">Economisez sur le long terme</h2>
        <p class="text-sm lg:text-base">
          Grâce à nos recettes à base d'ingrédients abordables, vous pouvez obtenir des résultats
          similaires à ceux des produits cosmétiques commerciaux, tout en réalisant des économies
          significatives.
        </p>
      </div>
    </div>
  </section>

  <div class="my-4">
    <h1 class="text-center mx-4">
      Pour plus de personnalisation, creez votre profil beaute et obtenez une selection de recettes
      adaptees a vous !
    </h1>

    <div class="relative inline-block w-full">
      <img src="@/assets/products.png" alt="Votre image" class="w-full opacity-50" />
      <button
        type="button"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#6ECDDF] px-3 py-2 text-sm font-semibold shadow-sm hover:bg-[#C7E8F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-3/4"
      >
        Je cherche les recettes qui me ressemble !
      </button>
    </div>
  </div>
  <BiocareFooter />

  <!-- <RouterView /> -->
</template>
