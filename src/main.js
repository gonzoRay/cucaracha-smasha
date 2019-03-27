import '@/plugins/vuetify';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
