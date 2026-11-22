import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import About from '../pages/About.vue'
import Profile from '../pages/Profile.vue'
import Setting from '../pages/Setting.vue'

const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/products', name: 'products', component: Products},
  {path: '/about', name: 'about', component: About},
  {path: '/profile', name: 'profile', component: Profile},
  {path: '/setting', name: 'setting', component: Setting},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router