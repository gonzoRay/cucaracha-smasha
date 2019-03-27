<template>
  <div class="game">
    <Logo/>
    <Gameboard/>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';
import Gameboard from '@/components/Gameboard.vue';

export default {
  name: 'Game',
  components: {
    Logo,
    Gameboard
  }
}
</script>

<style>
</style>
