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
      component: () => import('../views/Recipe.vue')
    },
    {
      path: '/recipe/:category',
      name: 'category',
      component: () => import('../views/DisplayRecipes.vue')
    },
    {
      path: '/recipe-by-problem',
      name: 'recipe-by-problem',
      component: () => import('../views/DisplayRecipesByProblem.vue')
    },
    {
      path: '/personal-space',
      name: 'personal-space',
      component: () => import('../views/PersonalSpace.vue')
    },
    {
      path: '/logout',
      redirect: '/'
    },
    {
      path: '/user-settings',
      name: 'user-settings',
      component: () => import('../views/UserSettings.vue')
    },
    {
      path: '/beauty-profile-update',
      name: 'beauty-profile-update',
      component: () => import('../views/UpdateBeautyProfile.vue')
    }
  ]
})

export default router

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (About.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import('../views/AboutView.vue')
// }
