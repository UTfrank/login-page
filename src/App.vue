<template>
  <v-app>
    <!-- <ProductListView /> -->
    <RouterView></RouterView>
  </v-app>
</template>

<script>
/* eslint-disable */
import { RouterView } from 'vue-router';
import ProductListView from './views/ProductListView.vue';  

export default {
  name: 'App',

  components: {
    ProductListView,
    RouterView
},

  
};
</script>

<style>
.full-height {
  height: 90vh;
}
</style>