import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login.vue'
import ProductListView from '../views/ProductListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Login
  // },
  {
    path: '/',
    name: 'home',
    component: ProductListView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetailView
  },
  {
    // will match everything
    path: '*'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
