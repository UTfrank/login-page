<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar color="transparent" flat>
        <v-toolbar-title class="text-white">User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-form ref="form" class="mt-6">

          <v-form @submit.prevent="handleSearch">
            <v-col cols="12" class="d-flex align-center pa-0 h-auto">

              <v-text-field
              label="Search"
              clearable
              color="white"
              v-model="search"
              append-outer-icon="mdi-magnify"
              @click:append-outer="handleSearch"
              ></v-text-field>
              
            </v-col>
          </v-form>

        </v-form>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-app-bar>
    <v-main class="full-height d-flex mt-4">
      <v-sheet
        color="light"
        class="pa-3"
        v-if="loading"
      >
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </v-sheet>
      
      <v-row justify="center" class="ma-0">
        <v-col md="3" sm="6" xs="10" v-for="product in products"
        v-bind:key="product.id">
          <router-link :to="`/product/${product.id}`">
            <v-card
              class="mx-auto my-12"
              max-width="374"
              >
              <!-- @click="gotoPath(`${product.id}`)" -->
              <v-img
                height="200"
                :src="product.image"
                alt="picture"
              ></v-img>
          
              <v-card-title>{{product.name}}</v-card-title>
          
              <v-card-text>
                <div>{{product.type}}</div>
          
                <div class="text-subtitle-1">
                  $ {{product.price}}
                </div>
              </v-card-text>
            
            </v-card>
          </router-link>
            </v-col>
        <v-col md="4" sm="6" xs="10" v-if="!products.length && loading === false">
          <v-card
            class="mx-auto my-12"
            max-width="374"
          >
            <v-card-title>No products found</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductListView',


  data() {
    return {
      products: [],
      loading: true,
      search: '',
      response: null,
    }
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    // gotoPath(path) {
    //   this.$router.push(path);
    // },
    // get random background image 
    async getProducts() {
      const { data } = await axios.get('product');
      this.products = data;
      this.loading = false;
    },

    async getSearch() {
      this.loading = true;
      const {data} = await axios.get(`product?${this.search}`);
      this.loading = false;
      data.forEach(item => {
        if(item.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())) 
          {
            return this.products.push(item);
          } 
        else 
          {
            return false
          }
      });
    },

    handleSearch() {
      if(this.search === "") {
        return this.getProducts()
      } else {
        this.products = [];
        this.getSearch();
      }
      // 
    }
  }
}
</script>

<style>
a, a:focus, a:hover {
  text-decoration: none !important;
}
.text-white {
  color: white
}
.b {
  border: 1px solid red;
}
.h-auto {
  height: fit-content !important;
}
</style>