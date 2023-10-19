import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUp from '../views/SignUp.vue'
import BeautyProfile from '../views/BeautyProfile.vue'
import Recipe from '../views/Recipe.vue'
import DisplayRecipes from '../views/DisplayRecipes.vue'
import DisplayRecipesByProblem from '../views/DisplayRecipesByProblem.vue'
import MyRecipes from '../views/MyRecipes.vue'
import UserSettings from '@/views/UserSettings.vue'
import NotFound from '@/views/NotFound.vue'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/firebaseconfig.js'
import { userHasBeautyProfile } from '@/utils.js'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresNotAuth: true }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => SignUp,
      meta: { requiresNotAuth: true }
    },
    {
      path: '/profil-beaute',
      name: 'profil-beaute',
      component: () => import('../views/BeautyProfile.vue'),
      meta: { requiresQuizNotCompleted: true }
    },
    {
      path: '/recettes/:category/:slug',
      name: 'recipe',
      component: () => import('../views/Recipe.vue')
    },
    {
      path: '/mes-recettes/:category',
      name: 'category',
      component: () => import('../views/DisplayRecipes.vue'),
      meta: { requiresQuizOrAuth: true }
    },
    {
      path: '/recettes/:category',
      name: 'recipe-by-problem',
      component: () => import('../views/DisplayRecipesByProblem.vue'),
      meta: { requiresQuickResearchData: true }
    },
    {
      path: '/mes-recettes',
      name: 'my-recipes',
      component: MyRecipes,
      meta: { requiresQuizOrAuth: true }
    },
    {
      path: '/logout',
      redirect: '/',
      meta: { requiresAuth: true }
    },
    {
      path: '/user-settings',
      name: 'user-settings',
      component: () => import('../views/UserSettings.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mon-profil-beaute',
      name: 'mon-profil-beaute',
      component: () => import('../views/UpdateBeautyProfile.vue'),
      meta: { requiresAuth: true, requiresBeautyProfile: true }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

const auth = getAuth(firebaseApp)

function categoryAndProblemSelected() {
  const category = localStorage.getItem('category')
  const problem = localStorage.getItem('problem')
  return category && problem
}

function beautyProfileCompleted(user, hasBeautyProfile) {
  const strOfHairProblemId = localStorage.getItem('hairProblem')
  const strOfSkinProblemId = localStorage.getItem('skinProblem')
  const skinTypeId = localStorage.getItem('skinType')
  const hairTypeId = localStorage.getItem('hairType')
  const quizCompleted = strOfHairProblemId && strOfSkinProblemId && skinTypeId && hairTypeId
  return quizCompleted || (user && hasBeautyProfile)
}

function dataSelected(user, hasBeautyProfile) {
  return categoryAndProblemSelected() || beautyProfileCompleted(user, hasBeautyProfile)
}

async function checkUserAuthentication() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe() // Arrête d'écouter après la première notification
      if (user) {
        resolve(user.uid)
      } else {
        resolve(null)
      }
    })
  })
}

router.beforeEach(async (to, from, next) => {
  const user = await checkUserAuthentication()
  const hasBeautyProfile = await userHasBeautyProfile(user)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresQuizOrAuth = to.matched.some((record) => record.meta.requiresQuizOrAuth)
  const requiresQuickResearchData = to.matched.some(
    (record) => record.meta.requiresQuickResearchData
  )
  const requiresQuizOrAuthOrQuickResearch = to.matched.some(
    (record) => record.meta.requiresQuizOrAuthOrQuickResearch
  )
  const requiresBeautyProfile = to.matched.some((record) => record.meta.requiresBeautyProfile)
  const requiresNotAuth = to.matched.some((record) => record.meta.requiresNotAuth)
  const requiresQuizNotCompleted = to.matched.some((record) => record.meta.requiresQuizNotCompleted)

  const currentPath = from.path
  if (requiresAuth && !user) {
    next('login')
  } else if (requiresQuizOrAuth && !beautyProfileCompleted(user, hasBeautyProfile)) {
    next('/profil-beaute')
  } else if (requiresQuickResearchData && !categoryAndProblemSelected()) {
    next(currentPath)
  } else if (requiresQuizOrAuthOrQuickResearch && !dataSelected(user, hasBeautyProfile)) {
    next(currentPath)
  } else if (requiresBeautyProfile && !hasBeautyProfile) {
    next('/profil-beaute')
  } else if (requiresNotAuth && user) {
    next('/mes-recettes')
  } else if (requiresQuizNotCompleted && beautyProfileCompleted(user, hasBeautyProfile)) {
    next('/mes-recettes')
  } else {
    next()
  }
})

export default router
