<template>
  <v-app>
    <div id="app">
      <Logo/>
      <Gameboard/>
    </div>
  </v-app>
</template>

<script>
import Logo from './components/Logo.vue';
import Gameboard from './components/Gameboard.vue';

export default {
  name: "app",
  components: {
    Logo,
    Gameboard
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 1em;
}
</style>
