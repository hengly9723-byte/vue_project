import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import AI_Plans from '../pages/AI_Plans.vue'
import My_Orders from '../pages/My_Orders.vue'
import HelpWarranty from '../pages/HelpWarranty.vue'
import SignIn from '../pages/SignIn.vue'
import SignUp from '../pages/SignUp.vue'
import { useAuth } from '../composables/useAuth.js'

const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/AI_Plans', name: 'AI Plans', component: AI_Plans},
  {path: '/My_Orders', name: 'My Orders', component: My_Orders, meta: { requiresAuth: true }},
  {path: '/HelpWarranty', name: 'Help & Warranty', component: HelpWarranty, meta: { requiresAuth: true }},
  {path: '/signin', name: 'signin', component: SignIn, meta: { guest: true }},
  {path: '/signup', name: 'signup', component: SignUp, meta: { guest: true }},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Runs before every page change
router.beforeEach(async (to) => {
  const { user, loadUser } = useAuth()
  await loadUser()                                    // ask the server who we are (once)

  // private page + not signed in -> sign in, then come back here
  if (to.meta.requiresAuth && !user.value) {
    return { path: '/signin', query: { redirect: to.fullPath } }
  }
  // already signed in -> no need to see the sign in / sign up forms
  if (to.meta.guest && user.value) return '/'
})

export default router