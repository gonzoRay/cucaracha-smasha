import { calculateHighScore, cancelGameTimers, resetTile, showRandomRoachImage } from '@/state-helpers';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      numberOfTiles: 9,
      numberOfImageOptions: 5,
      gameDurationInMs: 7000,
      tileDelayFactor: 0.3,
      basePointsPerSmash: 10,
      difficultyLevels: [
        { level: 0, label: 'Easy', speed: 1500 },
        { level: 1, label: 'Normal', speed: 1250 },
        { level: 2, label: 'Hard', speed: 800 }
      ]
    },
    game: {
      currentTile: -1,
      tiles: [],
      difficulty: 1,
      isRunning: false,
      newRoachTimerId: undefined,
      currentScore: 0
    },
    currentUser: undefined,
    currentHighScore: 0,
    highScores: [
      { id: 1, name: 'jimi', score: 70 },
      { id: 2, name: 'sarah', score: 80 },
      { id: 3, name: 'frank', score: 60 },
      { id: 4, name: 'joe', score: 80 },
      { id: 5, name: 'stella', score: 90 }
    ]
  },
  getters: {
    gameTiles: state => state.game.tiles,
    levelSpeed: state => level => {
      const targetLevel = state.config.difficultyLevels.find(
        l => l.level === level
      );
      return targetLevel.speed;
    },
    levelLabels: state => state.config.difficultyLevels.map(l => l.label),
    currentUser: state => state.currentUser.user.email,
    currentHighScore: state => state.currentHighScore,
    highScores: state => state.highScores
  },
  mutations: {
    initGame(state, payload) {
      for (let i = 0; i < payload; i++) {
        state.game.tiles.push({
          id: i,
          imageSrc: require('@/assets/empty.png')
        });
      }
    },
    resetGame(state) {
      state.game.currentScore = 0;
      state.game.currentTile = -1;
      state.game.tiles.length = 0;
      state.game.isRunning = false;
    },
    resetTile(state, payload) {
      resetTile(state, payload);
    },
    setGameTimer(state, payload) {
      state.game.isRunning = payload;
    },
    setDifficulty(state, payload) {
      state.game.difficulty = payload;
    },
    setUser(state, payload) {
      state.currentUser = payload;
    },
    startNewRoachTimer(state, payload) {
      state.game.newRoachTimerId = setInterval(() => {
        showRandomRoachImage(state);
        state.game.resetTileTimerId = setTimeout(
          () => resetTile(state, state.game.currentTile),
          payload / Number(1 + state.config.tileDelayFactor)
        );
      }, payload);
    },
    endGame(state) {
      cancelGameTimers(state);
      calculateHighScore(state);
    },
    incrementScore(state) {
      const weightedSmashScore =
        state.config.basePointsPerSmash * state.game.difficulty + 1;
      state.game.currentScore = state.game.currentScore + weightedSmashScore;
    }
  },
  actions: {
    INIT_GAME({ state, commit }) {
      commit('resetGame');
      commit('initGame', state.config.numberOfTiles);
    },
    START_GAME({ state, commit, getters }) {
      commit('resetGame');
      commit('initGame', state.config.numberOfTiles);
      commit('setGameTimer', true);
      const newRoachTimerSpeed = getters.levelSpeed(state.game.difficulty);
      commit('startNewRoachTimer', newRoachTimerSpeed);

      state.game.mainGameTimerId = setTimeout(() => {
        commit('setGameTimer', false);
        commit('endGame');
      }, state.config.gameDurationInMs);
    },
    SMASH_ROACH({ commit }, tileId) {
      commit('resetTile', tileId);
      commit('incrementScore');
    },
    SET_USER({ commit }, user) {
      commit('setUser', user);
    }
  }
});
