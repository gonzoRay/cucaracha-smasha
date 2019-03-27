<template>
  <div class="not-found">
    <Logo/>
    <h3>Uh oh!</h3>
    <p>This isn't the page you're looking for.</p>
    <button @click="notFound" class="button">Go Back To Login</button>
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
button {
  margin: 10px 0;
  background-color: #0476f2;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
h3 {
  font-weight: normal;
}
</style>
