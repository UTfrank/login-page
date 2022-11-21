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
    <v-main class="full-height d-flex m-auto">
      <v-row justify="center" class="ma-0">
        <v-col class="mt-10" md="5" sm="6" xs="10">
          <template v-if="isSuccessful === 0">
            <v-alert
              elevation="3"
              type="success"
              dismissible
            >Login Successful</v-alert>
          </template>
          <template v-if="isSuccessful === 1">
            <v-alert
              elevation="3"
              type="error"
              dismissible
            >{{res.data.message}}</v-alert>
          </template>
          <v-card elevation="2">
            <v-card-title class="justify-center">Welcome Back</v-card-title>
            <v-card-subtitle class="text-center">Login to access your account</v-card-subtitle>
            <v-divider class="mx-4"></v-divider>
            <v-form ref="form" @submit.prevent="handleSubmit">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <!-- email text field -->
                    <v-text-field 
                      v-model="email"
                      type="email"
                      label="Email"
                      placeholder="johndoe@xyz.abc"
                      ></v-text-field>
                      <!-- :rules="[rules.required, rules.email]" -->
      
                    <!-- password text field -->
                    <v-text-field
                      v-model=password
                      :type="show ? 'text' : 'password'"
                      label="Password"
                      placeholder="Password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show = !show"
                      ></v-text-field>
                      <!-- :rules="[rules.required, rules.password]" -->
                  </v-col>
      
                  <v-divider class="mx-4"></v-divider>
      
                  <v-container>
                    <v-row justify="space-between" class="ma-0">
                      <!-- reset button -->
                      <v-btn large color="secondary" @click="handleReset">Reset</v-btn>
      
                      <!-- submit button -->
                      <v-btn type="submit" large color="primary" :disabled="!formIsValid" :loading="loading">Submit</v-btn>
                    </v-row>
                  </v-container>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',

  data() {
    return {
      isSuccessful: null,
      res: null,
      loading: false,
      email: "",
      password: "",
      show: false,
      // rules: {
      //   required: value => !!value || 'Required!.',
      //   email: value => /.+@.+\..+/.test(value) || 'Invalid email',
      //   password: value => {
      //     const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
      //     return pattern.test(value) || "Min. 8 characters with at least one capital letter, a number and a special character."
          
      //   }
      // }
    }
  },

  computed: {
    formIsValid() {
      return(
        this.email &&
        this.password
      )
    }
  },

  methods: {
    handleReset() {this.$refs.form.reset()},
    handleSubmit() {
      this.loading = true;
      axios.post('http://restapi.adequateshop.com/api/authaccount/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        this.loading = false;
        this.res = response;
        this.isSuccessful = response.data.code; 
        this.handleReset();
        this.$router.push('/productList');
      })
      .catch(function (error) {
        this.loading = false;
        console.log(error);
      });
      
    }
  }
}
</script>

<style>

</style>