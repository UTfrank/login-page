<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      class="text-white"
      dark
    >
      <v-toolbar color="transparent" flat>
        <v-toolbar-title class="text-white">User</v-toolbar-title>
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
        <v-col md="4" sm="6" xs="10"
        v-bind:key="productDetail.id" v-if="productDetail">
        <v-btn
          class="mx-2"
          fab
          dark
          color="primary"
          @click="$router.go(-1)"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
            <v-card
                class="mx-auto my-12"
                max-width="374"
                
              >
                <v-img
                  height="200"
                  :src="productDetail.image"
                  alt="picture"
                ></v-img>
            
                <v-card-title>{{productDetail.name}}</v-card-title>
            
                <v-card-text>
                  <div>{{productDetail.type}}</div>
            
                  <div class="text-subtitle-1">
                    $ {{productDetail.price}}
                  </div>

                  <div>{{productDetail.description}}</div>
                </v-card-text>
            
            </v-card>
            </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios"
export default {
  name: "ProductDetailView",
  data() {
    return {
      productId: this.$route.params.id,
      productDetail: {},
      loading: true
    }
  },

  created() {
    this.getProductDetails()
  },

  methods: {
    // get random background image 
    async getProductDetails() {
      const { data } = await axios.get(`product/${this.productId}`);
      this.productDetail = data;
      this.loading = false;
    }
  }
}
</script>

<style>

</style>