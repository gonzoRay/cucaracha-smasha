import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: { name: 'reagan' },
    currentHighScore: 50,
    highScores: [
      { id: 1, name: 'jimi', score: 70 },
      { id: 2, name: 'sarah', score: 80 },
      { id: 3, name: 'frank', score: 60 },
      { id: 4, name: 'joe', score: 80 },
      { id: 5, name: 'stella', score: 90 }
    ]
  },
  getters: {
    currentUser: state => state.currentUser,
    currentHighScore: state => state.currentHighScore,
    highScores: state => state.highScores
  },
  mutations: {},
  actions: {}
});
