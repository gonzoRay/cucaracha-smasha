<template>
  <v-layout column>
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
export default {
    name: "Logo"
}
</script>

<style>
</style>
