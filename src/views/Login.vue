<template>
  <div class="login">
    <Logo></Logo>
    <h3 class="headline">Log in</h3>
    <input type="text" v-model="email" placeholder="Email address" class="input" required>
    <br>
    <input type="password" v-model="password" placeholder="Password" class="input" required>
    <br>
    <v-btn @click="login" color="red">LOG IN</v-btn>
    <div>
      <router-link to="/signup">New Here? Create a new account</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import Logo from '@/components/Logo.vue';

export default {
  name: 'Login',
  components: {
    Logo
  },
  data() {
    return {
      email: 'raygunc@gmail.com',
      password: 'testing'
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.dispatch('SET_USER', user);
          this.$router.replace('/game');
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  align-self: center;
  margin: 10px 0;
  width: auto;
  padding: 15px;
}
</style>
