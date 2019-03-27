<template>
  <v-layout column>
    <v-flex v-if="isLoggedIn">
      <v-btn @click="logout">Logout</v-btn>
    </v-flex>
    <v-flex>
      <img
        alt="game logo"
        :height="$vuetify.breakpoint.smAndUp ? '120px' : '80px'"
        src="../assets/logo.png"
      >
    </v-flex>
    <v-flex>
      <span
        :class="['brown--text font-weight-light', $vuetify.breakpoint.smAndUp ? 'display-2' : 'headline']"
      >
        cucaracha
        <strong class="red--text font-weight-strong">smasha!</strong>
      </span>
    </v-flex>
    <v-spacer>&nbsp;</v-spacer>
  </v-layout>
</template>

<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';

export default {
    name: 'Logo',
    methods: {
      logout () {
        firebase.auth().signOut().then(() => {
          this.$store.dispatch('SET_USER', null);
          this.$router.replace('login')
        })
      }
    },
    computed: {
      isLoggedIn: {
        get() {
          return firebase.auth().currentUser;
        }
      }
    }
}
</script>

<style>
</style>
