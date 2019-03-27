<template>
  <div class="login">
    <Logo/>
    <h3>Log in</h3>
    <input type="text" v-model="email" placeholder="Email address" class="input" required>
    <br>
    <input type="password" v-model="password" placeholder="Password" class="input" required>
    <br>
    <v-btn @click="login" class="button">LOG IN</v-btn>
    <p>
      <router-link to="/signup">New Here? Create a new account</router-link>
    </p>
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
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$store.dispatch('SET_USER', user);
          this.$router.replace('/game')
        }).catch((err) => {
          alert(err.message)
        })
      }
    }
  }
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
button {
  margin: 10px 0;
  background-color: #0476f2;
}
a {
  color: black;
  text-decoration: underline;
}

p {
  margin-top: 40px;
  font-size: 13px;
}
h1,
h2 {
  font-weight: normal;
}
</style>
