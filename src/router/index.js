import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUp from '../views/SignUp.vue'
import QuizView from '../views/QuizView2.vue'
import Recipe from '../views/Recipe.vue'
import DisplayRecipes from '../views/DisplayRecipes.vue'
import DisplayRecipesByProblem from '../views/DisplayRecipesByProblem.vue'
import PersonalSpace from '../views/PersonalSpace.vue'
import UserSettings from '@/views/UserSettings.vue'
import NotFound from '@/views/NotFound.vue'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/firebaseconfig.js'

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
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/sign-up', name: 'sign-up', component: () => import('../views/SignUp.vue') },
    { path: '/quiz', name: 'quiz', component: () => import('../views/QuizView2.vue') },
    {
      path: '/recipe/:category/:id',
      name: 'recipe',
      component: () => import('../views/Recipe.vue'),
      meta: { requiresQuizOrAuthOrQuickResearch: true }
    },
    {
      path: '/recipe/:category',
      name: 'category',
      component: () => import('../views/DisplayRecipes.vue'),
      meta: { requiresQuizOrAuth: true }
    },
    {
      path: '/recipe-by-problem',
      name: 'recipe-by-problem',
      component: () => import('../views/DisplayRecipesByProblem.vue'),
      meta: { requiresQuickResearchData: true }
    },
    {
      path: '/personal-space',
      name: 'personal-space',
      component: () => import('../views/PersonalSpace.vue'),
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
      path: '/beauty-profile-update',
      name: 'beauty-profile-update',
      component: () => import('../views/UpdateBeautyProfile.vue'),
      meta: { requiresAuth: true }
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

function beautyProfileCompleted(user) {
  const strOfHairProblemId = localStorage.getItem('hairProblem')
  const strOfSkinProblemId = localStorage.getItem('skinProblem')
  const skinTypeId = localStorage.getItem('skinType')
  const hairTypeId = localStorage.getItem('hairType')
  const quizCompleted = strOfHairProblemId && strOfSkinProblemId && skinTypeId && hairTypeId
  return quizCompleted || user
}

/////personal-space si user exists

function dataSelected(user) {
  return categoryAndProblemSelected() || beautyProfileCompleted(user)
}

async function checkUserAuthentication() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe() // Arrête d'écouter après la première notification
      if (user) {
        resolve(user)
      } else {
        resolve(null)
      }
    })
  })
}

router.beforeEach(async (to, from, next) => {
  const user = await checkUserAuthentication()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresQuizOrAuth = to.matched.some((record) => record.meta.requiresQuizOrAuth)
  const requiresQuickResearchData = to.matched.some(
    (record) => record.meta.requiresQuickResearchData
  )
  const requiresQuizOrAuthOrQuickResearch = to.matched.some(
    (record) => record.meta.requiresQuizOrAuthOrQuickResearch
  )
  const currentPath = from.path
  if (requiresAuth && !user) {
    next('login')
  } else if (requiresQuizOrAuth && !beautyProfileCompleted(user)) {
    next(currentPath)
  } else if (requiresQuickResearchData && !categoryAndProblemSelected()) {
    next(currentPath)
  } else if (requiresQuizOrAuthOrQuickResearch && !dataSelected(user)) {
    next(currentPath)
  } else {
    next()
  }
})

export default router
