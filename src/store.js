import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: { name: 'reagan' },
    currentHighScore: 0,
    highScores: [
      { name: 'joe', score: 7 },
      { name: 'sarah', score: 8 },
      { name: 'frank', score: 6 }
    ]
  },
  mutations: {},
  actions: {}
});
