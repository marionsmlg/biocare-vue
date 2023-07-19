<script setup>
import CompositionCosmetics from '../assets/composition-cosmetics.svg'
import UniqueProducts from '../assets/unique-products.svg'
import SaveMoney from '../assets/save-money.svg'
import IconClick from '../components/icons/IconClick.vue'
import ButtonPrimary from '../components/buttons/ButtonPrimary.vue'
import ListBox from '../components/buttons/ListBox.vue'
import { RouterLink } from 'vue-router'
import IconPeople from '../components/icons/IconPeople.vue'
import IconMolecule from '../components/icons/IconMolecule.vue'
import MainSvg from '../assets/femme-qui-sinterroge.svg'

const argumentsList = [
  {
    title: 'Evitez les ingrédients nocifs, priviligiez le fait maison',
    img: CompositionCosmetics,
    content:
      'Ayez un contrôle total sur les ingrédients utilisés, optant ainsi pour des ingrédients naturels, biologiques et adaptés à votre type de peau.'
  },
  {
    title: 'Créez des produits uniques !',
    img: UniqueProducts,
    content:
      "Grâce à notre questionnaire, nous sélectionnons des recettes de cosmétiques qui répondent à vos besoins spécifiques afin d'obtenir des produits uniques qui vous conviennent parfaitement."
  },
  {
    title: 'Economisez sur le long terme',
    img: SaveMoney,
    content:
      "Grâce à nos recettes à base d'ingrédients abordables, vous pouvez obtenir des résultats similaires à ceux des produits cosmétiques commerciaux, tout en réalisant des économies significatives."
  }
]

const bodyPart = [
  {
    name: 'Peau',
    problems: [
      'Acné',
      'Sensibilité cutanée',
      'Rougeurs',
      'Relâchement cutané',
      'Aucun problème particulier'
    ]
  },
  {
    name: 'Cheveux',
    problems: [
      'Acné',
      'Sensibilité cutanée',
      'Rougeurs',
      'Relâchement cutané',
      'Aucun problème particulier'
    ]
  }
]
</script>

<template>
  <section class="my-4">
    <div class="text-center flex flex-col">
      <div class="px-6 lg:absolute lg:w-1/2">
        <h1 class="text-[#605E5E] text-xl font-medium mb-3 md:text-2xl lg:text-4xl">
          Vous cherchez une recette cosmétique adaptée à <span class="text-[#62D0E3]">vous</span> ?
        </h1>
        <h2 class="text-[#605E5E] md:text-xl lg:text-2xl lg:mb-12">
          BioCare sélectionne des recettes de cosmétiques DIY qui vous ressemble !
        </h2>
      </div>

      <img :src="MainSvg" alt="Main SVG" class="mb-4" />

      <div class="lg:absolute top-96 start-40">
        <RouterLink to="/quiz"
          ><ButtonPrimary>Je cherche les recette qui me ressemble !</ButtonPrimary></RouterLink
        >
      </div>
    </div>
  </section>

  <section class="bg-[#FBDFDB] py-10 px-20 md:rounded-xl md:mx-20">
    <div class="flex justify-center lg:justify-start">
      <h2 class="font-bold mb-6 mr-2 text-center md:text-left lg:text-xl">
        Trouver ma recette en 2 clics
      </h2>
      <IconClick />
    </div>

    <div
      class="flex flex-col items-center text-center lg:flex-row md:justify-between lg:justify-start"
    >
      <div class="mb-3 lg:mr-8">
        <ListBox />
      </div>

      <div class="mb-3 lg:mr-8">
        <ListBox />
      </div>
      <div class="mb-3">
        <button
          type="button"
          class="md:px-14 md:py-3 w-full rounded-xl bg-[#F3B8B4] px-3 py-2 text-md font-bold shadow-sm hover:bg-[#F19B95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <RouterLink to="/category">Trouver ma recette</RouterLink>
        </button>
      </div>
    </div>
  </section>
  <div class="py-8 bg-gradient-to-b from-[#FBDFDB] to-[#C7E8F1] md:hidden"></div>

  <section class="md:my-8 md:mx-20">
    <div
      class="text-center bg-[#C7E8F1] md:mb-6 py-12 px-10 md:rounded-xl flex flex-col md:flex-row items-center"
    >
      <div class="flex w-2/5 justify-center"><IconMolecule /></div>
      <div class="md:w-4/5">
        <h2 class="font-semibold mb-4 lg:text-xl">Une composition douteuse ?</h2>
        <p class="lg:text-lg">
          De nombreux produits cosmétiques contiennent des ingrédients potentiellement nocifs tels
          que les parabènes, sulfates et phtalates, pouvant être irritants pour la peau et avoir des
          effets néfastes à long terme.
        </p>
      </div>
    </div>
    <div class="py-8 bg-gradient-to-b from-[#C7E8F1] to-white md:hidden"></div>
    <div
      class="text-center py-12 px-10 md:rounded-xl md:border flex flex-col md:flex-row items-center"
    >
      <div class="flex w-2/5 justify-center"><IconPeople /></div>
      <div class="md:w-4/5">
        <h2 class="font-semibold mb-4 lg:text-xl">Des produits trop génériques ?</h2>
        <p class="lg:text-lg">
          Les cosmétiques commerciaux ne sont pas adaptés à vos besoins individuels, car ils sont
          fabriqués en masse pour répondre à une grande variété de consommateurs.
        </p>
      </div>
    </div>
  </section>

  <div class="bg-[#FBDFDB] py-6 px-6 text-center">
    <h1 class="text-xl font-semibold md:text-2xl lg:text-3xl">
      BioCare vous recommande des recettes de cosmétiques qui vous ressemble !
    </h1>
  </div>

  <ul class="mx-8 pb-8 border border-transparent border-b-[#949494] md:mx-20">
    <li
      v-for="(argument, index) in argumentsList"
      class="flex flex-col items-center md:flex-row my-8"
    >
      <div
        :class="
          index === 1
            ? 'order-none md:order-1 md:w-2/4 flex md:justify-center md:ml-8'
            : 'order-none md:w-2/4 flex md:justify-center'
        "
      >
        <img
          :src="argument.img"
          alt=""
          :class="[index === 1 ? 'md:w-72 w-60' : '', index === 2 ? 'md:w-56 w-40' : '']"
        />
      </div>
      <div class="text-center md:w-2/4 md:ml-8">
        <h2 class="font-semibold mb-4 mt-4 lg:text-2xl">
          {{ argument.title }}
        </h2>
        <p class="text-sm lg:text-lg">
          {{ argument.content }}
        </p>
      </div>
    </li>
  </ul>

  <div class="my-4 flex justify-center">
    <div class="absolute flex flex-col items-center">
      <h1
        class="text-center text-[#605E5E] font-semibold mx-4 mt- md:mt-10 md:text-xl lg:text-2xl pb-20"
      >
        Pour plus de personnalisation, créez votre profil beauté et obtenez une sélection de
        recettes adaptées à vous !
      </h1>
      <div>
        <RouterLink to="/category/recipe"
          ><ButtonPrimary>Je cherche les recette qui me ressemble !</ButtonPrimary></RouterLink
        >
      </div>
    </div>

    <div class="flex inline-block w-full md:justify-center mt-12">
      <img src="@/assets/products.svg" alt="Votre image" class="flex w-full md:max-w-xl" />
    </div>
  </div>
</template>
