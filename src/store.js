import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      gameDurationInMs: 4000,
      difficultyLevels: [
        { level: 0, label: 'Easy', speed: 1000 },
        { level: 1, label: 'Normal', speed: 750 },
        { level: 2, label: 'Hard', speed: 500 }
      ],
      numberOfImageOptions: 5
    },
    game: {
      difficulty: 1,
      isRunning: false,
      newRoachTimerId: undefined
    },
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
    levelSpeed: state => level => {
      const targetLevel = state.config.difficultyLevels.find(
        l => l.level === level
      );
      return targetLevel.speed;
    },
    levelLabels: state => state.config.difficultyLevels.map(l => l.label),
    currentUser: state => state.currentUser,
    currentHighScore: state => state.currentHighScore,
    highScores: state => state.highScores
  },
  mutations: {
    setGameTimer(state, payload) {
      state.game.isRunning = payload;
      let gameLog = payload
        ? `starting game clock at level ${state.game.difficulty}`
        : 'stopping game clock';
      console.info(gameLog);
    },
    setDifficulty(state, payload) {
      state.game.difficulty = payload;
    },
    startNewRoachTimer(state, payload) {
      console.info(`new roach every ${payload / 1000} seconds`);
      state.game.newRoachTimerId = setInterval(() => {
        console.log('TODO: pop up a new roach!');
      }, payload);
    },
    cancelNewRoachTimer(state) {
      console.info('stopping new roach timer');
      clearInterval(state.game.newRoachTimerId);
    }
  },
  actions: {
    START_GAME({ state, commit, getters }) {
      commit('setGameTimer', true);
      const newRoachTimerSpeed = getters.levelSpeed(state.game.difficulty);
      commit('startNewRoachTimer', newRoachTimerSpeed);

      setTimeout(() => {
        commit('setGameTimer', false);
        commit('cancelNewRoachTimer');
      }, state.config.gameDurationInMs);
    }
  }
});
