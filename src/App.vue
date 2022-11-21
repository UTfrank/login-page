<template>
  <v-app>
    <ProductListView />
  </v-app>
</template>

<script>
/* eslint-disable */
import ProductListView from './views/ProductListView.vue';

export default {
  name: 'App',

  components: {
    ProductListView
},

  
};
</script>

<style>
.full-height {
  height: 90vh;
}
</style>