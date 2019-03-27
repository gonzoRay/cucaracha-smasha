import '@/plugins/vuetify';
import 'firebase/firestore';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import firebase from 'firebase/app';
import Vue from 'vue';

firebase.initializeApp({
  apiKey: 'AIzaSyCgDUv0MGutosbpWJ4fbYCCMDcQGVq72WM',
  authDomain: 'cockroach-smash.firebaseapp.com',
  databaseURL: 'https://cockroach-smash.firebaseio.com',
  projectId: 'cockroach-smash',
  storageBucket: 'cockroach-smash.appspot.com',
  messagingSenderId: '286046259921'
});

export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
