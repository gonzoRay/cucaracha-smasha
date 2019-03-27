<template>
  <div class="not-found">
    <Logo/>
    <h3 class="headline">Uh oh!</h3>
    <p>This isn't the page you're looking for.</p>
    <v-btn @click="notFound">Go Back To Login</v-btn>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';

  export default {
    name: 'Login',
    components: {
      Logo
    },
    data: function() {
      return {}
    },
    methods: {
      notFound () {
        this.$router.replace('/game')
      }
    }
  }
</script>

<style scoped>
.not-found {
  margin-top: 40px;
}
</style>
