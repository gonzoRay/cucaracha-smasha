<template>
  <div id="app">
    <v-layout column>
      <v-flex>
        <img
          alt="game logo"
          :height="$vuetify.breakpoint.smAndUp ? '120px' : '80px'"
          src="./assets/logo.png"
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
    </v-layout>
    <Gameboard/>
  </div>
</template>

<script>
import Gameboard from './components/Gameboard.vue';

export default {
  name: "app",
  components: {
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
  margin-top: 60px;
}
</style>
