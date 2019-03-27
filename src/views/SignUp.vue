<template>
  <div class="sign-up">
    <Logo/>
    <h3>Create a new account</h3>
    <input v-model="email" type="text" class="input" placeholder="Email" required>
    <br>
    <input v-model="password" type="password" class="input" placeholder="Password" required>
    <br>
    <v-btn color="primary" @click="signUp">Sign Up!</v-btn>
    <v-btn to="/login">Back</v-btn>
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
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      signUp() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.replace('/login')
        })
        .catch((err) => {
          alert(err.message)
        });
      }
    }
  }
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
button {
  margin: 10px 0;
  background-color: #0476f2;
}
a {
  color: #2c3e50;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
h3 {
  font-weight: normal;
}
</style>
