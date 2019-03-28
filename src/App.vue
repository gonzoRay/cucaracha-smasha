<template>
  <v-app id="app">
    <v-toolbar color="red darken-2" dark fixed app>
      <v-toolbar-title class="hidden-sm-and-up">
        <img alt="game logo" height="50px" src="@/assets/logo.png">
      </v-toolbar-title>
      <img class="hidden-xs-only" alt="game logo" height="50px" src="@/assets/logo.png">
      <v-toolbar-title class="hidden-xs-only">Cucaracha Smasha!</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="hidden-sm-and-up" v-if="isLoggedIn">Hi, {{ currentUser }}</v-toolbar-title>
      <v-toolbar-title class="hidden-xs-only" v-if="isLoggedIn">Welcome, {{ currentUser }}</v-toolbar-title>
      <v-btn v-if="isLoggedIn" @click="logout" icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="red darken-2" app inset>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
  name: 'app',
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('SET_USER', null);
          this.$store.dispatch('LOGOUT');
          this.$router.replace('login');
        });
    }
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.currentUser;
      }
    },
    ...mapGetters(['currentUser'])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
