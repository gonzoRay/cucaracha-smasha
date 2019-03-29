import '@/plugins/vuetify';
import 'firebase/auth';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import firebase from 'firebase/app';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(authResult => {
      if (authResult) {
        store.dispatch('SET_AUTHED_PLAYER', authResult);
      }
    });
  }
}).$mount('#app');
