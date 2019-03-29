<template>
  <div class="sign-up">
    <Logo/>
    <h3>Create a new account</h3>
    <input type="text" v-model="playerName" placeholder="Player name" class="input" required>
    <br>
    <input v-model="email" type="text" class="input" placeholder="Email" required>
    <br>
    <input v-model="password" type="password" class="input" placeholder="Password" required>
    <br>
    <v-btn class="white--text" color="red darken-2" @click="signUp">Sign Up!</v-btn>
    <div>
      <router-link to="/login">Back to Log in</router-link>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Signup',
  components: {
    Logo
  },
  data() {
    return {
      playerName: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.dispatch('SET_PLAYER_NAME', this.playerName);
          this.$router.replace('/login');
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  align-self: center;
  margin: 10px 0;
  width: auto;
  padding: 15px;
}
</style>
